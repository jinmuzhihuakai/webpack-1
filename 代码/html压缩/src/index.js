function add(x, y) {
  return x + y;
}
//下一行eslint所有规则都失效（下一行不进行eslint检查）
//eslint-disable-next-line

console.log(add(3, 4));
const promise=new Promise((resolve)=>{
setTimeout(()=>{
    console.log('定时器执行完了~');
    resolve()
},1000)
})
console.log(promise)