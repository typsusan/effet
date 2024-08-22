import isEmptyFunctionUtil from "../../util/isEmptyFunctionUtil";

// 使用 require.context 动态加载模块
const actionModules = require.context('./', true, /\.js$/);

export default (appData, currentObj, callBackResult, stopRecording, startRecording) => {
    if (currentObj.before) {
        if (typeof currentObj.before === 'function') {
            isEmptyFunctionUtil(currentObj.before, 'before');
            currentObj.before(appData, currentObj, callBackResult, stopRecording, startRecording);
        } else {
            throw Error("'before' is not a valid function");
        }
    } else {
        // 动态加载模块
        console.log(`路径：./${currentObj.type}/index.js`)
        const actionModule = actionModules(`./${currentObj.type}/index.js`);
        if (actionModule) {
            const actionFunction = actionModule.default;
            actionFunction(appData, currentObj, callBackResult, stopRecording, startRecording);
        } else {
            console.warn(`无法找到模块：${currentObj.type}`);
        }
    }
}
