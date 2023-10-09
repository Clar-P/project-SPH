// 当前这个模块。对API进行统一管理
// 引入二次封装的axios（带有请求、响应拦截器）
import requests from './request.js';
import mockRequests from './mockAjax.js'
//

// 三级菜单的请求地址 /api/product/getBaseCategoryList   get请求  无参数
//  对外暴露一个函数、只要外部调用这个函数，就像服务器发起ajax请求，获取咱们的三级菜单数据，当前咱们这个函数只需要把服务器返回结果返回即可


export const reqCategoryList = () =>  {
    return requests({url:'/product/getBaseCategoryList',method: 'get'})
}
// 切记：当前函数执行需要把服务器返回结果返回

// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据 地址： /api/list  请求方式 ：post  请求需要带参数
// 当前这个函数需不需要接收外部传递的参数
// 当前这个接口（获取搜索模块额数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({url:'list',method:"post",data:params})


// 获取商品详情信息的接口 URL: /api/item/{skuId}  get请求
export const reqGoodsInfo = (skuId) => {
    return requests({
        url:`/item/${skuId}`,
        method:'get',
    })
}

// 将产品添加到购物车中（或者更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'post'
    })
}

// 获取个人购物车列表
export const reqCartList = () => {
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}


// 删除个人购物车的接口
export const reqDeleteCartById = (skuId) =>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}


// 切换商品选中装态的接口
export const reqUpdateCheckedById = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}