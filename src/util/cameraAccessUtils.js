
export default () =>{
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isHttps = window.location.protocol === 'https:';
    if (isLocalhost || isHttps) {
        return true;
    } else {
        console.warn('Camera access is not supported in the current environment. Please use HTTPS or a local development environment.');
        return false;
    }
}
