import axios from 'axios';
import store from './../store/index';
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

export const get = (url, query = {}, config = {}) => new Promise((res, rej) => {
    instance({
            method: 'get',
            url,
            params: query,
            ...config
        }).then(result => res(result))
        .catch(err => rej(err));
})