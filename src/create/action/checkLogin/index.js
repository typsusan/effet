/**
 * 检测登录操作，如：眨眨眼，摇摇头，张张嘴，具体动作在当前逻辑里面调整
 * Detect login operations, such as blinking, shaking your head, and opening your mouth. The specific actions are adjusted in the current logic
 */
import {distance} from "../../../util/distanceUtils";
import faceColor from "../../../color/faceColor";
const NOSE_X_CHANGE_HISTORY_LENGTH = 10;
export default (appData,results,currentObj,callBackResult,stopRecording,startRecording)=>{

    const landmarks = results.multiFaceLandmarks[0];
    faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);
    // 获取面部关键点
    const upperLipBottom = landmarks[13];
    const lowerLipTop = landmarks[14];
    const leftEyeTop = landmarks[159];
    const leftEyeBottom = landmarks[145];
    const rightEyeTop = landmarks[386];
    const rightEyeBottom = landmarks[374];
    const noseTip = landmarks[1]; // 鼻尖的标记点

    // 计算动作状态
    const mouthOpen = distance(upperLipBottom, lowerLipTop) > currentObj.threshold.lips;
    const leftEyeOpen = distance(leftEyeTop, leftEyeBottom) > currentObj.threshold.eye;
    const rightEyeOpen = distance(rightEyeTop, rightEyeBottom) > currentObj.threshold.eye;
    const blinked = !(leftEyeOpen && rightEyeOpen);

    let headShaken = false;
    if (appData.lastNoseX !== null) {
        let dx = Math.abs(noseTip.x - appData.lastNoseX);
        appData.noseXChanges.push(dx);

        if (appData.noseXChanges.length > NOSE_X_CHANGE_HISTORY_LENGTH) {
            appData.noseXChanges.shift();
            const maxChange = Math.max(...appData.noseXChanges);
            if (maxChange > currentObj.threshold.headShake) {
                headShaken = true;
            }
        }
    }
    appData.lastNoseX = noseTip.x;

    // 依次检测动作
    if (!appData.blinkDetected) {
        if (blinked) {
            appData.blinkDetected = true;
            callBackResult(currentObj, '眨眼检测通过');
        }
    } else if (!appData.mouthDetected) {
        callBackResult(currentObj, '请张张嘴');
        if (mouthOpen) {
            appData.mouthDetected = true;
            callBackResult(currentObj, '张嘴检测通过');
        }
    } else if (!appData.headShakeDetected) {
        callBackResult(currentObj, '请左右摇头');
        if (headShaken) {
            appData.headShakeDetected = true;
            callBackResult(currentObj, '摇头检测通过');
            stopRecording(currentObj);
        }
    }
}
