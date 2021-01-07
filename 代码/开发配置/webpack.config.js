/* 
开发环境配置，能让代码运行起来
运行指令：
webpack 会将打包结果输出去
npx webpack-dev-server 只会在内存中编译打包，没有输出
*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPugin = require('optimize-css-assets-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
     output:{
       filename:'js/built.js',
       path:resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [ 
                    // MiniCssExtractPlugin.loader,//4.提取为单独的css文件
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
                    }, 'css-loader', 'less-loader']
            }, 
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {//默认处理不了html中的img图片
                test: /\.(jpg|png|gif)$/,
                //使用一个loader
                //下载url-loader file-loader，因为uel-loader依赖file-loader
                loader: 'url-loader',//处理css中的图片
                options: {//配置
                    //图片大小小于8kb,就会被base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 28 * 1024,//(因为速度较慢，所以一般选择8kb-12kb的图片进行base64)
                    //问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs解析
                    //解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    //给打包后输出文件built.js的图片重新命名,[hash:10]取图片的hash的前十位，[ext]取原来文件拓展名
                    name: '[hash:10].[ext]',
                    outputPath:'imgs'
                },

            },
            //处理hml中img资源
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                //如何打包其他资源(除了html/js/css资源以外的资源)
                //排除css/js/html资源
                exclude: /\.(css|js|html|less|jpg|png|gif)$/,
                loader: 'file-loader',//url-loader是file-loader基础上，多了base压缩功能
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'meida'
                }
            }


        ]
    },
    plugins: [
        // new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    //启动devSrver指令：npx webpack-dev-seve
    //启动后会在终端看到有程序并没有终止，不会出现像下载其他依赖结束后的样子
    devServer: {//特点：只会在内存中编译打包，不会有任何输出到本地代码
        contentBase: resolve(__dirname, 'build'),//项目构建后的路径
        //启动gzip，压缩代码，体积更小，打包速度更快
        compress: true,
        //开发服务器端口号
        port: 3004,
        open: true//配置后输入npx webapck-dev-server后自动打开浏览器，无需手动输入loachost:3000
    }
}