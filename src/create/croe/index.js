import faceBase64 from "../../util/faceBase64.js";
import { FaceMesh } from '../../util/faceMesh.js';
import { Camera } from '../../util/cameraUtils.js'
import appObject from "../default/appObject";
import faceAction from "../action/faceAction";
import imageUtils from "../../util/imageUtils";
import { generateKey } from "../../util/getKey";
import {FACE_TYPE} from "../../enum";
import getImageReturnUtils from "../../util/getImageReturnUtils";
import faceBefore from "../before/faceBefore";

var appData = {
    mediaRecorder: null,
    recordedChunks: [],
    predictionState: false,
    currentImages: [],
    videoElement: null,
    canvasElement: null,
    canvasCtx: null,
    mouthOpen: false,
    blinked: false,
    blinkDetected: false, // 是否检测到眨眼
    mouthDetected: false, // 是否检测到张嘴
    lastNoseX: null,  // 上一帧鼻尖的X坐标
    noseXChanges: [],  // 记录鼻尖X坐标的变化
    wholeProcessState:false,
    currentText:'',
};

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
    appData.wholeProcessState = true
    appData.videoElement = document.querySelector('#visio-login-video');
    appData.canvasElement = document.querySelector('#visio-login-canvas');
    appData.canvasElement.style.filter = `blur(${0}px)`
    appData.canvasCtx = appData.canvasElement.getContext('2d');
    callBackResult(obj,'开始绘制',1)
    initVideoAndCanvas(obj);
}

function restart(obj){
    if (obj){
        startObj = obj
    }
    appData = appObject
    if (!startObj){
        throw new Error("Please complete the call to 'init' before invoking the restart task");
    }
    start(startObj)
}

async function initVideoAndCanvas(obj) {
    try {
        appData.videoElement.srcObject = await navigator.mediaDevices.getUserMedia({video: true});
        appData.videoElement.onloadedmetadata = () => {
            appData.videoElement.play();
            callBackResult(obj,'视频流已获取并播放',2)
            startFaceMesh(obj);
        };
    } catch (error) {
        callBackResult(obj,'初始化失败',-1)
        console.error("初始化失败:", error);
    }
}

async function startFaceMesh(obj) {
    callBackResult(obj,'人脸开始检测',3)
    const faceMesh = new FaceMesh({
        locateFile: file => {
            return `./${file}`;
        },
    });
    faceMesh.setOptions(obj.face);
    currentObj = obj
    faceBefore(appData,currentObj,callBackResult,stopRecording,startRecording)
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

function callBackResult(obj, message,step, base64Array = [], video = null,key = '') {
    if (!obj || typeof obj.callBack !== 'function') {
        console.error('Invalid callback object or function:', obj);
        return;
    }
    if (appData.currentText ===  message){
        return;
    }
    appData.currentText = message
    callBackObj = {
        videoElement: appData.videoElement,
        canvasElement: appData.canvasElement,
        progress_message: message,
        step:step,
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
        if (appData.mediaRecorder && appData.mediaRecorder.state !== "inactive") {
            return new Promise((resolve) => {
                appData.mediaRecorder.stop();
                appData.mediaRecorder.onstop = async () => {
                    const blob = new Blob(appData.recordedChunks, { type: "video/mp4" });
                    const key = generateKey();
                    const images = await captureFramesFromVideoBlob(blob, obj.dataRange);
                    const resultsImages = await Promise.all(
                        images.map(image => imageUtils(image, key))
                    );
                    appData.currentImages = resultsImages;
                    callBackResult(obj, 'success', 10, resultsImages, faceBase64(blob), key);
                    appData.wholeProcessState = false;
                    resolve(resultsImages); // 当异步操作完成时，Promise 得到解决
                };
            });
        } else {
            // 如果没有进行录制，直接返回一个立即解决的 Promise
            return Promise.resolve([]);
        }
    }else if (obj.type === FACE_TYPE.CLOCK_IN || obj.type === FACE_TYPE.SLEEP){
        getImageReturnUtils(appData,obj,callBackResult)
    }

}


async function captureFramesFromVideoBlob(blob, times) {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const images = [];
    video.src = URL.createObjectURL(blob);
    await new Promise(resolve => video.addEventListener('loadeddata', resolve, { once: true }));
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    for (let time of times) {
        await new Promise(resolve => {
            video.currentTime = time;
            video.addEventListener('seeked', () => {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                let imageData = canvas.toDataURL('image/jpeg');
                images.push(imageData);
                resolve();
            }, { once: true });
        });
    }
    return images;
}


export { start,restart }
