// 引入iconfont样式文件
import '../asstes/iconfont.css';
import '../css/index.less';
// import $ from 'jquery';

import { add } from './add';
// import { mul } from './loading';
/* eslint-disable */
console.log($);
console.log('index.js文件被加载了5');
// 代码分割ss
// import(/* webpackChunkName:'test' */'./num')
//   .then((result) => {
//     // 文件加载成功
//     console.log(result);
//   })
//   .catch(() => {
//     console.log('文件加载失败');
//   });
if (module.hot) {
  module.hot.accept('./add', () => {
    add(5, 6);
  });
}
// // 懒加载
// 预加载 webpackPrefetch:true
document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName:'loading' */'./loading').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then(() => {
//         console.log('sw注册成功了');
//       })
//       .catch(() => {
//         console.log('sw注册失败了');
//       });
//   });
// }
