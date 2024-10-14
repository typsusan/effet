async function cacheFileToIndexedDB(url, fileName) {
    // 首先检查文件是否已经存在
    const existingFile = await getFileFromIndexedDB(fileName);
    if (existingFile) {
        return;
    }

    // 如果不存在，则下载并缓存文件
    const response = await fetch(url);
    const blob = await response.blob();

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
    // 并行缓存所有文件
    const promises = files.map(file => {
        const url = `https://unpkg.com/facemesh@0.6.6/${file}`;
        return cacheFileToIndexedDB(url, file);
    });
    // 等待所有请求完成
    await Promise.all(promises);
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
