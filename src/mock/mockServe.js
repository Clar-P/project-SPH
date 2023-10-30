// 先引入mockjs模块,Mock是一个对象
import Mock from 'mockjs'
// 把JSON数据格式引入进来【JSON数据格式根本没有对外暴露，但是可以引入】
// webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
import trade from './tradeInfo.json'
import useraddress from './userAddressList.json'
import payorder from './payOrder.json'
import myorder from './myOrder.json'

// mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
Mock.mock("/mock/trade",{code:200,data:trade})
Mock.mock("/mock/useraddress",{code:200,data:useraddress})
//格式： Mock.mock( url, 'post'/'get' , 返回的数据)  可以在返回的数据处写成函数，面对不同的情况返回不同的数据
Mock.mock('/mock/payment/weixin/createNative/orderId',payorder)
Mock.mock('/mock/myorder',myorder)