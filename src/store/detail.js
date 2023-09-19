import {reqGoodsInfo} from '@/api'

export default {
    namespaced:true,
    state : {
        goodInfo:{}
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
            
        }
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo = goodInfo
        }
    }
}