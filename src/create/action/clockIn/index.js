import faceColor from "../../../color/faceColor";
let checkInTimer = null;
let isCheckingIn = false;

export default (appData, results, currentObj, callBackResult, stopRecording, startRecording) => {
    faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);
    results.multiFaceLandmarks.forEach((landmarks) => {
        const meetsCriteria = checkIfMeetsCriteria(landmarks, currentObj);

        // 移除上次消息
        if (!meetsCriteria){
            appData.currentText = ''
        }

        // 绘制人脸框框
        drawFaceBox(appData.canvasCtx, landmarks, meetsCriteria,currentObj);

        if (meetsCriteria && !isCheckingIn) {
            if (!checkInTimer) {
                checkInTimer = setTimeout(() => {
                    // 触发打卡接口
                    callBackResult(currentObj,'打卡成功',4);
                    isCheckingIn = true;
                    stopRecording(currentObj)
                    // 设置2秒后重置isCheckingIn
                    setTimeout(() => {
                        isCheckingIn = false;
                    }, 2000);

                    clearTimeout(checkInTimer);
                    checkInTimer = null;
                }, 1000);
            }
        } else if (!meetsCriteria) {
            clearTimeout(checkInTimer);
            checkInTimer = null;
        }
    });

    function checkIfMeetsCriteria(landmarks, currentObj) {
        const canvasWidth = canvasElement.width;
        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        const headWidth = Math.abs(rightCheek.x - leftCheek.x) * canvasWidth;
        const distance = (canvasWidth * 0.5) / headWidth * 10;
        return distance <= currentObj.punchDistance;
    }

    function drawFaceBox(ctx, landmarks, isHighlighted, currentObj) {
        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        const chin = landmarks[152];
        const forehead = landmarks[10];

        const x = leftCheek.x * canvasElement.width;
        const y = forehead.y * canvasElement.height;
        const width = (rightCheek.x - leftCheek.x) * canvasElement.width;
        const height = (chin.y - forehead.y) * canvasElement.height;

        // 设置框框颜色
        ctx.strokeStyle = isHighlighted ? currentObj.punchSuccessColor : currentObj.punchDefaultColor; // 高光颜色为金色，默认颜色为灰色
        ctx.lineWidth = 5;

        // 绘制带圆角的矩形框的边角
        const lineLength = 35; // 边角线段长度

        // 绘制左上角
        ctx.beginPath();
        ctx.moveTo(x, y + lineLength);
        ctx.lineTo(x, y);
        ctx.lineTo(x + lineLength, y);
        ctx.stroke();

        // 绘制右上角
        ctx.beginPath();
        ctx.moveTo(x + width - lineLength, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + lineLength);
        ctx.stroke();

        // 绘制右下角
        ctx.beginPath();
        ctx.moveTo(x + width, y + height - lineLength);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width - lineLength, y + height);
        ctx.stroke();

        // 绘制左下角
        ctx.beginPath();
        ctx.moveTo(x + lineLength, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + height - lineLength);
        ctx.stroke();
    }
};
