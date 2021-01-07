/* 
webapck.config.js webapck的配置文件
作用：指示webpck干哪些活（当你运行wbapck指令时，会加载里面的配置）
所有构件工具都是基于node.js平台运行  模块化默认采用commonjs  
 src是项目代码，采用es6,webapck.config.js 是配置文件，采用commonjs
不用文件必须配置不同loader处理
*/
//resolve 用来拼接绝对路径的方法
const {resolve} =require('path')
module.exports={
    //webapck入口文件
    entry:'./src/index.js',
    // 输出
    output:{
        // 输出文件名
        filename:'built.js',
        // 输出路径
        //_dirname node.js的变量，代表当前文件的目录绝对路径
        path: c(__dirname, 'build')
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

    ],
    mode:'development'
}
