
const {resovle, resolve}=require('path')
const HtmlWebapckPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./src/index.js',
    output:{
       filename:'built.js',
       path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                //如何打包其他资源(除了html/js/css资源以外的资源)
            //排除css/js/html资源
            exclude:/\.(css|js|html)$/,
            loader:'file-loader'
            }

        ]
    },
    plugins:[
        new HtmlWebapckPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
     //启动devSrver指令：npx webpack-dev-seve
     //启动后会在终端看到有程序并没有终止，不会出现像下载其他依赖结束后的样子
     devServer:{//特点：只会在内存中编译打包，不会有任何输出到本地代码
        contentBase:resolve(__dirname,'build'),//项目构建后的路径
        //启动gzip，压缩代码，体积更小，打包速度更快
        compress:true,
        //开发服务器端口号
        port:3000,
        open:true//配置后输入npx webapck-dev-server后自动打开浏览器，无需手动输入loachost:3000
    }
}