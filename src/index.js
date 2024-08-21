import { faceElements } from "./create/dom/createFaceElements.js";
import {start,restart} from "./create/croe";
import def from './create/default/def.js'
import {FACE_TYPE} from "./enum";

const face = {
    init: function (obj) {
        if (!obj) {
            throw new Error("Element not provided. Please pass a valid DOM element to initialize VisioLogin.");
        }
        if (!obj.el) {
            throw new Error("Element not provided. Please pass a valid DOM element to initialize VisioLogin.");
        }
        window.onload = function() {
            def(obj,FACE_TYPE);
            faceElements.init(obj);
            start(obj);
        };
    },
    restart: function (obj){
        restart(obj)
    }
}

export { face,FACE_TYPE } ;
