import { faceElements } from "./create/dom/createFaceElements.js";
import { restart, start } from "./create/croe";
import def from './create/default/def.js';
import { FACE_TYPE } from "./enum";
import { cacheAllFiles } from "./create/db/db";

export function init(obj) {
    if (!obj) {
        throw new Error("Element not provided. Please pass a valid DOM element to initialize VisioLogin.");
    }
    if (!obj.el) {
        throw new Error("Element not provided. Please pass a valid DOM element to initialize VisioLogin.");
    }

    window.onload = function() {
        def(obj, FACE_TYPE);
        faceElements.init(obj);
        cacheAllFiles()
            .then(() => {
                start(obj); // 如果缓存成功，继续执行
            })
            .catch(error => {
                console.error('Caching files failed, falling back to CDN:', error);
                start(obj); // 如果缓存失败，依然继续执行
            });
    };
}

export { restart, FACE_TYPE };

export default {
    init,
    restart,
    FACE_TYPE
};
