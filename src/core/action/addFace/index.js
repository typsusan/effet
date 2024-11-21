import faceColor from "@/styles/faceColor";
import addFace from "@/styles/template/addFace"
import checkIfMeetsUtils from "@/util/checkIfMeetsUtils";
const NOSE_X_CHANGE_HISTORY_LENGTH = 10;
const NOSE_Y_CHANGE_HISTORY_LENGTH = 10;

export default (appData,results,currentObj,callBackResult,stopRecording,startRecording) => {
    const landmarks = results.multiFaceLandmarks[0];
    faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);

    const noseTip = landmarks[1]; // 鼻尖的标记点
    const tiltThreshold = 0.009; // 水平偏移阈值
    const nodThreshold = 0.009; // 垂直偏移阈值
    const neutralThreshold = 0.009; // 中间点阈值

    let headDirection = null; // 'left', 'right', 'up', 'down' or null

    // 检测头部方向
    if (appData.addFaceLastNoseX !== null) {
        const dx = noseTip.x - appData.addFaceLastNoseX;
        appData.addFaceNoseXChanges.push(Math.abs(dx));

        if (appData.addFaceNoseXChanges.length > NOSE_X_CHANGE_HISTORY_LENGTH) {
            appData.addFaceNoseXChanges.shift();
        }

        const maxChangeX = Math.max(...appData.addFaceNoseXChanges);
        if (maxChangeX > tiltThreshold) {
            headDirection = dx > 0 ? 'left' : 'right'; // 判定方向
        }
    }

    if (appData.addFaceLastNoseY !== null) {
        const dy = noseTip.y - appData.addFaceLastNoseY;
        appData.addFaceNoseYChanges.push(Math.abs(dy));

        if (appData.addFaceNoseYChanges.length > NOSE_Y_CHANGE_HISTORY_LENGTH) {
            appData.addFaceNoseYChanges.shift();
        }

        const maxChangeY = Math.max(...appData.addFaceNoseYChanges);
        if (maxChangeY > nodThreshold) {
            headDirection = dy > 0 ? 'up' : 'down'; // 判定方向
        }
    }

    // 检测中间状态
    if (headDirection && Math.abs(noseTip.x - appData.addFaceLastNoseX) < neutralThreshold && Math.abs(noseTip.y - appData.addFaceLastNoseY) < neutralThreshold) {
        headDirection = null; // 重置为中间状态
    }

    appData.addFaceLastNoseX = noseTip.x;
    appData.addFaceLastNoseY = noseTip.y;

    const meetsCriteria = checkIfMeetsUtils(appData,landmarks, currentObj,'addFaceDistance');

    const addDirection = (direction) => {
        appData.headDirectionResult.push(direction);
        if (appData.headDirectionResult.length >= 4) {
            callBackResult(currentObj, '全部方向检测通过');
            stopRecording(currentObj);
        }
    }


    // 确保 foregroundCanvas 存在
    let foregroundCanvas = document.getElementById('foregroundCanvas');

    if (!foregroundCanvas) {
        // 如果不存在，则动态创建
        foregroundCanvas = document.createElement('canvas');
        foregroundCanvas.id = 'foregroundCanvas';
        foregroundCanvas.width = appData.canvasElement.width;
        foregroundCanvas.height = appData.canvasElement.height;

        // 设置样式使其居中并叠加在背景 canvas 上
        foregroundCanvas.style.position = 'absolute';
        foregroundCanvas.style.top = '50%';
        foregroundCanvas.style.left = '50%';
        foregroundCanvas.style.transform = 'translate(-50%, -50%)'; // 居中
        foregroundCanvas.style.zIndex = '2'; // 设置 z-index
        foregroundCanvas.style.pointerEvents = 'none'; // 禁止用户交互

        // 添加到背景 canvas 的父元素
        appData.canvasElement.parentNode.appendChild(foregroundCanvas);
    }

    const ctx = appData.canvasCtx; // 背景 canvas 的上下文
    const foregroundCtx = foregroundCanvas.getContext('2d'); // 前景 canvas 的上下文

    // 1. 清空背景 canvas 并绘制摄像头画面
    ctx.clearRect(0, 0, appData.canvasElement.width, appData.canvasElement.height);
    ctx.drawImage(results.image, 0, 0, appData.canvasElement.width, appData.canvasElement.height);

    // 应用模糊到背景
    appData.canvasElement.style.filter = `blur(${8}px)`;

    // 2. 清空前景 canvas 并绘制清晰文字
    foregroundCtx.clearRect(0, 0, foregroundCanvas.width, foregroundCanvas.height);

    const allDirections = ['left', 'right', 'up', 'down'];

    if (!meetsCriteria) {
        sendTips('请距离屏幕近一点');
    } else {
        const remainingDirections = allDirections.filter(direction => !appData.headDirectionResult.includes(direction));

        if (remainingDirections.length === 4) {
            sendTips('请上下左右转头');
        } else if (remainingDirections.length > 0) {
            const directionMap = {
                left: '右边',
                right: '左边',
                up: '下方',
                down: '上方'
            };

            // 使用映射替换方向名称
            const text = remainingDirections.map(direction => directionMap[direction]).join('、');
            sendTips(`请向 ${text} 转向`);
        } else {
            sendTips('');
        }

        appData.canvasElement.style.filter = `blur(${0}px)`
        if (headDirection) {
            if (appData.headDirectionResult.findIndex(he => he === headDirection) !== -1){
                return;
            }
            addDirection(headDirection)
            addFace(currentObj).animation(headDirection)
        }
    }

    function sendTips(text){
        foregroundCtx.font = '18px Arial';
        foregroundCtx.fillStyle = '#00d6e1';
        foregroundCtx.textAlign = 'center';
        foregroundCtx.fillText(
            text,
            foregroundCanvas.width / 2,
            foregroundCanvas.height / 2
        );
    }
};
