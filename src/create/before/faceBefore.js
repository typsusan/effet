import isEmptyFunctionUtil from "../../util/isEmptyFunctionUtil";

export default (appData,currentObj,callBackResult,stopRecording,startRecording)=>{
    if (currentObj.before){
        if (typeof currentObj.before === 'function'){
            isEmptyFunctionUtil(currentObj.before,'before')
            currentObj.before(appData,currentObj,callBackResult,stopRecording,startRecording)
        }else {
            throw Error("'before' is not a valid function")
        }
    }else {
        import(/* webpackChunkName: "[request]" */ `./${currentObj.type}`)
        .then(module => {
            const actionFunction = module.default;
            actionFunction(appData,currentObj,callBackResult,stopRecording,startRecording);
        })
        .catch(error => {
            console.error(`Failed to load module for type: ${currentObj.type}`, error);
        });
    }
}
