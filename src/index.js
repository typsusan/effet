import { faceElements } from "./create/dom/createFaceElements.js";
import { restart, start, close } from "./create/croe";
import def from './create/default/def.js';
import { FACE_TYPE, FACE_LOADING, FACE_SIZE, FACE_TEMPLATE } from "./enum";
import { cacheAllFiles } from "./create/db/db";
import { $inform } from './overall/notification/notification';

// 引入样式文件
const requireStyles = require.context('./overall', true, /\.css$/);
requireStyles.keys().forEach(requireStyles);

// 初始化函数
export function init(obj) {
    if (!obj?.el) {
        throw new Error("Element not provided. Please pass a valid DOM element to initialize effet.");
    }

    // 初始化基础设置
    def(obj, FACE_TYPE, FACE_LOADING, FACE_SIZE, FACE_TEMPLATE);
    faceElements.init(obj);

    cacheAllFiles()
        .then(() => {
            start(obj);
        })
        .catch(error => {
            console.error('Caching files failed, falling back to CDN:', error);
            start(obj); // 缓存失败时仍然启动
        });
}

// 导出模块
export {
    restart,
    close,
    FACE_TYPE,
    FACE_LOADING,
    $inform,
    FACE_SIZE,
    FACE_TEMPLATE
};

export default {
    init,
    close,
    restart,
    FACE_TYPE,
    FACE_LOADING,
    $inform,
    FACE_SIZE,
    FACE_TEMPLATE
};
