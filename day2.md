1:编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
--声明式导航没有这类问题，因为vue-router底层已经处理好了

1.1  为什么编程式导航进行路由跳转时就有这种警告错误
'vue-router':"^3.5.3" ,最新的vue-router引入promise
push与replace方法本质上是返回一个promise，但是没有设置接收成功与失败的回调函数来捕获当前的错误

1.2 通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决

1.3 通过底部的代码，可以实现解决错误
this.$router.push(name:'search',params:{keyword:this.keyword}, () => {}, () => {})
这种写法治标不治本，在其他组件中使用push和replace时还是存在，则直接修改原型上的push和replace
在路由配置文件中改









2.Home 模块组件拆分
-- 先把静态页面完成
-- 拆分出静态组件
-- 获取服务器的数据进行展示
-- 动态业务







3:三级联动组件完成
--- 由于三级联动，在Homw、Search、Detail，把三级联动注册为全局组件
好处：只需注册一次，就可以在项目的任意地方使用








4、 完成其余静态组件
HTML+CSS+图片资源 --- 细心【结构，样式。图片资源】









5:POSTMAN测试接口
-- 刚刚经过postman工具测试，接口是没有问题的
-- 如果服务器返回的数据code字段200，代表服务器返回数据成功
-- 整个项目，接口前缀都有/api字样

-- 坑：注意postman发送请求时，注意检查请求体中不要携带东西，全部清空再发送，不然拿不到数据








6:axios二次封装
XMLHttpRequest.fatch,JQ.axios
6.1 为什么需要进行二次封装axios
请求拦截器，响应拦截器：可以在请求发送之前和服务器返回数据后处理一些事情

6.2在项目当中经常API文件夹（axios）
接口当中：路径都带有/api
baseURL:'/api'

6.3基础不好，可以参考着axios文档操作







7：接口统一管理

项目很小：完全可以在组件的生命周期函数中发送请求
项目大： axios.get('xxx')

 7.1 跨域问题
 什么是跨域：协议、端口号、域名不同的请求，称之为跨域
 http://localhost:8080/#/home    ---- 前端项目本地服务器
 http://gmall-h5-api.atguigu.cn  ---- 后台服务器

 JSONP、CROS、代理






 8:nprogress进度条的使用
    是一个插件 ，先安装 npm i nprogress
    可以在拦截器中使用
    start:进度条开始
    done:进度条结束
    进度条颜色可以修改的，直接在nprogress.css中修改别人的配置 .bar









9.vuex状态管理库
9.1 vuex是什么？
vuex是官方提供的一个插件,状态管理器，集中式管理项目中组件功用的数据
切记。并不是全部项目都需要Vuex，如果项目很小，完全不需要Vuex，如果项目很大，组件很多、数据很多，数据维护很
    费劲，Vuex

state
mutations
actions
getters
modules

npm i vuex@3

9.2 vuex的基本使用
使用map方法之前要先引入
模块化时要注意开启命名空间再使用map

9.3 VUEX实现模块化开发
如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块化开发
坑：！！！模块化后一定一定开启命名空间，然后没使用map方法时一定一定注意写上操作的是哪个模块
    如：this.$store.dispatch('home/categoryList')
    home 一定一定写，坑了半天








10、
state中数据默认初始值不能乱写，服务器返回的是对象就写对象，是数组就写数组