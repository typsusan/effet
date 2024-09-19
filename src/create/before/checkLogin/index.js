import {FaceManager} from "../../../overall/template/components/FaceManager.ts";

export default (appData,currentObj,callBackResult,stopRecording,startRecording)=>{
    callBackResult(currentObj,'请眨眨眼')
    FaceManager.getInstance().updateMessage(0, "请眨眨眼");
}
