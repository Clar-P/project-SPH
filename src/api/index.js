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

// 获取注册手机验证码的接口
export const reqGetCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 注册
// /api/user/passport/register method:post   phone code password
export const reqUserRegister = (data) => {
    return requests({
        url:'/user/passport/register',
        data,
        method:'post'
    })
}


// 登录
// /api/user/passport/login   method:post   phone password
export const reqUserLogin = (data) => {
    return requests({
        url:'/user/passport/login',
        data,
        method:'post'
    })
}

//  获取用户信息【需要带着token向服务器要用户信息，文档里不要参数，则在请求体中携带】
///user/passport/auth/getUserInfo  get
export const reqUserInfo = () =>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}


// 退出登录
// /api/user/passport/logout get
export const reqLogout = () => {
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}


// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  get
// 由于自己的账号没有地址信息数据，就自己mock一个
/* 
export const reqAddressInfo = () =>{
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
} 
*/
export const  reqAddressInfo = () => mockRequests.get('/useraddress')

// 获取用户商品清单
// /api/order/auth/trade get
// 同理自己mock一个
/* 
export const reqOrderInfo = () => {
    return requests({
        url :'/order/auth/trade',
        method:'get'
    })
} 
*/
export const reqOrderInfo = () => mockRequests.get('/trade')



// 提交订单的接口
// /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo,data) =>{
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data:data,
        method:'post'
    })
}



// 获取支付信息
// /api/payment/weixin/createNative/{orderId}  get
/* export const reqPayInfo = (orderId) => {
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}  */

// 还是接口不行自己mock,还能mock post请求的,就不能传参数了，只能假装传了用一下
export const reqPayInfo = (orderId) => {
    return mockRequests.get('/payment/weixin/createNative/orderId')
}


// /api/payment/weixin/queryPayStatus/{orderId}   get
// 查询订单支付状态
export const reqPayStatus = (orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// 获取个人中心的数据
// /api/order/auth/{page}/{limit} get
/* export const reqMyOrderList = (page,limit) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
} */
// mock 一个
export const reqMyOrderList = (page,limit) => {
    return mockRequests.get('/myorder')
}