import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
export default {
    namespaced: true,
    state: {
        cartList: [],
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    },
    actions: {
        async getCartList(context) {
            let result = await reqCartList()
            console.log(result);
            if (result.code == 200) {
                context.commit('GETCARTLIST', result.data)
            }
        },
        // 删除购物车某一个产品
        async deleteCartListBySkuId(context, skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.rejected(new Error('faile'))
            }
        },
        //修改购物车某一个产品的选中状态
        async updateCheckedById(context, { skuId, isChecked }) {
            let result = await reqUpdateCheckedById(skuId, isChecked)
            if (result.code = 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除全部选中的产品
        deleteAllCheckedCart(context) {
            // context:小仓库上下文，commit[提交mutations修改state]，getters[计算属性],dispatch[派发action],state[当前仓库数据]
            // console.log(context.getters.cartList.cartInfoList);\
            // 获取购物车中全部的产品(是一个数组)
            let PromiseAll = []
            context.getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? context.dispatch('deleteCartListBySkuId', item.skuId) : ''
                // 将每一次放回的promise 添加到数组当中
                PromiseAll.push(promise)
            })
            // 只要P1|P2....都成功，返回结果即为成功
            // 如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll)

        },
        //全选按钮选中状态
        checkAllOrNo(context, isChecked) {
            let PromiseAll = []
            context.getters.cartList.cartInfoList.forEach(item => {
                let promise = context.dispatch('updateCheckedById', { 
                    skuId: item.skuId, 
                    isChecked 
                })
                PromiseAll.push(promise)
            })
            
            // 最终返回结果
            return Promise.all(PromiseAll)
        }
    },
    mutations: {
        GETCARTLIST(state, data) {
            state.cartList = data
        }
    }
}