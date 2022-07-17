// 工具函数

// 把要传入的数据序列化成urlencoded格式的字符串
// 就是当用户需要传入数据的时候，给的数据是一个对象，需要把这个对象转化成“username=jiaer&age=21”这样的形式。
const serialize = param =>{
    const results = [];
    // entries()返回一个遍历器对象，可以使用for...of循环遍历。entries()是对键值对的遍历
    for (const [key,value] of Object.entries(param)){
        // 让result里面的数组变成这样的形式['username=jiaer','age=21']
        results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    // 让数组中的数据用&连接起来，并且返回去
    return results.join('&')
}

// 给url添加参数
const addURLData = (url,data)=>{
    if(!data) return '';                        // 如果没有需要传入的数据，那么久不需要更改，直接返回
    // 有需要的传入的数据，那么就需要判断原先是否有存在数据，如果有则需要加&，如果没有则需要加？
    const mark = url.includes('?')?'&':'?';
    return `${mark}${data}`;

}

// 将数据序列化成JSON格式的字符串
const serializeJSON = param =>{
    return JSON.stringify(param)
}


// 把这些方法暴露出去
export {serialize, addURLData, serializeJSON};