let initialNoseTip = null;
let initialHeadPosition = null;
const movementThreshold = 10; // 鼻尖移动的阈值，单位为屏幕像素
const maxHeadOffset = 50; // 假设头部最大偏移量
const scaleFactorX = window.screen.width / (2 * maxHeadOffset);
const scaleFactorY = window.screen.height / (2 * maxHeadOffset);
let lastGazeX = null;
let lastGazeY = null;
const smoothingFactor = 0.5; // 用于减少抖动的平滑系数

export default (appData, results, currentObj, callBackResult, stopRecording) => {
    const canvasElement = document.querySelector('canvas');
    const canvasCtx = canvasElement.getContext('2d');
    const canvasWidth = canvasElement.width;
    const canvasHeight = canvasElement.height;

    // 清除画布
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const faceLandmarks = results.multiFaceLandmarks[0];

        // 获取鼻尖和头部中心点
        const noseTip = faceLandmarks[1]; // 鼻尖的索引通常为1
        const forehead = faceLandmarks[10]; // 头部中心的索引（可根据实际调整）

        // 初始化鼻尖和头部位置
        if (initialNoseTip === null && initialHeadPosition === null) {
            initialNoseTip = { x: noseTip.x, y: noseTip.y };
            initialHeadPosition = { x: forehead.x, y: forehead.y };
        }

        // 计算鼻尖的偏移量
        const noseOffsetX = (noseTip.x - initialNoseTip.x) * canvasWidth;
        const noseOffsetY = (noseTip.y - initialNoseTip.y) * canvasHeight;

        // 偏移值变量
        const offsetX = noseOffsetX * scaleFactorX;
        const offsetY = noseOffsetY * scaleFactorY;

        // 判断偏移量是否大于阈值，避免小抖动
        if (Math.abs(noseOffsetX) > movementThreshold || Math.abs(noseOffsetY) > movementThreshold) {
            // 放大偏移量，映射到屏幕的范围
            let gazeX = (canvasWidth / 2) - offsetX; // 修正为非镜像：向左看，点向左移动
            let gazeY = (canvasHeight / 2) + offsetY;

            // 平滑处理
            if (lastGazeX !== null && lastGazeY !== null) {
                gazeX = lastGazeX + (gazeX - lastGazeX) * smoothingFactor;
                gazeY = lastGazeY + (gazeY - lastGazeY) * smoothingFactor;
            }

            // 更新最后位置
            lastGazeX = gazeX;
            lastGazeY = gazeY;

            // 保持点在Canvas范围内
            const clampedGazeX = Math.max(25, Math.min(canvasWidth - 25, gazeX));
            const clampedGazeY = Math.max(25, Math.min(canvasHeight - 25, gazeY));

            // 绘制50px x 50px的红色圆圈
            canvasCtx.strokeStyle = '#FF0000';
            canvasCtx.lineWidth = 5;
            canvasCtx.beginPath();
            canvasCtx.arc(clampedGazeX, clampedGazeY, 25, 0, 2 * Math.PI);
            canvasCtx.stroke();
        }
    }
};
