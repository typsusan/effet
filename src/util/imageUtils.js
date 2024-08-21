/**
 * 将Base64编码的图片与水印文本结合，返回带水印的图片的Base64编码
 * Combine a Base64 encoded image with watermark text, and return the Base64 encoded image with the watermark
 *
 * @param {string} base64Image - Base64编码的图片
 *                              Base64 encoded image
 * @param {string} watermarkText - 水印文本
 *                                 Watermark text
 * @param {number} [fontSize=48] - 水印文字的字体大小，默认48px
 *                                 Font size of the watermark text, default is 48px
 * @param {string} [fontColor='rgba(255, 255, 255, 0.5)'] - 水印文字的颜色，默认白色半透明
 *                                                          Font color of the watermark text, default is white with 50% opacity
 * @param {number} [padding=10] - 水印与图片边缘的间距，默认10px
 *                                Padding between the watermark and the image edges, default is 10px
 * @return {Promise<string>} - 返回带水印的图片的Base64编码
 *                             Returns a Promise that resolves to the Base64 encoded image with the watermark
 */

export default (base64Image, watermarkText, fontSize = 14, fontColor = 'rgba(255, 255, 255, 0.5)', padding = 10) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64Image;
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            ctx.font = `${fontSize}px serif`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(watermarkText, padding, padding);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            const x = canvas.width - padding;
            const y = canvas.height - padding;
            ctx.fillText(watermarkText, x, y);
            const watermarkedImage = canvas.toDataURL('image/png');
            resolve(watermarkedImage);
        };
        img.onerror = function(err) {
            reject('图片加载失败: ' + err.message);
        };
    });
};

