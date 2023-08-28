// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

/* console.log(VueRouter.prototype); */
// 先把VueRouter原型对象的push保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 治标不治本
/* VueRouter.prototype.push(originpush,() => {}, () => {}) */

// 重写push | replace
// 第一个参数: 告诉原来的push方法往哪里跳转，（传递哪些参数）
// 第二个参数：成功的回调，第三个参数：失败的回调
// call || apply 的区别
// 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点： call 与 apply 传递参数： call 传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,() => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,() => {}, () => {})
    }
}

//配置路由
export default new VueRouter({
    // 配置路由
    routes:[
        {
            path:'/',
            redirect:'/home',
        },
        {
            path:'/home',
            component:Home,
            meta:{showFooter:true}
        },
        {
            name:'search',
            path:'/search/:keyword?',
            component:Search,
            meta:{showFooter:true},
            // 路由组件能不能传参
            // 布尔值写法：只用于params
            // props:true
            // 对象写法：额外的给路由组件传递一些props
            // props:{a:1,b:2}
            // 函数写法：可以params参数。query参数、通过props传递给路由组件   
            // 不管那种写法都不要忘记用props接收一下参数
            props($route){
                return {
                    k:$route.query.k
                }
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{showFooter:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{showFooter:false}
        },
    ]
})