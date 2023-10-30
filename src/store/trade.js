import {reqAddressInfo,reqOrderInfo} from '@/api'

export default {
    namespaced:true,
    state : {
        userAddress:[],
        orderInfo:[]
    },
    getters:{
        
    },
    actions:{
        // 获取用户地址信息
        async getUserAddress(context){
            let result = await reqAddressInfo()
            // console.log(result);
            if (result.code == 200){
                context.commit('GETUSERADDRESS',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取商品清单数据
        async getOrderInfo(context){
           let result =  await reqOrderInfo()
           if(result.code){
                context.commit('GETORDERINFO',result.data)
           }
        }
    },
    mutations:{
        GETUSERADDRESS(state,data){
            state.userAddress = data
        },
        GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo
        }
    }
}