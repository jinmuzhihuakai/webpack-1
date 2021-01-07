// import { mul } from './test';
// eslint-disable-next-line
console.log('index.js文件被加载了');
document.getElementById('btn').onclick = function () {
    //webpackChunkName:'test'f  作用：分隔代码test；单独成一个文件,不是只有一个main文件
    //懒加载 当文件需要时候才加载
    //预加载 prefetch:会在使用之前，提前加载js文件,
    //正常加载可以认为是并行加载（同一时间加载多个文件）
    //预加载 prefetch等其他资源加载完毕,浏览器空闲，再加载,只有等其他加载好了才加载，比如当前的test.js，点击按钮后有延缓效果
    import (/*webpackChunkName:'test',webpackPrefetch:true*/'./test').then(({mul})=>{
        console.log(mul(4, 5));
    })
};
