class NotificationManager {
    constructor() {
        this.notifications = [];
        this.marginBetween = 10; // 通知之间的间距
    }

    show(notificationHtml, time) {
        const notificationContainer = document.createElement('div');
        notificationContainer.innerHTML = notificationHtml;

        // 获取实际的通知卡片元素
        const notificationElement = notificationContainer.firstElementChild;

        // 获取当前已有通知的数量
        const notificationCount = this.notifications.length;

        // 计算通知的 margin-top
        const marginTop = notificationCount * 120;

        // 设置通知的 margin-top
        notificationElement.style.marginTop = `${marginTop}px`;

        const loaderElement = notificationElement.querySelector('.face-effet-notification-loader');
        if (loaderElement) {
            const adjustedTime = (time ? time + 300 : 2000) / 1000; // 时间以毫秒为单位，需要转换为秒
            loaderElement.style.animationDuration = `${adjustedTime}s`;
        }

        // 添加通知到页面和管理列表
        document.body.appendChild(notificationElement);
        this.notifications.push(notificationElement);

        // 显示指定时间后开始消失
        setTimeout(() => {
            this.fadeOut(notificationElement);
        }, time || 2000); // 默认2秒
    }

    fadeOut(notification) {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = 0;

        // 等待动画结束后移除通知并从管理列表中移除
        setTimeout(() => {
            notification.remove();
            this.notifications = this.notifications.filter(notif => notif !== notification);

            // 重新调整剩下通知的位置
            this.adjustPositions();
        }, 500);
    }

    adjustPositions() {
        this.notifications.forEach((notif, index) => {
            const newMarginTop = index * 120;
            notif.style.marginTop = `${newMarginTop}px`;
        });
    }

    createNotificationHtml(type, title, content, defaultTitle, base64) {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes()}分`;
        let img = base64 != null ? "background-image: url('"+base64+"')" : "";
        return `
            <div class="face-effet-notification-card face-effet-notification-${type}">
                <div class="face-effet-notification-loader"></div>
                <div class="face-effet-notification-img" style="${img}"></div>
                <div class="face-effet-notification-textBox">
                    <div class="face-effet-notification-textContent">
                        <p class="face-effet-notification-h1">${title || defaultTitle}</p>
                        <span class="face-effet-notification-span">${time}</span>
                    </div>
                    <div class="face-effet-notification-body">
                       ${content}
                    </div>
                </div>
            </div>
        `;
    }

    success(message) {
        let defaultTitle = 'Success Message';
        const { title, content, time, base64 } = typeof message === 'string'
            ? { title: defaultTitle, content: message, time: null, base64: null }
            : message;

        const notificationHtml = this.createNotificationHtml('success', title, content, defaultTitle, base64);
        this.show(notificationHtml, time);
    }

    info(message) {
        let defaultTitle = 'Info Message';
        const { title, content, time, base64 } = typeof message === 'string'
            ? { title: defaultTitle, content: message, time: null, base64: null }
            : message;

        const notificationHtml = this.createNotificationHtml('info', title, content, defaultTitle, base64);
        this.show(notificationHtml, time);
    }

    warning(message) {
        let defaultTitle = 'Warning Message';
        const { title, content, time, base64 } = typeof message === 'string'
            ? { title: defaultTitle, content: message, time: null, base64: null }
            : message;

        const notificationHtml = this.createNotificationHtml('warning', title, content, defaultTitle, base64);
        this.show(notificationHtml, time);
    }

    error(message) {
        let defaultTitle = 'Error Message';
        const { title, content, time, base64 } = typeof message === 'string'
            ? { title: defaultTitle, content: message, time: null, base64: null }
            : message;

        const notificationHtml = this.createNotificationHtml('error', title, content, defaultTitle, base64);
        this.show(notificationHtml, time);
    }
}

const $inform = new NotificationManager();

export {
    $inform
};
