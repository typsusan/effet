/**
 * ‘人脸动作’ 集合入口
 * 'Face Action' collection entry
 */
import faceColor from "../../color/faceColor";
import checkLogin from "./checkLogin";
import apexNasi from "./checkLogin/apex-nasi";
import iris from "./checkLogin/iris";

export default (appData, results, currentObj, callBackResult, stopRecording, startRecording) => {
    appData.canvasCtx.save();
    appData.canvasCtx.clearRect(0, 0, appData.canvasElement.width, appData.canvasElement.height);
    appData.canvasCtx.drawImage(results.image, 0, 0, appData.canvasElement.width, appData.canvasElement.height);
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        if (!appData.predictionState) {
            appData.predictionState = true;
            startRecording();  // 当人脸重新被检测到时，重新开始录制
        }
        faceColor(appData.canvasCtx, landmarks, currentObj);
       // checkLogin(appData,results,currentObj,callBackResult,stopRecording);
        //apexNasi(appData,results,currentObj,callBackResult,stopRecording);
        iris(appData,results,currentObj,callBackResult,stopRecording)
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

