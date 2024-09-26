import faceColor from "@/styles/faceColor";
import addFace from "@/styles/template/addFace/default"
const NOSE_X_CHANGE_HISTORY_LENGTH = 10;
const NOSE_Y_CHANGE_HISTORY_LENGTH = 10;
const noseXChanges = [];
const noseYChanges = [];
let lastNoseX = null; // 初始化为 null
let lastNoseY = null; // 初始化为 null
let headDirectionResult = []

export default (appData, results, currentObj) => {
    const landmarks = results.multiFaceLandmarks[0];
    faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);

    const noseTip = landmarks[1]; // 鼻尖的标记点
    const tiltThreshold = 0.009; // 水平偏移阈值
    const nodThreshold = 0.009; // 垂直偏移阈值
    const neutralThreshold = 0.009; // 中间点阈值

    let headDirection = null; // 'left', 'right', 'up', 'down' or null

    // 检测头部方向
    if (lastNoseX !== null) {
        const dx = noseTip.x - lastNoseX;
        noseXChanges.push(Math.abs(dx));

        if (noseXChanges.length > NOSE_X_CHANGE_HISTORY_LENGTH) {
            noseXChanges.shift();
        }

        const maxChangeX = Math.max(...noseXChanges);
        if (maxChangeX > tiltThreshold) {
            headDirection = dx > 0 ? 'left' : 'right'; // 判定方向
        }
    }

    if (lastNoseY !== null) {
        const dy = noseTip.y - lastNoseY;
        noseYChanges.push(Math.abs(dy));

        if (noseYChanges.length > NOSE_Y_CHANGE_HISTORY_LENGTH) {
            noseYChanges.shift();
        }

        const maxChangeY = Math.max(...noseYChanges);
        if (maxChangeY > nodThreshold) {
            headDirection = dy > 0 ? 'up' : 'down'; // 判定方向
        }
    }

    // 检测中间状态
    if (headDirection && Math.abs(noseTip.x - lastNoseX) < neutralThreshold && Math.abs(noseTip.y - lastNoseY) < neutralThreshold) {
        headDirection = null; // 重置为中间状态
    }

    lastNoseX = noseTip.x;
    lastNoseY = noseTip.y;


    const meetsCriteria = checkIfMeetsCriteria(landmarks, currentObj);


    const addDirection = (direction) => {
        headDirectionResult.push(direction);
        if (headDirectionResult.length >= 4) {
            console.log("4个方向完结");
        }
    }

    if (!meetsCriteria){
        appData.canvasElement.style.filter = `blur(${8}px)`
        console.log("距离===================")
    }else {
        appData.canvasElement.style.filter = `blur(${0}px)`
        if (headDirection) {
            if (headDirectionResult.findIndex(he => he === headDirection) !== -1){
                return;
            }
            addDirection(headDirection)
            console.log(`头部方向检测通过，方向: ${headDirection}`);
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
        return distance <= 20;
    }
};
