const { resolve } = require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')

module.exports = {
    // entry: './src/js/index.js', //单入口
    entry:   {
        main:'./src/js/index.js',
        test:'./src/js/test.js'
    },
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
  
    plugins: [
        new HtmlWebPackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        })
    ],

    /* 
    可以将node_modules中代码单独打包一个chunk输出
    自动分析多入口chunk中，有没有公共的文件。如果会有打包成单独一个chunk
    */
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
    mode: 'production'
}