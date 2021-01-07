const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { __esModule } = require('./build/built')
module.exports = {
    //webapck入口文件
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        //_dirname node.js的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader配置
    module: {
        rules: [
            //详细loader配置
            {
                //配置哪些文件
                test: /\.css$/,
                use: [
                    //use数组中laoder执行顺序：从右到左，从上到下，依次执行
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                //使用多个loader处理用use:[]
                use: [
                    'style-loader',
                    'css-loader',
                    //将less文件编译成css文件
                    'less-loader'
                ]
            },
            {//默认处理不了html中的img图片
                test: /\.(jpg|png|gif)$/,
                //使用一个loader
                //下载url-loader file-loader，因为uel-loader依赖file-loader
                loader: 'url-loader',//处理css中的图片
                options: {//配置
                    //图片大小小于8kb,就会被base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 28 * 1024,//(因为速度较慢，所以一般选择8kb-12kb的图片进行base64)
                    //问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs解析
                    //解决：关闭uel-loader的es6模块化，使用commonjs解析
                    esModule:false,
                    //给打包后输出文件built.js的图片重新命名,[hash:10]取图片的hash的前十位，[ext]取原来文件拓展名
                    name:'[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                //处理html文件的img图片,从而能被url-loader进行处理
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        //详细plugins的配置

        // 默认创建一个空的html,自动引入打包输出的所有资源（js/css）
        //需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            //复制'./src/index.html'文件，并自动引入打包输出的所有资源，无需自己手动输入
            template: './src/index.html'
        })

    ],
    mode: 'development'
}
