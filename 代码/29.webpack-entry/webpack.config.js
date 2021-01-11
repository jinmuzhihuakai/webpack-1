const { resolve } = require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')
/* 
  entry:入口起点
  1.string --->'./src/index.js'
     单入口
     打包形成一个chunk。输出一个bundle文件
     此时chunk的名称默认是main
  2.array --->['./src/index.js','./src/add.js']
      多入口
      所有入口文件最终只会形成一个chunk,输出去只有一个bundle文件.
      --->只有在HMR功能中让html热更新生效
  3.object
     多入口
     有几个入口文件就形成几个chunk,输出几个bundle文件
     此时chunk的文件名称是key
     特殊用法：  entry: {
         1.所有入口文件最终只会形成一个chunk,输出去只有一个bundle文件
        index:['./src/js/index.js','./src/js/count.js'],
       2.形成一个chunk,输出一个，个bundle文件
        add:'./src/js/add.js'
    },
*/
//复用loader
module.exports = {
    //['./src/js/index.js','./src/js/add.js']
    entry: {
        index:['./src/js/index.js','./src/js/count.js'],
        add:'./src/js/add.js'
    },
    output: {
        filename: '[name].js',
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
    mode: 'development'
}