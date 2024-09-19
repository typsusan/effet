export default class AppState {
    mediaRecorder: MediaRecorder | null;
    recordedChunks: Blob[];
    predictionState: boolean;
    currentImages: ImageData[];
    videoElement: HTMLVideoElement | null;
    canvasElement: HTMLCanvasElement | null;
    canvasCtx: CanvasRenderingContext2D | null;
    mouthOpen: boolean;
    blinked: boolean;
    blinkDetected: boolean;
    mouthDetected: boolean;
    lastNoseX: number | null;
    noseXChanges: number[];
    parentElement: HTMLElement | null;

    constructor() {
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.predictionState = false;
        this.currentImages = [];
        this.videoElement = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.mouthOpen = false;
        this.blinked = false;
        this.blinkDetected = false;
        this.mouthDetected = false;
        this.lastNoseX = null;
        this.noseXChanges = [];
        this.parentElement = null;
    }
}
