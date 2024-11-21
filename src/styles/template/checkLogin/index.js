import { FACE_SIZE } from "@/components/enums/Constant.ts";
import { FaceManager } from "@/components/FaceManager.ts";

const sizeConfigs = {
    [FACE_SIZE.MIN]: { w_h: 200, x_y_r: 100, mainHeight: '300px', mainMinWidth: '210px', fuji_w: '220px', fuji_m_t: '113px', msg_w: '220px', msg_t: '0px', msg_d_t: '68px', msg_d_f: '14px', tips_w: '250px', tips_t: '-150px', tips_f: '18px', show_val: 188 },
    [FACE_SIZE.MID]: { w_h: 250, x_y_r: 125, mainHeight: '350px', mainMinWidth: '300px', fuji_w: '255px', fuji_m_t: '64px', msg_w: '230px', msg_t: '5px', msg_d_t: '65px', msg_d_f: '18px', tips_w: '250px', tips_t: '-170px', tips_f: '22px', show_val: 235 },
    [FACE_SIZE.MAX]: { w_h: 300, x_y_r: 155, mainHeight: '480px', mainMinWidth: '320px', fuji_w: '290px', fuji_m_t: '15px', msg_w: '280px', msg_t: '25px', msg_d_t: '50px', msg_d_f: '28px', tips_w: '350px', tips_t: '-220px', tips_f: '30px', show_val: 285 }
};

export default (obj) => {
    if (!obj?.appearance) return;

    const config = sizeConfigs[obj.size];
    const parent = obj.parentElement;
    const faceManager = FaceManager.getInstance();

    parent.style.position = 'relative';

    if (!parent.querySelector('.face-effet-check-login-model-msg-faceRule-show')) {
        parent.innerHTML = generateHTML(config);
        faceManager.faceComponents.push(parent);
    }

    const canvas = document.getElementById('visio-login-canvas');
    const checkInterval = setInterval(() => {
        if (canvas) {
            clearInterval(checkInterval);
            initializeCanvas(canvas, parent.querySelector('.face-effet-check-login-model-msg-fuji-faceRule'));
        }
    }, 50);
};

function generateHTML(config) {
    return `
        <div class="face-effet-check-login-model-msg-faceRule-show" style="width: ${config.show_val}px; height: ${config.show_val}px;">
            <video id="visio-login-video" style="display: none; z-index: 1;" width="${config.show_val}" height="${config.show_val}"></video>
            <canvas id="visio-login-canvas" style="z-index: 1;" width="${config.show_val}" height="${config.show_val}"></canvas>
        </div>
        <div class="face-effet-check-login-model-msg-faceRule-loader">
            <div class="face-effet-check-login-model-msg-faceRule-tips" style="width: ${config.tips_w}; top: ${config.tips_t}; font-size: ${config.tips_f};"></div>
            <div class="face-effet-check-login-model-msg-fuji-faceRule" style="display: none; width: ${config.fuji_w}; margin-top: ${config.fuji_m_t};">
                <div class="face-effet-check-login-model-msg-faceRule" style="width: ${config.msg_w}; top: ${config.msg_t};">
                    <div class="face-effet-check-login-model-msg-faceRule-content" style="margin-top: ${config.msg_d_t}; font-size: ${config.msg_d_f}; text-align: center;"></div>
                </div>
            </div>
            <figure class="face-effet-check-login-model-msg-faceRule-iconLoaderProgress">
                ${generateSVG(config)}
            </figure>
        </div>
    `;
}

function generateSVG(config) {
    return `
        <svg class="face-effet-check-login-model-msg-faceRule-iconLoaderProgressFirst" width="${config.w_h}" height="${config.w_h}">
            <circle cx="${config.x_y_r}" cy="${config.x_y_r}" r="${config.x_y_r}"></circle>
        </svg>
        <svg class="face-effet-check-login-model-msg-faceRule-iconLoaderProgressSecond" width="${config.w_h}" height="${config.w_h}">
            <circle cx="${config.x_y_r}" cy="${config.x_y_r}" r="${config.x_y_r}"></circle>
        </svg>
    `;
}

function initializeCanvas(canvas, fujiFaceRule) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setInterval(() => {
        const hasContent = ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0);
        fujiFaceRule.style.display = hasContent ? 'block' : 'none';
    }, 1000);
}
