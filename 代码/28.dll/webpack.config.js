/* 
loader:1.下载 2.使用（配置loader）
plugiins:1.下载 2.引入3.使用
add-asset-html-webpack-plugin -D
*/
const {resolve} =require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const AddAssetHtmlWebpackPlugin=require('add-asset-html-webpack-plugin')
module.exports={
    //webapck入口文件
    entry:'./src/index.js',
    // 输出
    output:{
        // 输出文件名
        filename:'built.js',
        // 输出路径
        //_dirname node.js的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    plugins:[
        //详细plugins的配置

        // 默认创建一个空的html,自动引入打包输出的所有资源（js/css）
        //需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            //复制'./src/index.html'文件，并自动引入打包输出的所有资源，无需自己手动输入
            template:'./src/index.html'
        }),
       //告诉webpack哪些库不参与打包，同时使用的名称也得变
         new webpack.DllReferencePlugin({
          manifest:resolve(__dirname,'dll/manifest.json')
         }),
         //将某个文件打包输出去，并在html中自动引入该文件
         new AddAssetHtmlWebpackPlugin({
               filepath:resolve(__dirname,'dll/jquery.js')
         })
    ],
    mode:'production'
}
