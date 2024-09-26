import faceColor from "@/styles/faceColor";
import addFace from "@/styles/template/addFace/default"
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

    const meetsCriteria = checkIfMeetsCriteria(landmarks, currentObj);

    const addDirection = (direction) => {
        appData.headDirectionResult.push(direction);
        if (appData.headDirectionResult.length >= 4) {
            callBackResult(currentObj, '全部方向检测通过');
            stopRecording(currentObj);
        }
    }

    if (!meetsCriteria){
        appData.canvasElement.style.filter = `blur(${8}px)`
        callBackResult(currentObj, '请距离屏幕近一点');
    }else {
        appData.canvasElement.style.filter = `blur(${0}px)`
        if (headDirection) {
            if (appData.headDirectionResult.findIndex(he => he === headDirection) !== -1){
                return;
            }
            addDirection(headDirection)
            addFace(currentObj).animation(headDirection)
        }
    }

    function checkIfMeetsCriteria(landmarks, currentObj) {
        const canvasWidth = appData.canvasElement.width;
        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        // 检查关键点是否存在
        if (!leftCheek || !rightCheek) {
            return false;
        }
        const headWidth = Math.abs(rightCheek.x - leftCheek.x) * canvasWidth;
        const distance = (canvasWidth * 0.5) / headWidth * 10;
        return distance <= currentObj.addFaceDistance;
    }
};
