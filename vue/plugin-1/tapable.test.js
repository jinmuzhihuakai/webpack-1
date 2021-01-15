/* 
运行node tapable.test.js    生命周期函数一定会保证前面的周期执行完毕才会执行后面的生命周期函数
*/
const {SyncHook,SyncBailHook,AsyncParallelHook,AsyncSeriesHook}=require('tapable')
class Lesson{
    constructor(){
        //初始化hooks容器
        this.hooks={
        //同步hooks,任务会依次执行
        go:new SyncHook(['address']),
            // go:new SyncBailHook(['address']), //SynBailHook:一旦有返回值就会退出~
            
            //异步hooks
            //AsyncParalleHook:异步并行
            // leave:new AsyncParallelHook(['name','age']),
            //AsyncSeriesHook:异步串行
            leave:new AsyncSeriesHook(['name','age'])
        }

    }
    tap(){
        //往hooks容器中注册相应的事件/添加回调函数
        /* 
        在this中找到hooks,再找到go,go的值看成一个容器，往容器中添加一个名为‘0318’，值为回调函数
        */
        this.hooks.go.tap('class0318',(address)=>{
            console.log('class0318',address)
            return 111
        })
        this.hooks.go.tap('class0114',(address)=>{
            console.log('class0114',address)
        })
        this.hooks.go.tap('class0105',(address)=>{
            console.log('class0115',address)
        })
        this.hooks.leave.tapAsync('class0115',(name,age,cb)=>{
            setTimeout(()=>{
                console.log('class0515',name,age)
                cb();
            },2000)
        })
        this.hooks.leave.tapPromise('class0615',(name,age)=>{
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    console.log('class0615',name,age)
                     resolve()
                },1000)
            })
           
        })
    }
    start(){
        //触发钩子函数hooks所有方法
        this.hooks.go.call('c318');
        /* 调用callAsync会触发tapAsync， tapPromise，因为AsyncParalleHook是异步并行的容器，2000,1000为了作对比s*/
        this.hooks.leave.callAsync('jack',18,function(){
            //代表所有leaval容器中的函数触发完了。才触发
            console.log('end----')
        })
    }
}
const l=new Lesson()
l.tap()
l.start()