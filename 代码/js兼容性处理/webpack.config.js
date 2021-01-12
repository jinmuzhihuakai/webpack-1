const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //webapck入口文件
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        //_dirname node.js的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader配置
    module: {
        rules: [

            /* 
     
            js兼容处理：babel-loader @babel/preset-env
            1.js基本兼容性处理--》@babel/preset-env
            问题：只能转换基本语法，如promise不能转换
            2.全部js兼容性处理：--》@babel/polyfill(js文件import 引入下)
            问题：只要部分引入，全部引入体积太大
            3.需要做兼容性处理：按需加载--》core-js(使用它就不要引入@babel/polyfill)
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    //预设：指示babel做怎么样的兼容处理
                    presets: [
                        [
                            '@babel/preset-env',
                            //该文件引入的是最新版本所以引入的bael依赖包也不同,也不需要下面的配置
                            {
                                //按需加载
                                useBuiltIns: 'useage',
                                //指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                //指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        //详细plugins的配置

        // 默认创建一个空的html,自动引入打包输出的所有资源（js/css）
        //需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            //复制'./src/index.html'文件，并自动引入打包输出的所有资源，无需自己手动输入
            template: './src/index.html'
        })

    ],
    mode: 'development'
}
