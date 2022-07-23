import Ajax from './ajax.js'
const ajax = (url, options) => {
    // return new Ajax(url,options).getXHR();
    let xhr;
    const p = new Promise((resolve, reject) => {
        xhr = new Ajax(url, {
            ...options, ...{
                success(response) {
                    resolve(response);
                },
                httpCodeError(status) {
                    reject({
                        type: 1,                     // 设置类型1为状态码异常
                        text: `HTTP状态码异常:${status}`    // 给出提示文本
                    });
                },
                error() {
                    reject({
                        type: 2,                     // 设置类型2为请求失败
                        text: `请求失败`
                    });
                },
                abort() {
                    reject({
                        type: 3,                     // 设置类型3为请求终止
                        text: `请求终止`
                    });
                },
                timeout() {
                    reject({
                        type: 4,                     // 设置类型4为请求超时
                        text: `请求超时`
                    });
                },
            }
        }).getXHR();
    });
    p.xhr = xhr;
    return p;
};

// 封装的一些其他方法
const get = (url, options) => {
    return ajax(url, { ...options, methed: 'GET' });
};

const getJSON = (url, options) => {
    return ajax(url, { ...options, method:'GET',responseType: 'json' });
};

const post = (url, options) => {
    return ajax(url, { ...options, methed: 'POST' });
};




export { ajax, get, getJSON, post }