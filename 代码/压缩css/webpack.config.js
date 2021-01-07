
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
//设置node.js环境变量
process.env.NODE_ENV='development'
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    'style-loader',//创建style标签，将样式放入
                    MiniCssExtractPlugin.loader,//这个loader取代styke-loader，作用：提取js中的css成单独文件

                    'css-loader',//将css文件整合到js文件中
                    /*  
                    css兼容处理：postcss -->postcss-loader postcss-preset-dev
                    帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                   
                     "browserslist":{
                         //开发环境 -->激活开发环境：设置node环境变量:process.env.NODE_ENV=development
                        "development":[
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        "production":[生产环境:默认是生产环境
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                    }
                    */
                    // 两种方法：1.使用loader的默认配置  2.修改loader的配置
                    //‘postcss-loader’
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                //postcss的插件
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({//build/index.html输出的文件中dom元素css在linck标签中，这就是单独引入css
            //对输出的css文件重命名
            filename: 'css/built.css'
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}