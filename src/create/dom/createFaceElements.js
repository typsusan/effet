const faceElements = {
    init: function (obj) {
        let el = document.getElementById(obj.el);
        if (!el) {
            throw new Error('No "' + obj.el + '" element found');
        }

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
};

export { faceElements };
