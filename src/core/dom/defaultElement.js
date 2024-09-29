/**
 * 默认的 DOM 元素创建
 * @param {HTMLElement} el - 父元素
 */
export default (el) => {
    const createElement = (tag, id, styles = {}) => {
        const element = document.createElement(tag);
        element.setAttribute("id", id);
        Object.entries(styles).forEach(([key, value]) => {
            element.style.setProperty(key, value);
        });
        el.appendChild(element);
        return element;
    };

    createElement('video', 'visio-login-video', {
        display: 'none',
        zIndex: 1
    });

    const canvas = createElement('canvas', 'visio-login-canvas');

    // 获取元素的尺寸，如果取不到高宽则设置默认值
    const { width = 300, height = 150 } = el.getBoundingClientRect();

    // 设置画布尺寸
    Object.assign(canvas, { width, height });
    Object.assign(canvas.style, {
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 1
    });
};
