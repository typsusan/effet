import {calculateDistance} from "../../../util/distanceUtils";
import faceColor from "../../../color/faceColor";
let sleepStartTime = null; // 记录闭眼开始时间
let wakeStartTime = null; // 记录睁眼开始时间

export default (appData, results, currentObj, callBackResult, stopRecording, startRecording) => {
    faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);
    results.multiFaceLandmarks.forEach((landmarks, index) => {
        // 获取双眼的关键点索引
        const leftEyeIndexes = [362, 385, 387, 263, 373, 380];
        const rightEyeIndexes = [33, 160, 158, 133, 153, 144];

        if (currentObj.sleepContinuousPush){
            appData.currentText = ''
        }

        // 计算左眼和右眼的EAR
        const leftEAR = calculateEAR(landmarks, leftEyeIndexes);
        const rightEAR = calculateEAR(landmarks, rightEyeIndexes);
        // 平均EAR值
        const avgEAR = (leftEAR + rightEAR) / 2.0;
        // 设定一个阈值，通常为0.2以下认为眼睛闭合
        const earThreshold = currentObj.sleepEarThreshold;
        const isSleeping = avgEAR < earThreshold;

        if (isSleeping) {
            if (!sleepStartTime) {
                // 如果开始闭眼时，记录开始时间
                sleepStartTime = Date.now();
            } else {
                // 检查闭眼持续时间是否超过阈值
                const elapsedTime = Date.now() - sleepStartTime;
                if (elapsedTime >= (currentObj.sleepTime * 1000)) {
                    stopRecording(currentObj)
                }
            }
            // 闭眼时重置wakeStartTime
            wakeStartTime = null;
        } else {
            if (!wakeStartTime) {
                // 记录睁眼开始时间
                wakeStartTime = Date.now();
            } else {
                const wakeElapsedTime = Date.now() - wakeStartTime;
                if (wakeElapsedTime >= 500) { // 设置一个500毫秒的阈值
                    // 如果睁眼持续超过阈值，重置sleepStartTime
                    sleepStartTime = null;
                    appData.currentText = ''
                }
            }
        }
    });
};

const calculateEAR = (landmarks, eyeIndexes) => {
    // 获取关键点坐标
    const p2_p6 = calculateDistance(landmarks[eyeIndexes[1]], landmarks[eyeIndexes[5]]);
    const p3_p5 = calculateDistance(landmarks[eyeIndexes[2]], landmarks[eyeIndexes[4]]);
    const p1_p4 = calculateDistance(landmarks[eyeIndexes[0]], landmarks[eyeIndexes[3]]);
    return (p2_p6 + p3_p5) / (2.0 * p1_p4);
};
