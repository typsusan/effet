import {FaceMesh} from '@/util/faceMesh.js';
import {Camera} from '@/util/cameraUtils.js'
import getImageReturnUtils from "@/util/getImageReturnUtils";
import faceAction from "./action/faceAction";
import faceBefore from "./before/faceBefore";
import def from './defaultAssign/assign.js'
import AppState from "@/components/AppState";
import {cacheAllFiles, files, getFileFromIndexedDB} from "./db/db";
import {FACE_SIZE, FACE_TYPE} from "@/components/enums/Constant.ts";
import addFaceTemplate from "@/styles/template/addFace";
import cameraAccessUtils from "@/util/cameraAccessUtils";

var appData = new AppState();
let callBackObj = null;
let startObj = null;
let currentObj = null;


Object.defineProperty(appData, 'predictionState', {
    set: function (newVal) {
        if (newVal) {
            startRecording();
        }
    }
});

function start(obj){
    startObj = obj;
    appData.parentElement = obj.parentElement
    appData.wholeProcessState = true
    appData.videoElement = document.querySelector('#visio-login-video');
    appData.canvasElement = document.querySelector('#visio-login-canvas');
    appData.canvasElement.style.filter = `blur(${0}px)`
    appData.canvasCtx = appData.canvasElement.getContext('2d');
    if (cameraAccessUtils()) {
        initVideoAndCanvas(obj).then(()=>{
            callBackResult(obj,'开始绘制')
        }).catch(error=>{
            callBackResult(obj, '初始化失败', -1);
        })
    }
}

function close() {
    // 停止视频流
    if (appData.videoElement?.srcObject) {
        appData.videoElement.srcObject.getTracks().forEach(track => track.stop());
        appData.videoElement.srcObject = null;
    }
    // 清除画布
    appData.canvasCtx?.clearRect(0, 0, appData.canvasElement?.width || 0, appData.canvasElement?.height || 0);
    // 重置应用状态
    Object.assign(appData, {
        wholeProcessState: false,
        currentText: '',
        recordedChunks: []
    });
}

function restart(obj){
    steps = 0
    if (obj){
        if (typeof obj !== 'object'){
            throw new Error("Not a valid object");
        }
        def(obj,FACE_TYPE,FACE_SIZE)
        obj.callBack = startObj.callBack
        obj.parentElement = startObj.parentElement
        obj.type = startObj.type
        startObj = obj
    }
    close();
    appData = new AppState();
    if (!startObj){
        throw new Error("Please complete the call to 'init' before invoking the restart task");
    }
    if (startObj.type === FACE_TYPE.ADD){
        addFaceTemplate(startObj).destroy()
    }
    start(startObj)
}

function initVideoAndCanvas(obj) {
    return navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            return new Promise((resolve, reject) => {
                appData.videoElement.srcObject = stream;
                appData.videoElement.onloadedmetadata = async () => {
                    try {
                        appData.videoElement.play();
                        callBackResult(obj, '视频流已获取并播放', 1);
                        await startFaceMesh(obj);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                };
            });
        })
        .catch(error => {
            throw error;
        });
}

async function startFaceMesh(obj) {
    callBackResult(obj, '人脸开始检测');
    let faceMesh;
    // 检查是否支持 IndexedDB
    if (!('indexedDB' in window)) {
        console.warn('当前环境不支持IndexedDB，将使用默认的CDN模式');
        faceMesh = new FaceMesh({
            locateFile: file => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });
    } else {
        // 获取 IndexedDB 中的文件
        const fileBlobs = await Promise.all(files.map(file => getFileFromIndexedDB(file)));

        if (fileBlobs.every(blob => blob instanceof Blob)) { // 确保每个文件都是 Blob 对象
            faceMesh = new FaceMesh({
                locateFile: file => {
                    const blob = fileBlobs[files.indexOf(file)];
                    if (blob) {
                        return URL.createObjectURL(blob); // 确保传入的是 Blob 对象
                    } else {
                        throw new Error(`File not found in IndexedDB: ${file}`);
                    }
                },
            });
        } else {
            console.error('One or more files are not Blob objects:', fileBlobs);
            await cacheAllFiles();
            // 重新调用 startFaceMesh 以确保使用缓存文件
            return startFaceMesh(obj);
        }
    }

    faceMesh.setOptions(obj.face);
    currentObj = obj;
    faceBefore(appData, currentObj, callBackResult, stopRecording, startRecording);
    faceMesh.onResults(onResults);

    const camera = new Camera(appData.videoElement, {
        onFrame: async () => {
            await faceMesh.send({ image: appData.videoElement });
        },
        width: 1280,
        height: 720
    });
    camera.start();
}

function onResults(results){
    if (!appData.wholeProcessState){
        return;
    }
    faceAction(appData,results,currentObj,callBackResult,stopRecording,startRecording)
}

let steps = 0;

function callBackResult(obj, message,step, base64Array = [], video = null,key = '') {
    if (!obj || typeof obj.callBack !== 'function') {
        console.error('Invalid callback object or function:', obj);
        return;
    }
    if (appData.currentText ===  message){
        return;
    }
    steps = steps === 0 ? 1 : ++ steps;
    appData.currentText = message
    callBackObj = {
        videoElement: appData.videoElement,
        canvasElement: appData.canvasElement,
        progress_message: message,
        parentElement:appData.parentElement,
        step: (typeof step === 'number' && step <= 0) ? step : steps,
        base64Array: base64Array,
        video: video,
        secretKey:key,
    };
    obj.callBack(callBackObj);
}

function startRecording() {
    const options = { mimeType: "video/webm; codecs=vp9" };
    if (!appData.mediaRecorder || appData.mediaRecorder.state === "inactive") {
        appData.mediaRecorder = new MediaRecorder(appData.videoElement.srcObject, options);
        appData.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                appData.recordedChunks.push(event.data);
            }
        };
        appData.mediaRecorder.start();
    }
}


function stopRecording(obj) {
    if (obj.type === FACE_TYPE.LOGIN){
        appData.canvasElement.style.filter = `blur(${obj.blur}px)`;
        appData.wholeProcessState = false;
    }
    getImageReturnUtils(appData,obj,callBackResult)
}


export { start,restart,close }
