import rng from 'uuid/dist/rng-browser';
// 获取 设备系统 与 应用的端
const slice = [].slice;
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


export function merge (dst) {
    return baseExtend(dst, slice.call(arguments, 1), true)
}
  

export function baseExtend (dst, objs, deep) {
    for (let i = 0, ii = objs.length; i < ii; ++i) {
      const obj = objs[i]
      if (!isObject(obj) && !isFunction(obj)) continue
      const keys = Object.keys(obj)
      for (let j = 0, jj = keys.length; j < jj; j++) {
        const key = keys[j]
        const src = obj[key]
  
        if (deep && isObject(src)) {
          if (!isObject(dst[key])) dst[key] = Array.isArray(src) ? [] : {}
          baseExtend(dst[key], [src], false) // only one level of deep merge
        } else {
          dst[key] = src
        }
      }
    }
  
    return dst
  }
  

export const isObject = value => value !== null && typeof value === 'object';
  
export const isFunction = value => typeof value === 'function';


export  const generateRandomId = (length) => {
    const id = bytesToHex(rng())
    return id.substr(0, length)
}
const bytesToHex = (buf, offset) => {
    let i = offset || 0
    let bth = byteToHex
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return [
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]]
    ].join('')
}

const byteToHex = (() => {
    const hexs = [];
    for (let i = 0; i < 256; ++i) {
        hexs.push((i + 0x100).toString(16).substr(1));
    }
    return hexs;
})()