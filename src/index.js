import { Face } from "./create/dom/face.js";
import {start,restart} from "./create/camera/camera.js";
import def from './create/default/def.js'

const face = {
    init: function (obj) {
        if (!obj) {
            throw new Error("Element not provided. Please pass a valid DOM element to initialize VisioLogin.");
        }
        if (!obj.el) {
            throw new Error("Element not provided. Please pass a valid DOM element to initialize VisioLogin.");
        }
        window.onload = function() {
            def(obj);
            Face.init(obj);
            start(obj);
        };
    },
    restart: function (obj){
        restart(obj)
    }
}

export { face } ;
