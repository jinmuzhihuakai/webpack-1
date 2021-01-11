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
    
    },
    module:{
        rules:[
            //loader的配置
            {
                test:/\.css$/,
                //多个loader用use
                use:['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                //排除node_modules下的文件
                exclude:/node_modules/,
                //只检查src下的文件
                include:resolve(__dirname,'src'),
                //优先执行
                enforce:'pre',
                //延后执行
                //enforce:'post',
                //单个loader用loadr
                loader:'eslint-loader'
            }
        ]
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