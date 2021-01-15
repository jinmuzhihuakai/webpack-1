
const path=require('path')

module.exports={
    module:{
        rules:[
           {
            test:/\.js$/,
            // loader:'loader1'
            // use:[
            //     'loader1',
            //     'loader2',
            //      {
            //          loader:'loader3',
            //          options:{
            //              name:'jak',
            //              age:67
            //          }
            //      }
            // ]
            loader:'babelLoader',
            options:{
                presets:[
                    '@babel/preset-env'
                ]
            }
           }
        ]
    },
    resolveLoader:{//解析loader的规则
        modules:[//指示loader去哪些目录找,默认情况下是'node_modules',咱么这相当于自己写的loader,不是第三方库下载的
            'node_modules',
            path.resolve(__dirname,'loaders')
        ]
    }
}