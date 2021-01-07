
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
    mode:'development'
}