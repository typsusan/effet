import {generateKey} from "./getKey";
import imageUtils from "./imageUtils";

/**
 * 适用于单张人脸图片的输出
 * @param appData
 * @param currentObj
 * @param callBackResult
 */
export default (appData,currentObj,callBackResult)=>{
    const base64Data = appData.canvasElement.toDataURL('image/png');
    const key = generateKey();
    const img = imageUtils(base64Data,key)
    let resultsImages = []
    resultsImages.push(img)
    appData.currentImages = resultsImages;
    callBackResult(currentObj, 'success', 10, resultsImages, null, key);
}
