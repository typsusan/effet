export default (obj = {},FACE_TYPE = {})=>{

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

    if (typeof obj.sleepContinuousPush !== 'boolean'){
        obj.sleepContinuousPush = false
    }

    if (typeof obj.punchDistance !== 'number'){
        obj.punchDistance = 30
    }

    if (typeof obj.punchSuccessColor !== 'string'){
        obj.punchSuccessColor = '#13ce66'
    }

    if (typeof obj.sleepEarThreshold !== 'number'){
        obj.sleepEarThreshold = 0.2
    }

    if (typeof obj.sleepTime !== 'number'){
        obj.sleepTime = 2
    }
}
