import {generateKey} from "./getKey";
import imageUtils from "./imageUtils";

/**
 * 适用于单张人脸图片的输出
 * @param appData 内容数据
 * @param currentObj 当前流程数据
 * @param callBackResult 回调函数
 * @param featurePoints 人脸特征点
 */
export default (appData,currentObj,callBackResult,featurePoints)=>{
    const _base64Data = appData.canvasElement.toDataURL('image/png');
    const _key = generateKey();
    const _img = imageUtils(_base64Data,_key)
    let _resultsImages = []
    _resultsImages.push(_img)
    appData.currentImages = _resultsImages;
    callBackResult(currentObj, 'success', 10, _resultsImages, null, _key,featurePoints);
}
