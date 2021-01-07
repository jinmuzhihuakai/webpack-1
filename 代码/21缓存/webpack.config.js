const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin=require('html-webpack-plugin')
/* 
babel缓存：babel缓存让第二次打包速度更快
cacheDirectory:true
文件资源缓存
  hash:每次webpack构建时会生成一个唯一的hash值
  问题：因为js和css同时使用一个hash值
  如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
  chunkhash:根据chunk生成的hash值。如果打包来源同一个chunk,那么hash值就一样
问题：js和css的hash值还是一样的，因为js文件引入css文件，生成一个chunk
contenthash:根据文件内容生成hash值，不同文件hash值一定不一样
hash值让上线运行缓存更好使用
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
        })
    ],
    mode: 'production'
}