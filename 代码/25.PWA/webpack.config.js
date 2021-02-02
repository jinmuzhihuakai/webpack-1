const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin=require('html-webpack-plugin')
const WorkboxWebpackPlugin=require('workbox-webpack-plugin')
/* 
PWA:渐进式网络开发应用程序（离线可以访问）
workbox --->workbox-webpack-plugiin
*/
process.env.NODE_ENV = 'production'
//复用loader
const CommonCssLoader = [
    MiniCssExtractPlugin.loader,//4.提取为单独的css文件
    'css-loader',//3.通过css-loader加载到js中
    { //还需要在package.json中指示做到哪些浏览器兼容，定义browserslist
        //2.postcss兼容性处理
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => {
                require('postcss-preset-env')()
            }
        }
    },
]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'build/index.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    ...CommonCssLoader
                ]
            },
            {
                /* 
                less文件也要做css兼容。但是postcss是做js兼容的，rules规则是从下往上执行的
                */
                test: /\.less$/,
                use: [
                    ...CommonCssLoader,
                    'less-loader'//1.处理成css文件
                ]
            },
            /* 
            正常来讲，一个文件只能被一个loader处理
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
            先执行eslint。后执行bael

            */
            {
                //在package.json中eslintConfig-->airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce:'pre',//和bael-loader比起来优先执行
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // options:{
                //     cacheDirectory:true
                // }
                options: {
                    //预设：指示bael做怎么样的兼容处理
                    presets: [
                        // [
                        //     '@babel/preset-env',
                        //     //该文件引入的是最新版本所以引入的bael依赖包也不同,也不需要下面的配置
                        //     {
                        //         //按需加载
                        //         useBuiltIns: 'useage',
                        //         //指定core-js版本
                        //         corejs: {
                        //             version: 3
                        //         },
                        //         //指定兼容性做到哪个版本浏览器
                        //         targets: {
                        //             chrome: '60',
                        //             firefox: '60',
                        //             ie: '9',
                        //             safari: '10',
                        //             edge: '17'
                        //         }
                        //     }
                        // ]
                    ],
                    cacheDirectory:true
                }
            },
            {
                test:/\.(jpg|png|gif)/,
                loader:'url-loader',
                options:{
                    limit:27*1024,
                    name:'[hash:10].[ext]',
                    outputPath:'imgs',
                    esModule:false
                }
            },
            {
                test:/\.html$/,
                 loader:'html-loader'
            },
            {
                exclude:/\.(js|css|less|html|jpg|png|gif)/,
                loader:'file-loader',//原封不动的处理文件
                options:{
                    outputPath:'media'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPugin(),//css压缩,
        new HtmlWebPackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            //生成一个 servicework配置文件~
            clientsClaim:true,//帮助servicework快速启动
            skipWaiting:true//删除旧的 servicework
        })
    ],
    mode: 'production'
}