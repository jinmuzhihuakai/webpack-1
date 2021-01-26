// 引入iconfont样式文件
import '../asstes/iconfont.css';
import '../css/index.less';
import { add } from './add';

console.log('index.js文件被加载了');
if (module.hot) {
  // 一旦  module.hot 为true,说明开启了HMR-->让HMR功能代码生效
  module.hot.accept('./add', () => {
    // 方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建
    // 会执行后面的回调函数
    add(5, 6);
  });
}
console.log('55555');
console.log('1111');
