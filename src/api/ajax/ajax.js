// 导入编写好的默认参数
import DEFAULTS from './default.js';
// 导入工具函数
import {serialize, addURLData, serializeJSON} from './utils.js';

// 首先声明一个Ajax类
class Ajax {
    constructor(url, options) {
        this.url = url
        this.options = Object.assign({}, DEFAULTS, options);      // assign合并后面两个到{}中
        // 初始化
        this.init()
    };

    // 初始化函数
    init() {
        const xhr = new XMLHttpRequest();                         // 创建对象
        this.xhr = xhr;                                           // 希望在其他地方也用到xhr，就需要备份
        this.bindEvents();                                        // 调用绑定事件响应处理程序
        xhr.open(this.options.method,this.url+this.addParam(),true);    // 因为可能会需要请求头携带数据，因此写一个addParam方法进去
        
        xhr.responseType = this.options.responseType;             // 设置responseType
        xhr.withCredentials = this.options.withCredentials;       // 设置跨域是否携带cookie
        const {timeoutTime} = this.options;                       // 设置过期时间
        if (timeoutTime>0){
            xhr.timeout = timeoutTime;
        }
        this.sendData()                                           // 封装一个方法来发送请求

    }


    // 在地址上添加数据
    addParam(){
        const {params} = this.options;                            // 解构赋值拿到option里面的params
        // 判断拿到的数据，如果无数据就直接返回，如果有则需要处理成字符串的形式
        if (!params) return '';
        return addURLData(this.url,serialize(params));
    }

    // 发送请求
    sendData(){
        const xhr = this.xhr;
        if(!this.isSendData()){
            return xhr.send(null);
        }
        let resultData = null;
        const {data} = this.options;
        // 是否发送FormData数据
        if (this.options.data instanceof FormData){
            resultData = data;
        // 是否发送application/x-www-form-urlencoded格式的数据
        }else if (this.options.contentType.toLowerCase().includes('application/x-www-form-urlencoded')){
            this.setContentType('application/x-www-form-urlencoded');
            resultData = serialize(data);
        // 是否发送application/json格式的数据
        }else if (this.options.contentType.toLowerCase().includes('application/json')){
            this.setContentType('application/json');
            resultData = serializeJSON(data);
        // 发送其他格式的数据
        }else {
            this.setContentType();
            resultData = data;
        }
        xhr.send(resultData)
    }

    // 判断是否需要使用send发送数据
    isSendData() {
        const {data,method} = this.options;
        if(!data) return false;                                    // 如果没有数据，则返回false
        if(method.toLowerCase() ==='GET'.toLowerCase()) return false;   // 如果是get方法，则也不需要传输数据
        return true;
    }

    // 设置Content-Type
    setContentType(contentType=this.options.contentType){
        if(!contentType) return;
        this.xhr.setRequestHeader('Content-Type',contentType);
    }

    // 绑定事件响应处理程序
    bindEvents() {

        const xhr = this.xhr;

        const { success, httpCodeError, error, abort, timeout } = this.options  // 解构赋值，获取options中的方法，备用

        // 绑定load事件 （响应数据可用的情况下触发，即状态变为4的时候）
        xhr.addEventListener('load', () => {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                // 表示请求成功，使用options中的success方法
                success(xhr.response, xhr);                        // 把响应的结果传过去，顺便把xhr也传过去，万一可以用到。

            } else {
                // 状态码异常，使用options中的httpCodeErroe方法
                httpCodeError(xhr.status, xhr);                    // 把状态码传过去，还有xhr
            }
        }, false);

        // 绑定error事件 （请求发生错误的时候）
        xhr.addEventListener('error', () => {
            // 表示请求失败的方法，使用options中的error方法
            error(xhr);
        }, false)

        // 绑定abort事件 （请求终止的时候）
        xhr.addEventListener('abort',()=>{
            // 表示请求终止，使用options中的abort方法
            abort(xhr);
        },false);

        // 绑定timeout事件 （请求超时的时候）
        xhr.addEventListener('timeout',()=>{
            // 表示超时，使用options中的timeout方法
            timeout(xhr);
        },false);

    }

    // 获取XHR对象
    getXHR(){
        return this.xhr;
    }


}

export default Ajax;


