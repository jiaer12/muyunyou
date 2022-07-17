import { SUCC_CODE, TIMEOUT } from './config';
import { getJSON } from './ajax';

// 获取数据
const getData = (url,options)=>{
    return getJSON(url,{
        timeoutTime:TIMEOUT,                  // 设置一个超时时间
        ...options                          // 添加用户传入的数据
    })
    .then(response=>{
        if(response.code!==SUCC_CODE) throw new Error(`ERROR:${response.code}`)           // 判断code是否合法
        return response.data;                                                       // 返回data数据
    })
    .catch(err=>{
        console.log(err);
    })
}

export {getData}