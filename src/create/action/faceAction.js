/**
 * ‘人脸动作’ 集合入口
 * 'Face Action' collection entry
 */
import faceColor from "../../color/faceColor";
import isEmptyFunctionUtil from "../../util/isEmptyFunctionUtil";

// 使用 require.context 动态加载模块
const actionModules = require.context('./', true, /\.js$/);

export default (appData, results, currentObj, callBackResult, stopRecording, startRecording) => {
    appData.canvasCtx.save();
    appData.canvasCtx.clearRect(0, 0, appData.canvasElement.width, appData.canvasElement.height);
    appData.canvasCtx.drawImage(results.image, 0, 0, appData.canvasElement.width, appData.canvasElement.height);
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        if (!appData.predictionState) {
            appData.predictionState = true;
            startRecording();
        }
        if (currentObj.action){
            if (typeof currentObj.action === 'function'){
                faceColor(appData.canvasCtx, results.multiFaceLandmarks, currentObj);
                isEmptyFunctionUtil(currentObj.action,'action')
                currentObj.action(appData,results,currentObj,callBackResult, stopRecording, startRecording)
            }else {
                throw Error("'action' is not a valid function")
            }
        }else {
            // 动态加载模块
            const actionModule = actionModules(`./${currentObj.type}/index.js`);
            if (actionModule) {
                const actionFunction = actionModule.default;
                actionFunction(appData, results, currentObj, callBackResult, stopRecording);
            } else {
                console.error(`无法找到模块：${currentObj.type}`);
            }
        }
    } else {
        callBackResult(currentObj, '未检测到人脸...', -2);
        appData.predictionState = false;
        appData.lastNoseX = null;
        appData.noseXChanges = [];
        if (appData.mediaRecorder && appData.mediaRecorder.state !== "inactive") {
            appData.mediaRecorder.stop();
            appData.mediaRecorder = null;
        }
    }
    appData.canvasCtx.restore();
}
