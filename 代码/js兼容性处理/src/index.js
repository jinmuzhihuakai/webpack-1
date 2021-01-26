// const { resolve } = require("../../../vue/02.vue_cli/webpack.dev");

// import '@babel/polyfill'
function add(x, y) {

  return x + y;
}
function conut(){
  console.log(new Date().getTime())
  for(var i in 10){
    console.log('44')
    console.log(add(11,22))
  }
  console.log(new Date().getTime())
}
conut()
// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line



