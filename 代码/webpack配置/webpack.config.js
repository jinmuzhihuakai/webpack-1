const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin=require('html-webpack-plugin')
/* 
  tree shaking:去除无用代码
  前提：1。必须使用ES6模块化 2.开启production环境
  作用：减少代码体积
  在package.json中配置
  “sideEffects”:false所有代码都没有副作用（都可以进行tree shaking）
  问题：可能会把css  / @babel/polyfill 文件干掉（副作用）
  解决： “sideEffects”:["*.css","*less"]
*/
process.env.NODE_ENV = 'production'
//复用loader
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'build/index.[contenthash:10].js',
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