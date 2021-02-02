const { resolve } = require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'build/index.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebPackPlugin({
            template:'./src/index.html',
        }), 
    ],
    mode: 'production',
    externals:{//script手动引入下，目的比打包这些大库快多了
        //忽略库名---npm包名
        jquery:'jQuery'
    }
}