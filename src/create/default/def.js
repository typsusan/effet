export default (obj = {})=>{
    obj.width = obj.width || 640;
    obj.height = obj.height || 480;
    obj.blur = obj.blur || 8;
    if (!obj.faceStyle) {
        obj.faceStyle = {};
        obj.faceStyle.faceColor = {
            color: '#2cc1dc',
            line: 1
        };
    } else {
        if (!obj.faceStyle.faceColor) {
            obj.faceStyle.faceColor = {
                color: '#2cc1dc',
                line: 1
            };
        } else {
            if (!obj.faceStyle.faceColor.color) {
                obj.faceStyle.faceColor.color = '#2cc1dc';
            }
            if (typeof obj.faceStyle.faceColor.line !== 'number') {
                obj.faceStyle.faceColor.line = 1;
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
}
