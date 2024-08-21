import {drawConnectors} from "../util/drawingUtils";
import {
    FACEMESH_FACE_OVAL,
    FACEMESH_LEFT_EYE, FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_IRIS, FACEMESH_LIPS,
    FACEMESH_RIGHT_EYE,
    FACEMESH_RIGHT_EYEBROW,
    FACEMESH_RIGHT_IRIS,
    FACEMESH_TESSELATION
} from "../util/faceMesh";

export default (app, array, obj) => {
    array.forEach(landmarks =>{
        drawConnectors(app, landmarks, FACEMESH_TESSELATION, {
            color: obj.drawFace ? obj.faceStyle.faceColor.color : 'transparent',
            lineWidth: obj.faceStyle.faceColor.line
        });

        const drawFacePart = (part, landmarks, connector, currentObj) => {
            const color = part?.color;
            const lineWidth = part?.line;
            if (color && typeof lineWidth === 'number') {
                drawConnectors(app, landmarks, connector, {
                    color: currentObj.drawFace ? color : 'transparent',
                    lineWidth
                });
            }
        };
        drawFacePart(obj.faceStyle.rightEye, landmarks, FACEMESH_RIGHT_EYE, obj);
        drawFacePart(obj.faceStyle.rightEyebrow, landmarks, FACEMESH_RIGHT_EYEBROW, obj);
        drawFacePart(obj.faceStyle.rightIris, landmarks, FACEMESH_RIGHT_IRIS, obj);
        drawFacePart(obj.faceStyle.leftEye, landmarks, FACEMESH_LEFT_EYE, obj);
        drawFacePart(obj.faceStyle.leftEyebrow, landmarks, FACEMESH_LEFT_EYEBROW, obj);
        drawFacePart(obj.faceStyle.leftIris, landmarks, FACEMESH_LEFT_IRIS, obj);
        drawFacePart(obj.faceStyle.oval, landmarks, FACEMESH_FACE_OVAL, obj);
        drawFacePart(obj.faceStyle.lips, landmarks, FACEMESH_LIPS, obj);
    })
};
