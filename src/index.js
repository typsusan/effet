/*!
 * Face-Effet.js
 * Copyright(c) 2024 typsusan
 * MIT Licensed : https://github.com/typsusan/effet/blob/master/License
 *
 * https://github.com/typsusan/effet
 * https://gitee.com/susantyp/effet
 */

import { faceElements } from "./core/dom/createFaceElements.js";
import { restart, start, close } from "./core/index";
import def from './core/defaultAssign/assign.js';
import { FACE_TYPE, FACE_SIZE } from "@/components/enums/Constant.ts";
import { cacheAllFiles } from "./core/db/db";

// 引入样式文件
const requireStyles = require.context('./styles', true, /\.css$/);
requireStyles.keys().forEach(requireStyles);

// 初始化函数
export function init(obj) {
    if (!obj?.el) {
        throw new Error("Element not provided. Please pass a valid DOM element to initialize effet.");
    }
    // 初始化基础设置
    def(obj, FACE_TYPE, FACE_SIZE);
    faceElements.init(obj);
    cacheAllFiles()
        .then(() => {
            start(obj);
        })
        .catch(error => {
            console.error('Caching files failed, falling back to CDN:', error);
            start(obj);
        });
}

// 导出模块
export {
    restart,
    close,
    FACE_TYPE,
    FACE_SIZE
};

export default {
    init,
    close,
    restart,
    FACE_TYPE,
    FACE_SIZE
};
