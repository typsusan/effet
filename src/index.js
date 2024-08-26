import { faceElements } from "./create/dom/createFaceElements.js";
import { restart, start } from "./create/croe";
import def from './create/default/def.js';
import { FACE_TYPE } from "./enum";
import { cacheAllFiles } from "./create/db/db";

export function init(obj) {
    if (!obj) {
        throw new Error("Element not provided. Please pass a valid DOM element to initialize effet.");
    }
    if (!obj.el) {
        throw new Error("Element not provided. Please pass a valid DOM element to initialize effet.");
    }

    window.onload = function() {
        def(obj, FACE_TYPE);
        faceElements.init(obj);
        cacheAllFiles()
            .then(() => {
                start(obj);
            })
            .catch(error => {
                console.error('Caching files failed, falling back to CDN:', error);
                start(obj);
            });
    };
}

export { restart, FACE_TYPE };

export default {
    init,
    restart,
    FACE_TYPE
};
