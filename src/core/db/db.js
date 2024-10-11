import resourceFile from '../../resource/index';
import { Base64 } from 'js-base64';

async function cacheFileToIndexedDB(fileName) {
    // 首先检查文件是否已经存在
    const existingFile = await getFileFromIndexedDB(fileName);
    if (existingFile) {
        return;
    }
    const encodedBase64String = resourceFile[fileName];
    const decodedData = Base64.toUint8Array(encodedBase64String);
    // 确定 Blob 的 MIME 类型
    let mimeType = "application/octet-stream";

    if (fileName.endsWith(".wasm")) {
        mimeType = "application/wasm"; // 设置 .wasm 的 MIME 类型
    }else if (fileName.endsWith(".js")){
        mimeType = "application/javascript";
    }
    let blob = new Blob([decodedData], { type: mimeType });
    const db = await openIndexedDB();
    const transaction = db.transaction('faceMeshFiles', 'readwrite');
    const store = transaction.objectStore('faceMeshFiles');
    store.put(blob, fileName);
}

function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FaceMeshDB', 1);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore('faceMeshFiles');
        };
        request.onsuccess = event => {
            resolve(event.target.result);
        };
        request.onerror = event => {
            reject(event.target.error);
        };
    });
}

const files = [
    'face_mesh.binarypb',
    'face_mesh_solution_packed_assets.data',
    'face_mesh_solution_packed_assets_loader.js',
    'face_mesh_solution_simd_wasm_bin.js',
    'face_mesh_solution_simd_wasm_bin.wasm'
];

async function cacheAllFiles() {
    for (const file of files) {
        await cacheFileToIndexedDB(file);
    }
}

async function getFileFromIndexedDB(fileName) {
    const db = await openIndexedDB();
    const transaction = db.transaction('faceMeshFiles', 'readonly');
    const store = transaction.objectStore('faceMeshFiles');
    return new Promise((resolve, reject) => {
        const request = store.get(fileName);
        request.onsuccess = event => {
            resolve(event.target.result); // 确保返回的是 Blob 对象
        };
        request.onerror = event => {
            reject(event.target.error);
        };
    });
}

export {
    files,
    getFileFromIndexedDB,
    cacheAllFiles
}
