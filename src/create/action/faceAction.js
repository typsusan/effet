import faceColor from "../../color/faceColor";
import distance from "../../util/distance";

export default (appData,results,currentObj,callBackResult,stopRecording) =>{
    appData.canvasCtx.save();
    appData.canvasCtx.clearRect(0, 0, appData.canvasElement.width, appData.canvasElement.height);
    appData.canvasCtx.drawImage(results.image, 0, 0, appData.canvasElement.width, appData.canvasElement.height);
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        appData.predictionState = true;

        faceColor(appData.canvasCtx, landmarks, currentObj);

        // 获取面部关键点
        const upperLipBottom = landmarks[13];
        const lowerLipTop = landmarks[14];
        const leftEyeTop = landmarks[159];
        const leftEyeBottom = landmarks[145];
        const rightEyeTop = landmarks[386];
        const rightEyeBottom = landmarks[374];
        const noseTip = landmarks[1]; // 鼻尖的标记点

        // 计算动作状态
        const mouthOpen = distance(upperLipBottom, lowerLipTop) > 0.05;
        const leftEyeOpen = distance(leftEyeTop, leftEyeBottom) > 0.011;
        const rightEyeOpen = distance(rightEyeTop, rightEyeBottom) > 0.011;
        const blinked = !(leftEyeOpen && rightEyeOpen);

        let headShaken = false;
        if (appData.lastNoseX !== null) {
            let dx = Math.abs(noseTip.x - appData.lastNoseX);
            appData.noseXChanges.push(dx);

            if (appData.noseXChanges.length > 10) {
                appData.noseXChanges.shift();
                const maxChange = Math.max(...appData.noseXChanges);
                if (maxChange > 0.01) {
                    headShaken = true;
                }
            }
        }
        appData.lastNoseX = noseTip.x;

        // 依次检测动作
        if (!appData.blinkDetected) {
            if (blinked) {
                appData.blinkDetected = true;
                callBackResult(currentObj, '眨眼检测通过',5);
            }
        } else if (!appData.mouthDetected) {
            callBackResult(currentObj, '请张张嘴',6);
            if (mouthOpen) {
                appData.mouthDetected = true;
                callBackResult(currentObj, '张嘴检测通过',7);
            }
        } else if (!appData.headShakeDetected) {
            callBackResult(currentObj, '请左右摇头',8);
            if (headShaken) {
                appData.headShakeDetected = true;
                callBackResult(currentObj, '摇头检测通过',9);
                stopRecording(currentObj);
            }
        }
    } else {
        callBackResult(currentObj, '未检测到人脸...',-2);
        appData.predictionState = false;
        appData.lastNoseX = null;
        appData.noseXChanges = [];
    }
    appData.canvasCtx.restore();

}
