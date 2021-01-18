/* 
在package.json 配置node --inspect-brk ./node_modules/webpack/bin/webpack.js
node ---》代表node启动，
inspect---》调试
brk--》首行打debugge
*/
// const Plugin1=require('./plugins/plugin1')
// const Plugin2=require('./plugins/plugin2')
const CopyWebpackPlugin=require('./plugins/CopyWebpackPlugin')
/* 
将某一些文件夹复制到某些文件目录下
*/
module.exports={
    plugins:[
    //  new Plugin1(),
    //  new Plugin2()
    new CopyWebpackPlugin({
        from :'public',
        to:'css',
        ignore:['**/index.html']
    })
    ]
}