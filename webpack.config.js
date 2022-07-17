const path = require('path')                               // 请求当前的路径
const HtmlWebpackPlugin = require('html-webpack-plugin');   // 打包html文件
// const { extension } = require('art-template');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    // 配置webpack
    mode: 'development',                                     // 让webpack打包后不压缩，方便调试
    entry: {
        index: './src/pages/index/index.js'
    },
    output: {
        path: resolve('dist'),                               // 出口，指明webpack打包好的文件的输出路径
        filename: 'js/[name].js'
    },

    devtool: 'cheap-module-eval-source-map',                 // source-map,调试用的，出错的时候，直接定位到原始代码，而不是转换后的代码
    resolve: {                                               // 自动补全的扩展名
    extensions: ['.js'],
    alias: {                                                 // 路径别名
        api: resolve('src/api'),
        fonts: resolve('src/assets/fonts'),
        images: resolve('src/assets/images'),
        style: resolve('src/assets/styles'),
        components: resolve('src/components'),
        pages:resolve('src/pages')
    }
},

// 配置loader
module: {
    rules: [
        // css
        {
            test: /\.css$/,
            use:['style-loader','css-loader']
        },
        // 模板文件
        {
            test:/\.art$/,
            loader:'art-template-loader'
        },
        // 图片
        {
            test:/\.(png|jpe?g|gif|svg)$/,
            loader:'url-loader',
            options:{
                // 小于10k的图片转成base64编码的dataURL字符串写到代码中
                limit:10000,
                // 其他图片转到
                name:'images/[name].[ext]',
                esModule:false
            }
        },
        // 字体文件
        {
            test:/\.(woff2?|eot|ttf|otf)$/,
            loader:'url-loader',
            options:{
                limit:10000,
                name:'fonts/[name].[ext]'
            }
        }
    ]
},

// 配置插件的节点
plugins: [
    // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
    new HtmlWebpackPlugin({                 // 创建一个在内存中生成的html插件
        filename: 'index.html',               // 指定html的名字
        template: './src/pages/index/index.art',            // 指定模板html，将来会根据这个html，去生成新的html
    })
]
}