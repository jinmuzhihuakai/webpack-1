
const {resolve}= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin=require('workbox-webpack-plugin')
const AddAssetHtmlWebpackPlugin=require('add-asset-html-webpack-plugin')
const webpack=require('webpack')
// process.env.NODE_ENV = 'production'
//复用loader
const CommonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    { 
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => {
                require('postcss-preset-env')()
            }
        }
    },
]
module.exports={
        // entry:{
        //    0: './src/js/index.js',
        //     test:'./src/js/exter.js'
        // },
       entry:'/Users/heqin/Desktop/webpack/代码/dome/src/js/index.js', //'./src/index.html'  
     output: {
        //  filename:'js/index.js',
        filename: 'js/[name].js',//
        // filename:'js/[name].[contenthash:10].js',
        //输出文件目录（将来所有资源输出的公共目录）
        chunkFilename:'[name]_chunk.js',
        path: resolve(__dirname, 'build'),
        publicPath:'/',
        // chunkFilename:'[name]_chunk.js',
        // library:'[name]',
        // libraryTarget:'window',
        // libraryTarget:'global',
        // libraryTarget:'commonjs',
    },
     module: {
        rules: [
            {
                //在package.json中eslintConfig-->airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce:'pre',//和bael-loader比起来优先执行
                options: {
                    fix: true,
                    outputPath:'imags'
                }
            },
            {
                oneOf:[
                    {
                        test: /\.css$/,
                        use: [
                            ...CommonCssLoader
                        ]
                    },
                    {
                    exclude:/\.(js|css|less|html|jpg|png|gif)/,
                    loader:'file-loader',
                    options:{
                        name:'[contenthash:10].[ext]',
                        outputPath:'media'
                    }
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...CommonCssLoader,
                            'less-loader'//1.处理成css文件
                        ]
                    },
                    {//默认处理不了html中的img图片
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',//处理css中的图片
                        options: {//配置
                            limit: 8 * 1024,
                            esModule:false,                   
                            name:'[hash:10].[ext]',
                            outputPath:'imgs',
                        }
                    },
                    {
                        test: /\.html$/,
                        //处理html文件的img图片,从而能被url-loader进行处理
                        loader: 'html-loader'
                    },
                    
                    {//js兼容处理
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use:[
                            {
                            loader:'thread-loader'
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    //预设：指示babel做怎么样的兼容处理
                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                //按需加载
                                                useBuiltIns: 'usage',
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
                                    ],
                                    // cacheDirectory:true
                                }
                            }
                        ]
                
                    },
                ]
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
              minify:{
                //移除空格
                collapseWhitespace:true,
                //移除注释
                removeComments:true
            }
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件重命名
            filename: 'css/built.css',
            // filename:'css/built.[contenthash:10].css'
        }),
         //压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        // new WorkboxWebpackPlugin.GenerateSW({
        //     clientsClaim:true,
        //     skipWaiting:true
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest:resolve(__dirname,'dll/manifest.json')
        //    }),
        //    //将某个文件打包输出去，并在html中自动引入该文件
        //    new AddAssetHtmlWebpackPlugin({
        //          filepath:resolve(__dirname,'dll/jquery.js')
        //    })
    ],
    devServer:{
        contentBase:resolve(__dirname,'build'),
        watchContentBase:true,
        watchOptions:{
            //忽略文件
         ignored:/node_modules/
        },
        watchOptions:{
            //忽略文件
         ignored:/node_modules/
        },
        compress:true,
         //域名
        host:'localhost' ,
        //开发服务器端口号
        port:5005,
        hot:true,
        clientLogLevel:'none',
        quiet:true,
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '^/api':''
                }
            }
        },
        open:true
    },
    resolve:{
      alias:{
          $css:resolve(__dirname,'src/css'),

      },
      extensions:['.js','.json','.css','.less'],
      modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    },
    // devtool:'source-map',
     mode: 'development',
//    optimization:{
//     splitChunks:{
//         chunks:'all'
//     }
// },
 externals:{//script手动引入下，目的比打包这些大库快多了
        
    // //忽略库名---npm包名
        jquery:'jQuery'
    }
    //  mode: 'production'
}


