const templateModule = require.context('../../styles/template', true, /\.js$/);
import defaultElement from "@/core/dom/defaultElement";

const faceElements = {
    init: function (obj) {
        const el = typeof obj.el === 'string'
            ? document.querySelector(`#${obj.el.replace(/^#|^\./, '')}`) ||
            document.getElementById(obj.el.replace(/^#/, '')) ||
            document.getElementsByClassName(obj.el.replace(/^\./, ''))[0]
            : obj.el instanceof HTMLElement
                ? obj.el
                : null;
        if (!el) throw new Error(`No element found for "${obj.el}"`);
        obj.parentElement = el;
        try {
            (obj.appearance
                ? templateModule(`./${obj.type}/index.js`).default
                : defaultElement)(el);
        } catch {
            throw new Error('No available template found');
        }
    }
};

export { faceElements };
