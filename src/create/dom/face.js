
const Face = {

    init:function (obj){
        let el = document.getElementById(obj.el);

        if (!el){
            throw new Error('No "'+obj.el+'" element found');
        }

        el.style.position = 'relative'

        let video = document.createElement('video');
        video.setAttribute("id","visio-login-video");
        video.style.setProperty('display','none');
        video.style.zIndex = 1
        el.appendChild(video);

        let canvas = document.createElement('canvas');
        canvas.setAttribute('id','visio-login-canvas')
        canvas.setAttribute('width',obj.width)
        canvas.setAttribute('height',obj.height)
        canvas.style.zIndex = 1
        el.appendChild(canvas)

        let div = document.createElement('div');
        div.setAttribute('id','visio-login-div')
        div.style.width = '100%';
        div.style.height = '100%'
        div.style.zIndex = 2;
        div.style.position = 'absolute'
        div.style.left = '50%';
        div.style.top = '50%'
        div.style.transform = 'translate(-50%, -50%)'
        el.appendChild(div)
    }

}

export { Face }
