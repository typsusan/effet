export default () => {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isHttps = window.location.protocol === 'https:';
    const isFileProtocol = window.location.protocol === 'file:';
    const isLocalNetwork = /^192\.168\.\d+\.\d+$/.test(window.location.hostname) || /^10\.\d+\.\d+\.\d+$/.test(window.location.hostname);
    const isLocalDomain = /\.local$/.test(window.location.hostname) || /\.dev$/.test(window.location.hostname);
    const isChromeExtension = window.location.protocol === 'chrome-extension:';

    if (isLocalhost || isHttps || isFileProtocol || isLocalNetwork || isLocalDomain || isChromeExtension) {
        return true;
    } else {
        console.warn('摄像头访问不支持当前环境。请使用 HTTPS、本地开发环境、内网地址或本地文件访问。');
        return false;
    }
}
