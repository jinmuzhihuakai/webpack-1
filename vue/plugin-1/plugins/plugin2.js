const fs=require('fs')//fs是异步代码
const util=require('util')
const path=require('path')

const webpack=require('webpack')//webpack提供帮我们快速创建基于webpack的文件
const {RawSource}=webpack.sources
/* 
util.promisify方法 将普通的异步函数转化为promise类型的函数

additionalAssets 
AsyncSeriesHook

为 compilation 创建额外 asset。 这个钩子可以用来下载图像，例如：

compilation.hooks.additionalAssets.tapAsync('MyPlugin', callback => {
  download('https://img.shields.io/npm/v/webpack.svg', function(resp) {
    if(resp.status === 200) {
      compilation.assets['webpack-version.svg'] = toAsset(resp);
      callback();
    } else {
      callback(new Error('[webpack-example-plugin] Unable to download the image'));
    }
  });
});
*/
const readFile=util.promisify(fs.readFile)
class Plugin2 {
    apply(compiler) {
        //初始化compilation钩子
        compiler.hooks.thisCompilation.tap('MyPlugin', (compilation) => {
            // debugger//当运行npm start调试断点到webpack.js文件首行停住时候，点击下一步，会停住到这个debugger位置
            // 返回 true 以输出 output 结果，否则返回 false
            //    console.log(compilation)
            //添加资源
           
            compilation.hooks.additionalAssets.tapAsync('MyPlugin2', async (callback) => {
                const content = 'hello plugin2'
                // debugger
                // console.log(compilation)
                compilation.assets['a.txt'] = {//1.自定义文件，文件内容过长，不方便
                    //文件大小
                    size() {
                        return content.length
                    },
                    //文件内容
                    source() {
                        return content
                    }
                }
              const data= await readFile(path.resolve(__dirname,'b.txt'))//2.从项目中引创建的文件类型
            //   compilation.assets['b.txt']=new RawSource(data)
            compilation.emitAsset('b.txt',new RawSource(data))//等价于上面一行
                callback()//让异步hook执行完
            });

        })

    }
}
module.exports = Plugin2