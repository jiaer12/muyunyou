// 在这里设置默认参数
const DEFAULTS = {
    method:'GET',       // 请求的类型

    params:null,        // 请求头携带的数据
    // 如果需要默认传参数的话就这样写
    // params:{
    //     username:'jiaer',
    //     age:21
    // }

    data:null,          // 请求体携带数据
    // 如果需要默认传参数的话就这样写
    // data:{
    //     username:'jiaer',
    //     age:21
    // }
    // data: FormData数据           // 也可以传FormData数据

    contentType: 'application/x-www-form-urlencoded',        // 告诉服务器发送的数据是什么类型的
    responseType:'',                // 默认为文本，因此传入''就可以了
    timeoutTime:0,                  // 设置加载超时时间，默认设置为0，没有超时时间
    withCredentials:false,          // 设置不携带cookie

    // 封装方法
    // 请求成功的方法
    success(){
        console.log(1);
    },

    // 状态码异常的处理方法
    httpCodeError(){},

    // 请求失败的方法
    error(){
        console.log(2);
    },

    // 请求终止的时候的方法
    abort(){},

    // 请求超时的时候的方法
    timeout(){},


}
export default DEFAULTS;