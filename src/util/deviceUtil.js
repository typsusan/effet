class DeviceUtil {
    static isMobile() {
        if (typeof wx !== 'undefined' && wx.getSystemInfoSync) {
            return true;
        } else if (typeof my !== 'undefined' && my.getSystemInfoSync) {
            return true;
        } else if (typeof swan !== 'undefined' && swan.getSystemInfoSync) {
            return true;
        } else if (typeof tt !== 'undefined' && tt.getSystemInfoSync) {
            return true;
        } else if (typeof qq !== 'undefined' && qq.getSystemInfoSync) {
            return true;
        } else {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    }
}

export {
    DeviceUtil
}

