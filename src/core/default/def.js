export default (obj = {}, FACE_TYPE = {},  FACE_SIZE = {}) => {
    // 默认参数
    obj.blur = typeof obj.blur === 'number' ? obj.blur : 8;

    obj.faceStyle = obj.faceStyle || {};
    if (typeof obj.faceStyle !== 'object') throw new Error('"faceStyle" is not a valid object');
    Object.keys(obj.faceStyle).forEach(key => {
        const style = obj.faceStyle[key];
        if (typeof style === 'object') {
            style.color = style.color || '#00d6e1';
            style.line = typeof style.line === 'number' ? style.line : 1;
        }
    });

    obj.face = obj.face || {
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    };
    if (typeof obj.face !== 'object') throw new Error('"face" is not a valid object');
    obj.face.maxNumFaces = typeof obj.face.maxNumFaces === 'number' ? obj.face.maxNumFaces : 1;
    obj.face.minDetectionConfidence = typeof obj.face.minDetectionConfidence === 'number' ? obj.face.minDetectionConfidence : 0.5;
    obj.face.minTrackingConfidence = typeof obj.face.minTrackingConfidence === 'number' ? obj.face.minTrackingConfidence : 0.5;
    obj.face.refineLandmarks = typeof obj.face.refineLandmarks === 'boolean' ? obj.face.refineLandmarks : true;

    obj.threshold = obj.threshold || { lips: 0.05, eye: 0.011, headShake: 0.01 };
    if (typeof obj.threshold !== 'object') throw new Error('"threshold" is not a valid object');
    obj.threshold.lips = typeof obj.threshold.lips === 'number' ? obj.threshold.lips : 0.05;
    obj.threshold.eye = typeof obj.threshold.eye === 'number' ? obj.threshold.eye : 0.05;
    obj.threshold.headShake = typeof obj.threshold.headShake === 'number' ? obj.threshold.headShake : 0.05;

    obj.type = Object.values(FACE_TYPE).includes(obj.type) ? obj.type : FACE_TYPE.LOGIN;

    obj.size = Object.values(FACE_SIZE).includes(obj.size) ? obj.size : FACE_SIZE.MID;


    // 人脸登录强制只检测当前人脸
    if (obj.type === FACE_TYPE.LOGIN || obj.type === FACE_TYPE.ADD) {
        obj.face.maxNumFaces = 1;
    }
    obj.appearance = typeof obj.appearance === 'boolean' ? obj.appearance : true
    obj.sleepContinuousPush = typeof obj.sleepContinuousPush === 'boolean' ? obj.sleepContinuousPush : false;
    obj.punchDistance = typeof obj.punchDistance === 'number' ? obj.punchDistance : 30;
    obj.punchSuccessColor = typeof obj.punchSuccessColor === 'string' ? obj.punchSuccessColor : '#00d6e1';
    obj.sleepEarThreshold = typeof obj.sleepEarThreshold === 'number' ? obj.sleepEarThreshold : 0.2;
    obj.sleepTime = typeof obj.sleepTime === 'number' ? obj.sleepTime : 2;
};
