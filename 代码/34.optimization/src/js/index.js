import '$css/index.css'
// import {add} from './a'
// console.log(add(7,8))

import(/* webpackChunkName */'./a').then(({add})=>{
    console.loga(add(1,2))
})