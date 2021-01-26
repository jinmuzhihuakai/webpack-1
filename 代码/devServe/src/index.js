
// 1. 创建一个新的promise对象
const p = new Promise((resolve, reject) => {// 执行器函数  同步回调
    console.log('执行 excutor')
    resolve()

})
console.log('new Promise()之后')

// setTimeout(() => {
p.then(
    value => { // 接收得到成功的value数据    onResolved
        console.log('成功的回调', value)
    },
    reason => {// 接收得到失败的reason数据  onRejected
        console.log('失败的回调', reason)
    }
      )
      // }, 2000)