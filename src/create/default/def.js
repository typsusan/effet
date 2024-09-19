export default (obj = {},FACE_TYPE = {},FACE_LOADING = {},FACE_SIZE = {},FACE_TEMPLATE = {})=>{

    if (typeof obj.blur !== 'number'){
        obj.blur = 8;
    }
    if (!obj.faceStyle) {
        obj.faceStyle = {};
    } else {
        if (typeof obj.faceStyle !== 'object') {
            throw new Error('"faceStyle" is not a valid object');
        }
        for (let keyObj in obj.faceStyle) {
            if (obj.faceStyle.hasOwnProperty(keyObj) && typeof obj.faceStyle[keyObj] === 'object') {
                obj.faceStyle[keyObj].color = obj.faceStyle[keyObj].color || '#00d6e1';
                obj.faceStyle[keyObj].line = typeof obj.faceStyle[keyObj].line === 'number' ? obj.faceStyle[keyObj].line : 1;
            }
        }
    }
    if (!obj.face){
        obj.face = {
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        }
    }else {

        if (typeof obj.face !== 'object'){
            throw Error('"face" is not a valid object');
        }

        if (typeof obj.face.maxNumFaces !== 'number'){
            obj.face.maxNumFaces = 1
        }

        if (typeof obj.face.minDetectionConfidence !== 'number'){
            obj.face.minDetectionConfidence = 0.5
        }

        if (typeof obj.face.minTrackingConfidence !== 'number'){
            obj.face.minTrackingConfidence = 0.5
        }

        if (typeof obj.face.refineLandmarks !== 'boolean'){
            obj.face.refineLandmarks = true
        }
    }

    if (!obj.threshold){
        obj.threshold = {
            lips:0.05,
            eye:0.011,
            headShake:0.01,
        }
    }else {

        if (typeof obj.threshold !== 'object'){
            throw Error('"threshold" is not a valid object');
        }
        if (typeof obj.threshold.lips !== 'number'){
            obj.threshold.lips = 0.05
        }
        if (typeof obj.threshold.eye !== 'number'){
            obj.threshold.eye = 0.05
        }
        if (typeof obj.threshold.headShake !== 'number'){
            obj.threshold.headShake = 0.05
        }
    }
    if (!obj.type){
        obj.type = FACE_TYPE.LOGIN
    }else {
        if (!Object.values(FACE_TYPE).includes(obj.type)){
            obj.type = FACE_TYPE.LOGIN
        }
    }


    if (obj.faceTemplate){
        if (typeof obj.faceTemplate !== 'object') {
            throw new Error('"faceTemplate" is not a valid object');
        }

        if (!obj.faceTemplate.size){
            obj.faceTemplate.size = FACE_SIZE.MID
        }else {
            if (!Object.values(FACE_SIZE).includes(obj.faceTemplate.size)){
                obj.faceTemplate.size = FACE_SIZE.MID
            }
        }

        // 根据不同类型选择默认值,待开发
        if (!obj.faceTemplate.type){
            obj.faceTemplate.type = FACE_TEMPLATE.FACE_RULE
        }else {
            if (!Object.values(FACE_TEMPLATE).includes(obj.faceTemplate.type)){
                obj.faceTemplate.type = FACE_TEMPLATE.FACE_RULE
            }
        }

        if (typeof obj.faceTemplate.tips !== 'boolean'){
            obj.faceTemplate.tips = true
        }

    }

    if (obj.loading){
        if (!Object.values(FACE_LOADING).includes(obj.loading)){
            obj.type = FACE_LOADING.MATRIX
        }
    }

    if (typeof obj.loadingColor === 'string'){
        const root = document.documentElement;
        root.style.setProperty('--face-effet-main-color', obj.loadingColor);
    }

    // 人脸登录强制只检测当前人脸
    if (obj.type === FACE_TYPE.LOGIN){
        obj.face.maxNumFaces = 1
    }

    if (typeof obj.sleepContinuousPush !== 'boolean'){
        obj.sleepContinuousPush = false
    }

    if (typeof obj.punchDistance !== 'number'){
        obj.punchDistance = 30
    }

    if (typeof obj.punchSuccessColor !== 'string'){
        obj.punchSuccessColor = '#00d6e1'
    }

    if (typeof obj.sleepEarThreshold !== 'number'){
        obj.sleepEarThreshold = 0.2
    }

    if (typeof obj.sleepTime !== 'number'){
        obj.sleepTime = 2
    }
}
