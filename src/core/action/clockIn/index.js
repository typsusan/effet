import faceColor from "@/styles/faceColor";
import checkIfMeetsUtils from "@/util/checkIfMeetsUtils";
export default (appData, results, currentObj, callBackResult, stopRecording, startRecording) => {
    faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);
    results.multiFaceLandmarks.forEach((landmarks) => {
        const meetsCriteria = checkIfMeetsUtils(appData,landmarks, currentObj,'punchDistance');

        // 如果当前人脸不符合打卡标准，就直接跳过剩下的步骤
        if (!meetsCriteria) {
           // clearTimeout(checkInTimer);
           // checkInTimer = null;
            appData.currentText = ''
            return;
        }else {
            if (appData.currentText !== 'success'){
                stopRecording(currentObj);
            }
        }

        // 绘制人脸框框
        drawFaceBox(appData.canvasCtx, landmarks, currentObj);

    });

    function drawFaceBox(ctx, landmarks, currentObj) {
        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        const chin = landmarks[152];
        const forehead = landmarks[10];

        // 检查关键点是否存在
        if (!leftCheek || !rightCheek || !chin || !forehead) {
            return;
        }

        const x = leftCheek.x *  appData.canvasElement.width;
        const y = forehead.y *  appData.canvasElement.height;
        const width = (rightCheek.x - leftCheek.x) * appData.canvasElement.width;
        const height = (chin.y - forehead.y) * appData.canvasElement.height;

        // 确保在条件不满足时也绘制灰色框框
        ctx.strokeStyle = currentObj.punchSuccessColor;
        ctx.lineWidth = 5;

        const lineLength = 35;

        ctx.beginPath();
        ctx.moveTo(x, y + lineLength);
        ctx.lineTo(x, y);
        ctx.lineTo(x + lineLength, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + width - lineLength, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + lineLength);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + width, y + height - lineLength);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width - lineLength, y + height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + lineLength, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + height - lineLength);
        ctx.stroke();
    }

};
