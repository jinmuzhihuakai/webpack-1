const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
