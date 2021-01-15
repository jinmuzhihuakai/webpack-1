const { getOptions} =require('loader-utils')
const {validate} =require('schema-utils')
const babelSchema=require('./babelSchema.json')
const babel=require('@babel/core')//做编译，返回得是异步方法
const util=require('util')
//babel.transform用来编译代码的方法，是一个普通异步方法
//util.promisify将普通异步方法转化为基于promise的异步方法
const transform=util.promisify(babel.transform)
module.exports=function(content,map,meta){
 //获取loader的options配置
 const options=getOptions(this) || {}
 validate(babelSchema,options,{
     name:'Babel Loader'
 })
//创建异步
const callback=this.async()
//使用babel编译代码
transform(content,options)
.then(({code,map})=>callback(null,code,map,meta))
.catch((e)=>callback(e))
} 