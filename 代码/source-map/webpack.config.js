/* 
HMR:hot module replacement 热模块替换/模块热替换
作用：一个模块变化，只会重新打包这一个模块（而不是打包所有模块）
极大提升构建速度
样式文件 ：可以使用HMR功能：因为style-loader内部实现了~,修改less文件，只是

less文件热更新
js文件 :默认不能是使用hMR功能--->需要修改js代码，添加HMR功能,注意的是js文件的hot功能只能针对其他引入js文件，不会是入口文件
html文件：默认不能是使用hMR功能，同时会导致问题：html文件不能热更新了~(html不用做
HMR,因为html只有一个文件，一旦更改必须改变从而整体刷新)
解决： 修改entry入口文件，将html文件引入
*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: ['./src/js/index.js','./src/index.html'], //'./src/index.html'解决html不能热更新问题
     output:{
       filename:'js/built.js',
       path:resolve(__dirname,'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
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
                }
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
        open: true,//配置后输入npx webapck-dev-server后自动打开浏览器，无需手动输入loachost:3000
       //开启HMR
       //当修改了webpack配置，新配置要生效，必须重新webapck服务
        hot:true
    },
    devtool:'nosource-source-map'
}
/* 
源代码可能几百个模块，构建后代码模块可能只有一个，d
source-map:一种提供源代码到构建后代码映射技术（如果构建代码出错通过映射关系可以追踪源代码错误）
 参数： [inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map
source-map 外部 错误代码原因，错误代码的源代码位置
 inline-source-map:内联只生成一个内联source-map
 hidden-source-map：外部
  错误代码错误原因 ，但是没有错误位置,不能追踪源代码错误，只能提示到构建代码错误位置
 eval-source-map内联 
 每一个文件都生成对应的source-map,都在eval
 错误代码原因，错误代码的源代码位置
 内联和外部的区别：1.外部生成了文件，内联没有2.内联构建速度更快
 nosource-source-map：外部
 错误代码准确信息，但是没有任何源代码信息
 cheap-source-map:外部
 错误代码原因，错误代码的源代码位置,但是只能精确到行，不能精确到列
 cheap-module-source-map:外部
  错误代码原因，错误代码的源代码位置
  会将loader的source map加入
  开发环境：速度快，调试更好友好
  速度快（eval>inline?cheap>...）
  eval-cheap-source-map
  eval-source-map
  调试更友好
  source-map
  cheap-source-map
 综合比较 --->eval-source-map / eval-cheap-module-map
 生产环境：源代码要不要隐藏？调试要不要更友好
 内联：体积更大
 nosources-source-map
 hidden-source-map

*/