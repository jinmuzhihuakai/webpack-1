const {validate}=require('schema-utils');
const schema=require('./schema.json')
const path=require('path')
const webpack=require('webpack')
const fs=require('fs')
const { promisify } = require('util');
// const schema=require('./schema.json')
const readFile=promisify(fs.readFile)

const {RawSource}=webpack.sources
const globby=require('globby');//专门用来匹配一些文件表，并根据自己规则忽略掉一些文件

class CopyWebpackPlugin{
    constructor(options={}){
        //验证options是否符合规范
        this.options=options
        validate(schema,options,{
            name:'CopyWebpackPlugin'
        })
    }
    apply(compiler){
        //初始化compilation
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin',(compilation)=>{
        //添加资源的hooks
        compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin',async(cb)=>{
            //将from中的资源复制到to中，输出去
            const {from,ignore}=this.options
            const to=this.options.to?this.options.to:'.'
            //1.读取from中所有资源
            //context就是webpack配置
             //执行上下文地址从compiler去取运行指令的目录s
            const context=compiler.options.context//process.cwd()
            //将输入路径变成绝对路径
            const absoluteFrom= path.isAbsolute(from)?from:path.resolve(context,from)
            ///globby(要处理的文件夹,options)
            const paths=await globby(absoluteFrom,{ignore})
            console.log(paths)
            //读取paths中所有资源
            const files=await Promise.all(
                paths.map(async(absolutePath)=>{
                    //读取玩文件
                    const data=await readFile(absolutePath)
                    //读取文件名称
                    const filename=path.basename(absolutePath)
                    return {
                        //文件数据
                        data,
                        //文件名称
                        filename
                    }
                })
            )
            //2.过滤掉ignore的文件
            //3.生成webpack格式的资源
               const assets=files.map((file)=>{
                  const source= new RawSource(file.data)
                  return {
                      source,
                      filename:file.name
                  }
               })
            //4.添加compilation中，输出去
            assets.forEach((asset)=>{
                compilation.emitAsset(asset.filename,asset.source)
            })
            cb()
        })
        })
    }
}
module.exports=CopyWebpackPlugin
