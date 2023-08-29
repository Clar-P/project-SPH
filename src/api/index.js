// 当前这个模块。对API进行统一管理
import requests from './request.js'

// 三级联动接口
//      /api/product/getBaseCategoryList   get请求  无参数

export const reqCategoryList = () =>  {
    return requests({url:'/product/getBaseCategoryList',method: 'get'})
}