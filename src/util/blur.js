export default (number)=>{
    const videoElement = document.querySelector('#visio-login-canvas');
    if (videoElement) {
        videoElement.style.filter = `blur(${number}px)`;
    }
}
