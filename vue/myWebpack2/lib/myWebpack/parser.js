const fs = require("fs");//读取文件方法
const babelParser=require('@babel/parser');
const  traverse  = require("@babel/traverse").default;
const {transformFromAst}  = require("@babel/core");
const path=require('path')
const parser={
    //将文件解析成ast
    getAst(filePath){
        //读取文件
        const file= fs.readFileSync(filePath,'utf-8')
       //2.将其解析成ast抽象语法树,目的为了分析依赖
       const ast=babelParser.parse(file,{
           sourceType:'module'//解析文件的模块方案是 ES Module
       })
       return ast
    },
    //获取依赖
    getDeps(ast,filePath){
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
         return deps
    },
    //将ast解析成code
     getCode(ast){
        const {code}= transformFromAst(ast,null,{
            presets:['@babel/preset-env']
        })
       return code
     }
}
module.exports=parser
//运行指令  npm run build