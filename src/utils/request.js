import {
    request
} from 'axios';
export const requestGet = (url, query = {}, final = () => {}) => new Promise((reslove, reject) => {
    request(`${url}?${Object.keys(query).reduce( (pre,cur) => `${pre}&${cur}=${query[cur]}`, '').substring(1)}`, {
            method: 'get',
            credentials: 'include',
        })
        .then(res => {
            reslove(res.data);
        })
        .catch(err => {
            reject(err)
        })
        .finally(() => {
            if (final) {
                final();
            }
        });
})

export const requestPost = (url, params = {}, final = () => {}) => new Promise((reslove, reject) => {
    request(url, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            reslove(res.data);
        })
        .catch(err => {
            reject(err);
        })
        .finally(() => {
            if (final) {
                final()
            }
        });
})

export const requestPut = (url, query = {}, params = {}, final = () => {}) => new Promise((reslove, reject) => {
    request(`${url}?${Object.keys(query).reduce( (pre,cur) => `${pre}&${cur}=${query[cur]}`, '').substring(1)}`, {
            method: 'put',
            credentials: 'include',
            body: params,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            reslove(res.data);
        })
        .catch(err => {
            reject(err)
        })
        .finally(() => {
            if (final) {
                final();
            }
        });
})

export const requestDelete = (url, query = {}, final = () => {}) => new Promise((reslove, reject) => {
    request(`${url}?${Object.keys(query).reduce( (pre,cur) => `${pre}&${cur}=${query[cur]}`, '').substring(1)}`, {
            method: 'delete',
            credentials: 'include',
        })
        .then(res => {
            reslove(res.data);
        })
        .catch(err => {
            reject(err)
        })
        .finally(() => {
            if (final) {
                final();
            }
        });
})