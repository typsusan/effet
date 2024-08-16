import {drawConnectors} from "../util/drawingUtils";
import {
    FACEMESH_FACE_OVAL,
    FACEMESH_LEFT_EYE, FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_IRIS, FACEMESH_LIPS,
    FACEMESH_RIGHT_EYE,
    FACEMESH_RIGHT_EYEBROW,
    FACEMESH_RIGHT_IRIS,
    FACEMESH_TESSELATION
} from "../util/faceMesh";

export default (app, landmarks, obj) => {
    drawConnectors(app, landmarks, FACEMESH_TESSELATION, {color: obj.faceStyle.faceColor.color, lineWidth: obj.faceStyle.faceColor.line});
    const drawFacePart = (part, landmarks, connector) => {
        const color = part?.color;
        const lineWidth = part?.line;
        if (color && typeof lineWidth === 'number') {
            drawConnectors(app, landmarks, connector, {color, lineWidth});
        }
    };
    drawFacePart(obj.faceStyle.rightEye, landmarks, FACEMESH_RIGHT_EYE);
    drawFacePart(obj.faceStyle.rightEyebrow, landmarks, FACEMESH_RIGHT_EYEBROW);
    drawFacePart(obj.faceStyle.rightIris, landmarks, FACEMESH_RIGHT_IRIS);
    drawFacePart(obj.faceStyle.leftEye, landmarks, FACEMESH_LEFT_EYE);
    drawFacePart(obj.faceStyle.leftEyebrow, landmarks, FACEMESH_LEFT_EYEBROW);
    drawFacePart(obj.faceStyle.leftIris, landmarks, FACEMESH_LEFT_IRIS);
    drawFacePart(obj.faceStyle.oval, landmarks, FACEMESH_FACE_OVAL);
    drawFacePart(obj.faceStyle.lips, landmarks, FACEMESH_LIPS);
};
