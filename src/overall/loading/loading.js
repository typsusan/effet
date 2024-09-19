// 创建一个上下文，包含./目录下所有子目录中的index.js
const context = require.context('./', true, /.*\/[^/]+\.js$/);

class LoadingManager {
    constructor(obj) {
        this.loadingElement = null;
        this.loadingType = obj.loading;
    }

    createLoadingElement() {
        const module = context(`./${this.loadingType}/index.js`);
        const loadingHTML = module.loadingHtml;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = loadingHTML;
        return wrapper.firstElementChild;
    }

    showLoading(element) {
        if (!this.loadingType) {
            return;
        }

        if (!this.loadingElement) {
            this.loadingElement = this.createLoadingElement();
            element.appendChild(this.loadingElement);
        } else {
            this.loadingElement.style.display = 'block';
        }
    }

    hideLoading() {
        if (!this.loadingType) {
            return;
        }
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
    }
}

// 导出类
export default LoadingManager;
