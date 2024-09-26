const templateModule = require.context('../../styles/template', true, /\.js$/);

const faceElements = {
    init: function (obj) {
        let el;
        if (typeof obj.el === 'string') {
            let selector = obj.el.replace(/^#|^\./, '');
            el = document.querySelector(`#${selector}, .${selector}`);
            if (!el) {
                el = document.getElementById(selector);
            }
            if (!el) {
                el = document.getElementsByClassName(selector)[0];
            }
        } else if (obj.el instanceof HTMLElement) {
            el = obj.el;
        }

        if (!el) {
            throw new Error(`No element found for "${obj.el}"`);
        }

        obj.parentElement = el

        if (obj.appearance){
            try {
                const defaultFun = templateModule(`./${obj.type}/default/index.js`).default;
                defaultFun(obj);
            }catch (E){
                throw Error('No available template found')
            }
        }else {
            let video = document.createElement('video');
            video.setAttribute("id", "visio-login-video");
            video.style.setProperty('display', 'none');
            video.style.zIndex = 1;
            el.appendChild(video);

            let canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'visio-login-canvas');

            // Get the dimensions of the element
            const rect = el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            // Set the canvas size
            canvas.width = width;
            canvas.height = height;

            // Optional: if you need to set the CSS width and height for other purposes
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            canvas.style.zIndex = 1;
            el.appendChild(canvas);
        }
    }
};

export { faceElements };
