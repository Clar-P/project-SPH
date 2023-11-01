import Vue from 'vue'
import App from './App.vue'
// 三级联动组件-- 全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图组件 -- 全局组件
import Carousel from '@/components/Carousel'
// 分页器全局组件 
import Pagination from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui';

// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel) 
Vue.component(Pagination.name,Pagination)
// Vue.use(Button)  注册成全局组件或者当插件用
Vue.component(Button.name,Button)
// ElementUI注册的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 引入路由
import router from '@/router'
Vue.config.productionTip = false
// 引入仓库
import store from '@/store'

// 引入MockServe.js ---- mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'


// 统一接口api文件夹里全部的请求函数
// 统一引入，不用每一个组件都引入
import * as API from '@/api'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
import lazygif from '@/assets/lazy.gif'
Vue.use(VueLazyload,{
  // 图片没加载出来之前显示的图片
  loading:lazygif
})


new Vue({
  render: h => h(App),
  // 全局事件总线配置
  beforeCreate(){
    Vue.prototype.$bus = this
    // 所有组件就能直接用，不用每一个组件引了
    Vue.prototype.$API = API
  },
  // 注册理由：底下的写法KV一致省略V【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router,$route属性
  router,
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
