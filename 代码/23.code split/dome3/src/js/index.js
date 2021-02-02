
function sum(...args) {
  return args.reduce((x, y) => x + y, 0);
}
/* 
通过js代码，让某个文件被单独打包成一个chunk，j
import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName:'test'*/'./test')
.then((result)=>{
//文件加载成功
console.log(result)
})
.catch(()=>{
  console.log('文件加载失败')
})
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4,5));
// eslint-disable-next-line


