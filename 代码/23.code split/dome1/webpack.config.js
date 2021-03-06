const { resolve } = require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')

module.exports = {
    //entry: './src/js/index.js', 单入口
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
    mode: 'production'
}