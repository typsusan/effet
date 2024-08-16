import faceBase64 from "../../util/faceBase64.js";
import { FaceMesh } from '../../util/faceMesh.js';
import { Camera } from '../../util/cameraUtils.js'
import appObject from "../default/appObject";
import faceColor from "../../color/faceColor";
import distance from "../../util/distance";

var appData = {
    mediaRecorder: null,
    recordedChunks: [],
    predictionState: false,
    currentImages: [],
    videoElement: null,
    canvasElement: null,
    divElement:null,
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
    appData.divElement = document.querySelector('#visio-login-div');
    appData.divElement.removeAttribute('class')
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
            return `/src/resources/${file}`;
        },
    });
    callBackResult(obj,'请眨眨眼',4)
    if (obj.face){
        faceMesh.setOptions(obj.face);
    }else {
        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
    }
    currentObj = obj
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

    appData.canvasCtx.save();
    appData.canvasCtx.clearRect(0, 0, appData.canvasElement.width, appData.canvasElement.height);
    appData.canvasCtx.drawImage(results.image, 0, 0, appData.canvasElement.width, appData.canvasElement.height);
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        if (!appData.predictionState) {
            appData.predictionState = true;
            startRecording();  // 当人脸重新被检测到时，重新开始录制
        }
        appData.divElement.removeAttribute('class')
        faceColor(appData.canvasCtx, landmarks, currentObj);

        // 获取面部关键点
        const upperLipBottom = landmarks[13];
        const lowerLipTop = landmarks[14];
        const leftEyeTop = landmarks[159];
        const leftEyeBottom = landmarks[145];
        const rightEyeTop = landmarks[386];
        const rightEyeBottom = landmarks[374];
        const noseTip = landmarks[1]; // 鼻尖的标记点

        // 计算动作状态
        const mouthOpen = distance(upperLipBottom, lowerLipTop) > 0.05;
        const leftEyeOpen = distance(leftEyeTop, leftEyeBottom) > 0.011;
        const rightEyeOpen = distance(rightEyeTop, rightEyeBottom) > 0.011;
        const blinked = !(leftEyeOpen && rightEyeOpen);

        let headShaken = false;
        if (appData.lastNoseX !== null) {
            let dx = Math.abs(noseTip.x - appData.lastNoseX);
            appData.noseXChanges.push(dx);

            if (appData.noseXChanges.length > 10) {
                appData.noseXChanges.shift();
                const maxChange = Math.max(...appData.noseXChanges);
                if (maxChange > 0.01) {
                    headShaken = true;
                }
            }
        }
        appData.lastNoseX = noseTip.x;

        // 依次检测动作
        if (!appData.blinkDetected) {
            if (blinked) {
                appData.blinkDetected = true;
                callBackResult(currentObj, '眨眼检测通过',5);
            }
        } else if (!appData.mouthDetected) {
            callBackResult(currentObj, '请张张嘴',6);
            if (mouthOpen) {
                appData.mouthDetected = true;
                callBackResult(currentObj, '张嘴检测通过',7);
            }
        } else if (!appData.headShakeDetected) {
            callBackResult(currentObj, '请左右摇头',8);
            if (headShaken) {
                appData.headShakeDetected = true;
                callBackResult(currentObj, '摇头检测通过',9);
                stopRecording(currentObj);
            }
        }
    } else {
        callBackResult(currentObj, '未检测到人脸...',-2);
        appData.divElement.setAttribute('class','visio-login-glass-effect')
        appData.predictionState = false;
        appData.lastNoseX = null;
        appData.noseXChanges = [];
        if (appData.mediaRecorder && appData.mediaRecorder.state !== "inactive") {
            appData.mediaRecorder.stop();
            appData.mediaRecorder = null;
        }

    }
    appData.canvasCtx.restore();
}

function callBackResult(obj, message,step, base64Array = [], video = null) {
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
        video: video
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
    console.log(obj)
    console.log(appData.mediaRecorder)
    if (appData.mediaRecorder && appData.mediaRecorder.state !== "inactive") {
        appData.mediaRecorder.stop();
        appData.mediaRecorder.onstop = async () => {
            const blob = new Blob(appData.recordedChunks, {
                type: "video/mp4"
            });
            appData.divElement.setAttribute('class','visio-login-glass-effect')
            console.log(appData.divElement)
            const images = await captureFramesFromVideoBlob(blob, obj.dataRange);
            appData.currentImages = images;
            callBackResult(obj,'success',10,images,faceBase64(blob))
            appData.wholeProcessState = false
        };
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
