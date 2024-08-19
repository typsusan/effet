const targetCharacter = 'A'; // 目标字符
const characterFont = 'bold 100px Arial'; // 字体样式
const brushColor = '#000000'; // 鼻尖划过后的颜色
const backgroundColor = '#D3D3D3'; // 灰色背景

// 用于存储用户绘制的路径
let drawnPath = [];
let totalCharacterPixels = 0;
let filledPixels = 0;

// 初始化像素统计
const initializePixelData = (canvasElement, canvasCtx) => {
    // 创建离屏Canvas用于计算字符总像素
    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = canvasElement.width;
    offScreenCanvas.height = canvasElement.height;
    const offScreenCtx = offScreenCanvas.getContext('2d');

    // 绘制字符在离屏canvas上
    offScreenCtx.fillStyle = backgroundColor;
    offScreenCtx.font = characterFont;
    const textMetrics = offScreenCtx.measureText(targetCharacter);
    const xPosition = (offScreenCanvas.width - textMetrics.width) / 2;
    const yPosition = (offScreenCanvas.height + textMetrics.actualBoundingBoxAscent) / 2;
    offScreenCtx.fillText(targetCharacter, xPosition, yPosition);

    // 获取字符图像数据
    const characterImageData = offScreenCtx.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);
    const data = characterImageData.data;

    // 计算字符的总像素，忽略透明或白色背景
    totalCharacterPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
            totalCharacterPixels++;
        }
    }
};

// 验证填充百分比的方法
const validateFilling = (canvasElement, canvasCtx) => {
    const currentImageData = canvasCtx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const data = currentImageData.data;

    filledPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
        // 只计算填充的黑色像素，忽略背景区域
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0 && data[i + 3] === 255) {
            filledPixels++;
        }
    }

    const filledPercentage = (filledPixels / totalCharacterPixels) * 100;
    return filledPercentage >= 80;
};

export default (appData, results, currentObj, callBackResult, stopRecording) => {
    const canvasElement = document.querySelector('canvas');
    const canvasCtx = canvasElement.getContext('2d');

    // 如果还没有初始化像素数据，则初始化
    if (totalCharacterPixels === 0) {
        initializePixelData(canvasElement, canvasCtx);
    }

    // 清除画布
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // 绘制背景字符
    canvasCtx.fillStyle = backgroundColor;
    canvasCtx.font = characterFont;
    const textMetrics = canvasCtx.measureText(targetCharacter);
    const xPosition = (canvasElement.width - textMetrics.width) / 2;
    const yPosition = (canvasElement.height + textMetrics.actualBoundingBoxAscent) / 2;
    canvasCtx.fillText(targetCharacter, xPosition, yPosition);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        // 获取第一个检测到的人脸
        const faceLandmarks = results.multiFaceLandmarks[0];

        // 获取鼻尖的坐标
        const noseTip = faceLandmarks[1]; // 鼻尖的索引通常为1

        // 调整鼻尖的x轴和y轴坐标进行镜像修正
        const noseX = (1 - noseTip.x) * canvasElement.width; // 镜像x轴
        const noseY = noseTip.y * canvasElement.height; // 正常的y轴

        // 添加鼻尖位置到绘制路径
        drawnPath.push({ x: noseX, y: noseY });

        // 绘制鼻尖划过的路径
        canvasCtx.fillStyle = brushColor;
        for (let i = 0; i < drawnPath.length; i++) {
            canvasCtx.fillRect(drawnPath[i].x, drawnPath[i].y, 5, 5);
        }

        // 检查是否填充了80%以上
        if (validateFilling(canvasElement, canvasCtx)) {
            console.log("填充超过80%，通过！");
            stopRecording(currentObj); // 停止录制或进一步处理
        }
    }
};
