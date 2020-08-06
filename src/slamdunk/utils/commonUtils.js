// 获取 设备系统 与 应用的端
export const getOSInfo = () => {
    const info = {
        platform: '',
        device: ''
    }
    const ua = navigator.userAgent
    const uaMatch = {
        android: ua.match(/(Android)\s+([\d.]+)/),
        ipad: ua.match(/(iPad).*OS\s([\d_]+)/),
        iphone: ua.match(/(iPhone\sOS)\s([\d_]+)/),
        mobile: ua.match(/(Mobile)\s([\d_]+)/),
        windows: ua.match(/(Windows)\s([\d_]+)/),
        phone: ua.match(/(Phone)\s([\d_]+)/),
        tablet: ua.match(/(Tablet)\s([\d_]+)/),
        mac: ua.match(/Macintosh/)
    }
    if (uaMatch.android) {
        info.platform = 'android'
        if (uaMatch.mobile) {
            info.device = 'mobile'
        } else {
            info.device = 'tablet'
        }
    } else if (uaMatch.ipad) {
        info.platform = 'ios'
        info.device = 'ipad'
    } else if (uaMatch.iphone) {
        info.platform = 'ios'
        info.device = 'iphone'
    } else if (uaMatch.windows) {
        info.platform = 'windows'
        if (uaMatch.phone) {
            info.device = 'mobile'
        } else if (uaMatch.tablet) {
            info.device = 'tablet'
        } else {
            info.device = 'pc'
        }
    } else if (uaMatch.mac) {
        info.platform = 'mac'
        info.device = 'pc'
    } else {
        info.platform = 'windows'
        info.device = 'pc'
    }
    return info
}
export const generateEvent = (event = {
    type: '',
}) => {
    event.timestamp = Date.now();
    event.start = window.performance.now();
    return event;
}

export const getPageMetadata = () =>({
    page: {
      referer: document && document.referrer || '',
      url: window && window.location.href || '',
    }
  }) 
  