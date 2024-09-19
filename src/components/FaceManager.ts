import {DeviceUtil} from "@/util/deviceUtil";
export class FaceManager {
    private static instance: FaceManager;
    public faceComponents: any[] = [];
    public prefix : string = DeviceUtil.isMobile() ? "拿起手机" : "请正对屏幕";
    private constructor() {
    }
    public static getInstance(): FaceManager {
        if (!FaceManager.instance) {
            FaceManager.instance = new FaceManager();
        }
        return FaceManager.instance;
    }
    public updateMessage(index: number, message: string) {
        if (this.faceComponents[index]) {
            const msgElement = this.faceComponents[index].querySelector('.face-effet-check-login-model-msg-faceRule-content');
            let tips = this.faceComponents[index].querySelector('.face-effet-check-login-model-msg-faceRule-tips');
            if (tips) {
                tips.textContent = this.prefix + "," + message;
            }
            if (msgElement) {
                msgElement.textContent = message;
            }
        }
    }
}
