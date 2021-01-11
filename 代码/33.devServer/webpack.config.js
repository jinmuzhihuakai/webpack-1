
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
     //启动devSrver指令：npx webpack-dev-server
     //启动后会在终端看到有程序并没有终止，不会出现像下载其他依赖结束后的样子
     devServer:{//特点：只会在内存中编译打包，不会有任何输出到本地代码
        contentBase:resolve(__dirname,'build'),//项目构建后的路径
        //监视contentBase目录下的所有文件，一旦文件变化就会reload
        watchContentBase:true,
        watchOptions:{
            //忽略文件
         ignored:/node_modules/
        },
        //启动gzip，压缩代码，体积更小，打包速度更快
        compress:true,
        //开发服务器端口号
        port:5000,   
        //域名
        host:'localhost' ,
        open:true,//配置后输入npx webpack-dev-server后自动打开浏览器，无需手动输入loachost:3000
        hot:true,
        //不要显示启动服务器日志信息
        clientLogLevel:'none',
        //除了一些基本信息以外，其他内容都不要显示
        quiet:true,
        //如果出错打了，不要全屏提示
        overlay:false,
        //服务器代理--->解决开发环境跨域问题
        proxy:{
            //一旦devServer(5000)服务器接收到/api/xxx的请求，就会把请求转发到另一个服务器（3000）
            '/api':{
                target:'http://localhost:3000',
                //发送请求时，请求路径重写：将/api/xxx ---> /xxx(去掉/api)
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}