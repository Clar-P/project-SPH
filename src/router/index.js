// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 用了路由懒加载后就不用这样引入了
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

import store from '@/store'

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
let  router =  new VueRouter({
    // 配置路由
    routes:[
        {
            name:'Center',
            path:'/center',
            component:Center,
            // 二级路由组件
            children:[
                {
                    name:'myOrder',
                    component:myOrder,
                    path:'myorder'
                },
                {
                    name:'groupOrder',
                    component:groupOrder,
                    path:'grouporder'
                }
            ],
            redirect:'/center/myorder'

        },
        {
            name:'PaySuccess',
            path:'/paysuccess',
            component:PaySuccess,
            meta:{showFooter:true},
            beforeEnter: (to, from, next) => {
                if(from.path == '/pay'){
                    next()
                }else{
                    next(false)
                }
            }

        },
        {
            name:'Pay',
            path:'/pay',
            component:Pay,
            mata:{showFooter:true},
            beforeEnter: (to, from, next) => {
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            name:'ShopCart',
            path:'/shopcart',
            component:ShopCart,
            mata:{showFooter:true}
        },
        {
            name:'AddCartSuccess',
            path:'/addcartsuccess',
            component:AddCartSuccess,
            meta:{showFooter:true}
        },
        {
            path:'/detail/:skuId',
            component:Detail,
            meta:{showFooter:true}
        },
        {
            path:'/',
            redirect:'/home',
        },
        {
            path:'/home',
            component: () => import('@/pages/Home'),
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
        {
            path:'/trade',
            component:Trade,

        }
    ],
    // 滚动行为
    scrollBehavior(to,from,savedPosition){
        // 返回的这个y=0,代表的滚动条在最上方
        return {x:0,y:0}
    }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next) => {
    // to: 可以获取到你要跳转到哪一个路由信息
    // from : 可以获取到你从那个路由来的信息
    // next : 放行函数 next() 直接放行    next(path) 放行到指定路由    next(false)中断放行，驳回原路由
    // next()


    // 用户登录了。才会有token，未登录一定不会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name

    // 用户已经登录了
    if(token){
        // 用户已经登录了还想去login {不给去，停留在首页}
        if(to.path=='/login'){
            next('/home')
        }else{
            // 登录了，去的不是login【home|detail|search|shopcart】
            // 如果用户名已有
            if(name){
                next()
            }else{
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try{
                    await store.dispatch('user/getUserInfo')
                    // 放行
                    next()
                }catch(error){
                    //token 失效了获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }

    }else{
        // 未登录，不能去交易相关、不能去支付相关（pay|paysuccess）、不能去个人中心
        // 未登录不能去上面这些路由---登录
        let toPath = to.path
        if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay')  != -1  || toPath.indexOf('/center') != -1){
            // 把未登录的时候想去而没有去成的信息，存储在地址栏中【路由】
            // 再去登录组件条件判断  这样做目的是为了没登录时想去的路由保存下来。登录以后就能直接跳转，而不是跳转到首页重新点进去
            // 这步很重要
            next('/login?redirect=' + toPath)
        }else{
            // 去的不是上面这些路由(home|search|shopcart) -- 放行
            next()
        }
        
    }
})

export default router