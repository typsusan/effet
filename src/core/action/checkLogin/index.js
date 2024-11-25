import { distance } from "@/util/distanceUtils";
import faceColor from "@/styles/faceColor";
import { FaceManager } from "@/components/FaceManager.ts";

const NOSE_X_CHANGE_HISTORY_LENGTH = 10;

export default (appData, results, currentObj, callBackResult, stopRecording, startRecording) => {
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

    // 初始化随机动作顺序
    if (!appData.actionsSequence) {
        appData.actionsSequence = ["blink", "mouth", "headShake"].sort(() => Math.random() - 0.5);
        appData.currentActionIndex = 0;
        appData.blinkDetected = false;
        appData.mouthDetected = false;
        appData.headShakeDetected = false;
    }

    const currentAction = appData.actionsSequence[appData.currentActionIndex];

    switch (currentAction) {
        case "blink":
            if (!appData.blinkDetected) {
                callBackResult(currentObj, "请眨眨眼");
                FaceManager.getInstance().updateMessage(0, "请眨眨眼");
                if (blinked) {
                    appData.blinkDetected = true;
                    callBackResult(currentObj, "眨眼检测通过");
                    appData.currentActionIndex++;
                }
            }
            break;

        case "mouth":
            if (!appData.mouthDetected) {
                callBackResult(currentObj, "请张张嘴");
                FaceManager.getInstance().updateMessage(0, "请张张嘴");
                if (mouthOpen) {
                    appData.mouthDetected = true;
                    callBackResult(currentObj, "张嘴检测通过");
                    appData.currentActionIndex++;
                }
            }
            break;

        case "headShake":
            if (!appData.headShakeDetected) {
                callBackResult(currentObj, "请左右摇头");
                FaceManager.getInstance().updateMessage(0, "请左右摇头");
                if (headShaken) {
                    appData.headShakeDetected = true;
                    callBackResult(currentObj, "摇头检测通过");
                    appData.currentActionIndex++;
                }
            }
            break;
    }

    // 检查所有动作是否完成
    if (appData.blinkDetected && appData.mouthDetected && appData.headShakeDetected) {
        FaceManager.getInstance().updateMessage(0, "通过");
        stopRecording(currentObj,results.multiFaceLandmarks[0]);
    }
};
