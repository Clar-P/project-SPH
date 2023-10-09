import {reqGoodsInfo} from '@/api'
import {reqAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid --> 生成一个随机字符串(不能再变)
import {getUUID} from '@/utils/uuid_token.js'

export default {
    namespaced:true,
    state : {
        goodInfo:{},
        // 游客临时身份
        uuid_token:getUUID()
    },
    getters:{
        // 路径导航简化的数据
        categoryView(state){
            // 比如：一开始的时候state.goodInfo初始状态为空对象，空对象的categoryView属性值为undefined，
            // 会报一个错误，但是当数据返回来以后又会重新解析显示，虽然不会影响程序，但报错，加一个{}
            // 当前计算出的categoryView属性值至少是一个空对象，假的报错就不会有了
            return state.goodInfo.categoryView || {}
        },
        // 简化产品信息的数据
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        // 产品售卖属性的简化
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        }
    },
    actions:{
        // 获取产品信息的action
        async getGoodInfo(context,skuId){
            let GoodsInfo = await reqGoodsInfo(skuId)
            if(GoodsInfo.code == 200){
                context.commit('GETGOODINFO',GoodsInfo.data)
            }
        },
        // 将产品添加到购物车中
        async addOrUpdateShopCart(context,{skuId,skuNum}){
            // 加入购物车返回的解构
            // 加入购物车以后（发请求），前台将参数带回给服务器
            // 服务器写入数据成功，并没有返回其他的数据，只是返回 code = 200，代表这次操作成功
            // 因为服务器没有返回其余数据，因此咱们不需要三连环存储数据
            // 注意：async 函数执行返回的结果一定是一个promise，要么成功，要么失败
            let result = await reqAddOrUpdateShopCart(skuId,skuNum)
            // 代表服务器加入
            if(result.code == 200){
                return 'ok'
            }else{
                // 代表加入购物车失败
                return Promise.reject(new Error('faile'))
            }
            
        }
        
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo = goodInfo
        }
    }
}