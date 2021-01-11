const { resolve } = require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')
/* 
  
*/
//复用loader
module.exports = {
    entry: 
       './src/js/index.js',
    output: {
        filename: 'js/[name].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        //所有资源引入公共路径前缀 -->
        //'imgs/a.jpg'  当前路径下直接找imgs
        // -->'/imgs/a.jpg' / 以当前服务器地址去补充。去服务器根目录下找imgs
        publicPath:'/',
        chunkFilename:'[name]_chunk.js',//非入口chunk的名称,entry后面的就是chunk，多个就是多chunk，单chunk是单chunk
        library:'[name]',//整个库向外暴露的变量名,结合dll暴露库的时候单独打包才使用
        // libraryTarget:'window',//变量名添加到哪个上 browser
        // libraryTarget:'global',//变量名添加到那个上  node
        libraryTarget:'commonjs',


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
    mode: 'development'
}