import axios from 'axios';
import store from '../store/index';
import qs from 'qs';
// let loadingInstance = null;

const instance = axios.create({
    timeout: 15 * 1000, // 15 秒超时
    baseURL: process.env.VUE_APP_ADMIN_API_HOST, // 设置域名
    // withCredentials: true, // 携带 cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// 设置 post 请求头

// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.request.use(config => {
    store.commit('global/putLoadingState', true);
    return config;
}, error => Promise.reject(error));

instance.interceptors.response.use(response => {
    store.commit('global/putLoadingState', false);
    try {
        const {
            data
        } = response || {};
        return Promise.resolve(data);
    } catch (ex) {
        store.commit('global/putMessage', ex);
        return Promise.resolve('');
    }
});

const request = function (url, params, config, method) {
    return new Promise((resolve, reject) => {
        instance[method](url, qs.stringify(params), Object.assign({}, config)).then(response => {
            resolve(response)
        }, err => {
            if (err.Cancel) {
                window.alert(err);
            } else {
                reject(err)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

const post = (url, params = {}, config = {}) => {
    return request(url, params, config, 'post')
}

const get = (url, query = {}, params, config = {}) => {
    const _url = `${url}?${parseQuery(query)}`
    return request(_url, params, config, 'get')
}

const put = (url, query = {}, params, config = {}) => {
    const _url = `${url}?${parseQuery(query)}`
    return request(_url, params, config, 'put')
}

const del = (url, query = {}, config = {}) => {
    const _url = `${url}?${parseQuery(query)}`
    return request(_url, {}, config, 'put')
}

const parseQuery = (query = {}) => {
    return Object.keys(query).reduce((pre, cur) => {
        if ((typeof (query[cur]) === 'object') && !query[cur].length) {
            return pre;
        }
        const temp = (query[cur] && query[cur].length && typeof (query[cur]) === 'object') ? query[cur].map(qr => `${cur}=${qr}`).join('&') : `${cur}=${query[cur]}`
        return `${pre}&${temp}`;
    }, '').substring(1)
}

export {
    post,
    get,
    put,
    del
}