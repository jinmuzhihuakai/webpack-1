/* 
loader:1.下载 2.使用（配置loader）
plugiins:1.下载 2.引入3.使用

*/
const {resolve} =require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
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
    //loader配置
    module:{
        rules:[
            //详细loader配置
            {
                //配置哪些文件
              test:/\.css$/,
              use:[
                  //use数组中laoder执行顺序：从右到左，从上到下，依次执行
                  //创建style标签，将js中的样式资源插入进行，添加到head中生效
                  'style-loader',
                  //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                  'css-loader'
              ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    //将less文件编译成css文件
                    'less-loader'
                ]
            }
        ]
    },
    plugins:[
        //详细plugins的配置
        // 默认创建一个空的html,自动引入打包输出的所有资源（js/css）
        //需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            //复制'./src/index.html'文件，并自动引入打包输出的所有资源，无需自己手动输入
            template:'./src/index.html'
        })
         
    ],
    mode:'development'
}
