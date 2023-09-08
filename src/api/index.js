// 当前这个模块。对API进行统一管理
// 引入二次封装的axios（带有请求、响应拦截器）
import requests from './request.js';
import mockRequests from './mockAjax.js'

// 三级菜单的请求地址 /api/product/getBaseCategoryList   get请求  无参数
//  对外暴露一个函数、只要外部调用这个函数，就像服务器发起ajax请求，获取咱们的三级菜单数据，当前咱们这个函数只需要把服务器返回结果返回即可


export const reqCategoryList = () =>  {
    return requests({url:'/product/getBaseCategoryList',method: 'get'})
}
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')