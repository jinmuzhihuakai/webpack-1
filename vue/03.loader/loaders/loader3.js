//loader本质上就是一个函数
const {getOptions} =require('loader-utils')
const {validate} =require('schema-utils')//为了验证options是否符合规范
//loader-utils来自于webpack,为loader专门创建的工具函数库，getOptions专门获取option选项的
const schema=require('./schema.json')
module.exports=function(content,map,meta){
    console.log(333)
    const options=getOptions(this)
    console.log(333,options)

    //校验options是否合法
    validate(schema,options,{
        name:'loader3'
    })
    return content
 }
 module.exports.pitch=function(){//如果需要loader做一些提前处理，可以在pitch方法里做处理
    console.log('pitch 333')
 }