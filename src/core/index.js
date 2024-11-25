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

async function initVideoAndCanvas(obj) {
    try {
        // 直接跳过视频流初始化，由 Camera 类去处理摄像头权限请求
        appData.videoElement = document.querySelector('#visio-login-video');
        appData.canvasElement = document.querySelector('#visio-login-canvas');
        appData.canvasElement.style.filter = `blur(${0}px)`;
        appData.canvasCtx = appData.canvasElement.getContext('2d');
        await startFaceMesh(obj);
    } catch (error) {
        callBackResult(obj, '初始化失败', -1);
        throw error;
    }
}

async function startFaceMesh(obj) {
    callBackResult(obj, '人脸开始检测',1);
    let faceMesh;

    // 检查是否支持 IndexedDB
    if (!('indexedDB' in window)) {
        console.warn('当前环境不支持IndexedDB，将使用默认的CDN模式');
        faceMesh = new FaceMesh({
            locateFile: file => {
                return `https://unpkg.com/facemesh@0.6.6/${file}`;
            },
        });
    } else {
        // 并行获取 IndexedDB 中的文件
        const fileBlobs = await Promise.all(files.map(file => getFileFromIndexedDB(file)));

        if (fileBlobs.every(blob => blob instanceof Blob)) {
            // 使用 IndexedDB 缓存的文件
            faceMesh = new FaceMesh({
                locateFile: file => {
                    const blob = fileBlobs[files.indexOf(file)];
                    return URL.createObjectURL(blob); // 使用 Blob 对象创建 URL
                },
            });
        } else {
            console.log('文件尚未完全缓存，正在并行缓存所有文件...');
            await cacheAllFiles(); // 先并行缓存所有文件

            // 再次获取文件并并行处理
            const updatedFileBlobs = await Promise.all(files.map(file => getFileFromIndexedDB(file)));

            if (updatedFileBlobs.every(blob => blob instanceof Blob)) {
                faceMesh = new FaceMesh({
                    locateFile: file => {
                        const blob = updatedFileBlobs[files.indexOf(file)];
                        return URL.createObjectURL(blob);
                    },
                });
            } else {
                console.error('文件缓存失败，无法继续初始化 faceMesh。');
                return;
            }
        }
    }

    // 设置 faceMesh 的选项
    faceMesh.setOptions(obj.face);
    currentObj = obj;

    // 设置应用程序相关的回调和处理逻辑
    faceBefore(appData, currentObj, callBackResult, stopRecording, startRecording);
    faceMesh.onResults(onResults);

    // 初始化摄像头
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

function callBackResult(obj, message,step, base64Array = [], video = null,key = '',features) {
    if (!obj || typeof obj.callBack !== 'function') {
        console.error('Invalid callback object or function:', obj);
        return;
    }
    if (appData.currentText ===  message){
        return;
    }
    if (step === 1){
        steps = 0;
    }
    steps = steps === 0 ? 1 : ++ steps;
    appData.currentText = message
    callBackObj = {
        videoElement: appData.videoElement,
        canvasElement: appData.canvasElement,
        progressMessage: message,
        parentElement:appData.parentElement,
        step: (typeof step === 'number' && step <= 0) ? step : steps,
        base64Array: base64Array,
        video: video,
        secretKey:key,
        features:features
    };
    obj.callBack(callBackObj);
}

function startRecording() {
    let mimeType = ""; // 初始化 mimeType

    // 动态检测支持的 mimeType
    if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9")) {
        mimeType = "video/webm; codecs=vp9";
    } else if (MediaRecorder.isTypeSupported("video/webm; codecs=vp8")) {
        mimeType = "video/webm; codecs=vp8";
    } else if (MediaRecorder.isTypeSupported("video/mp4")) {
        mimeType = "video/mp4"; // iOS 上有时支持 mp4
    } else {
        console.warn("当前浏览器不支持指定的 mimeType，使用默认配置。");
        mimeType = ""; // 不传 mimeType，使用浏览器的默认值
    }
    const options = mimeType ? { mimeType } : undefined;
    try {
        // 创建 MediaRecorder
        if (!appData.mediaRecorder || appData.mediaRecorder.state === "inactive") {
            appData.mediaRecorder = new MediaRecorder(appData.videoElement.srcObject, options);
            // 处理录制的数据
            appData.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    appData.recordedChunks.push(event.data);
                }
            };
            // 启动录制
            appData.mediaRecorder.start();
        }
    } catch (error) {
        console.error("无法启动录制:", error);
    }
}



function stopRecording(obj,featurePoints) {
    if (obj.type === FACE_TYPE.LOGIN){
        appData.canvasElement.style.filter = `blur(${obj.blur}px)`;
        appData.wholeProcessState = false;
    }
    getImageReturnUtils(appData,obj,callBackResult,featurePoints)
}


export { start,restart,close }
