const HtmlWebPackPlugin=require('html-webpack-plugin')
const { resolve } = require('path')
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
           {
               test:/\.css$/,
               use:['style-loader','css-loader']
           },
       ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template:'./src/index.html',
        })
    ],
    mode: 'development',
    resolve:{//解析模块的规则
      //配置解析模块路径别名:优点是简写路径，缺点路径没有提示
      alias:{
          $css:resolve(__dirname,'src/css')
      },
      //解析模块路径下的文件名称略写定义
      extensions:['.js','.json','.css'],
      //告诉webpack解析模块是去找哪个目录
      modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    }
}