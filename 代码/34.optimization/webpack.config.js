const HtmlWebPackPlugin=require('html-webpack-plugin')
const { resolve } = require('path')
const TerserWebpackPlugin=require('terser-webpack-plugin')
/* 
  
*/
//复用loader
module.exports = {
    entry: 
       './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',//引入的js文件打包时候会单独生成，文件名称默认1
        //输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        chunkFilename:'js/[name].[contenthash:10]_chunk.js'//针对于上面的filname分割的chunk（打包的对应着单独的js文件）
        //重新命名,如果还想细分，a.js文件中在动态引入文件时候,import（/*webpackChunkName:'a'*/）
        
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
    mode: 'production',
    resolve:{//解析模块的规则
      //配置解析模块路径别名:优点是简写路径，缺点路径没有提示
      alias:{
          $css:resolve(__dirname,'src/css')
      },
      extensions:['.js','.json','.css'],
      //告诉webpack解析模块是去找哪个目录
      modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    },
    optimization:{//生产环境才有意义
        splitChunks:{
            chunks:'all',
            // minSize:30 * 1024,//分割的chunk最小为30kb
            // maxSize:0,//最大没有限制
            // minChunks:1,//要提取的chunk最少被引用1次
            // maxAsnyRequests:5,//按需加载时并行加载文件的最大数量
            // maxInitialRequests:3,//入口js文件,最大并行请求数量
            // automaticNameDelimiter:'~',//名称连接符
            // name:true,//可以使用命名规则
            // cacheGroups:{//分割chunk的组
            // //node_modules文件会被打包到vendors 组的chunk中-->vendors~xxx.js
            // //满足上面的公共规则，如：大小超过30b,至少被引用一次
            //vendor 是webpack默认配置下抽离的公共模块的名称
            // vendors:{//将所有来自node_modules的模块分配到一个叫做vendors的缓存组
            //     test:/[\\/]node_modules[\\/]/,
            //     //优先级
            //     priority:-10
            // },
            // default:{
            //     minChunks:2,//所有重复问引用至少两次的代码，会被分配到defult的缓存组
            //     priority:-20,
            //     //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用。而不是重新打包模块
            //     reuseExistingChunk:true//允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效
            // }
            // }
        },
        runtimeChunk:{//将main模块的记录其他模块的hash单独打包为一个文件 runtime
        //解决：修改a文件导致b文件的contenthash变化
            name:entrypoint=>`runtime-${entrypoint.name}`
        },
        minimizer:[
            //配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
              //开启缓存
              cache:true,
              //开启多进程打包
              parallel:true,
              //启动source-map
              sourceMap:true
            })
        ]
    }
}
