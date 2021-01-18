const fs = require("fs");//读取文件方法
const babelParser=require('@babel/parser');
const  traverse  = require("@babel/traverse").default;
const {transformFromAst}  = require("@babel/core");
const path=require('path')
function myWebpack(config){
    return new Compiler(config)
}
class Compiler{
   constructor(options={}){
       this.options=options
   }
   //启动webpack打包
   run(){
       //1.读取入口文件
       //入口文件路径
       const filePath=this.options.entry
        const file= fs.readFileSync(filePath,'utf-8')
       //2.将其解析成ast抽象语法树,目的为了分析依赖
       const ast=babelParser.parse(file,{
           sourceType:'module'//解析文件的模块方案是 ES Module
       })
       /* 
       在package.json配置npm run debug,运行npm run debug,打开babel网站，检查，点击绿色按钮，
       Watch里面输入ast,查看program/body/(数组---每个对象就是src/index.js中的每行代码，空格不算，
       对象里面的type类型就是当前语句的语法，source.value就能看出依赖关系，收集依赖,如果遍历收集依赖太麻烦)
       */
    //    debugger
       console.log(ast)
       //获取到文件夹路径
       const dirname=path.dirname(filePath)
       //定义存储依赖的容器
       const deps={}
       //所以babel提供插件为了收集依赖
       traverse(ast,{
           //内部会遍历ast中program.body,判断里面语句类型
           //如果 type:ImportDeclaration 就会触发当前函数
           ImportDeclaration({node}){
               //依赖s文件相对路径：'./add.js'
               const relativePath=node.source.value
               //生成基于入口文件的绝对路径
               const absolutePth=path.resolve(dirname,relativePath)
               debugger
                 //添加依赖
                 deps[relativePath]=absolutePth
           }
       })
       console.log(deps)
       //编译代码：将代码中浏览器不能识别的语法进行编译
       const {code}= transformFromAst(ast,null,{
           presets:['@babel/preset-env']
       })
       console.log(code)
   }
   
}


module.exports=myWebpack