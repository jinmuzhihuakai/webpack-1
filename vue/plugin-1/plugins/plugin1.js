/* 
在webpack中new 插件的时候，都会调用apply方法,
所以我们都会在apply中做相应的事，apply都会把complier传进去，
再从complier对象中绑定的中找到钩子，往钩子塞入些函数，从而在webpack执行中，执行我们相应绑定的钩子函数
*/
class Plugon1{
    apply(complier){
     complier.hooks.emit.tap('plugin1',(compilation
        )=>{
         console.log('emit.tap 111')
     })
     complier.hooks.emit.tapAsync('plugin1',(compilation,cb
        )=>{
            setTimeout(()=>{
                console.log('emit.tap 111')
                cb()
            },1000)
     
        
     })
     complier.hooks.afterEmit.tap('plugin1',(compilation
        )=>{
         console.log('emit.tap 111')
     })
     complier.hooks.done.tap('plugin1',(stats
        )=>{
         console.log('stats.tap 111')
     })
    }
}
module.exports=Plugon1