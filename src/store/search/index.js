import { reqGetSearchInfo } from "@/api"

// search模块的小仓库
export default {
    namespaced:true,
    state : {
        searchList:{}
    },
    mutations : {
        GETSEARCHLIST(state,searchList){
            state.searchList = searchList
        }
    },
    actions : {
        //获取search模块的数据
        async getSearchList(context,params = {}){
            // 当前这个reqGetSearchInfo函数在调用获取服务器数据的时候，至少传递一个参数（空数组）
            // 由文档决定的要有一个对象作为参数，但是里面的键值对都不是必须的，即可以为空对象
            // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
            let result = await reqGetSearchInfo(params)
            if(result.code === 200){
                context.commit('GETSEARCHLIST',result.data)
            }
        }
    },
    // 计算属性，在项目当中，为了简化数据而生
    // 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
    getters : {
        // 当前形参state,当前仓库中的state，并非大仓库中的state
        goodsList(state){
            // 可能请求返回的数据来得慢，则state是一个空对象，.searchList.goodsList 返回的是undefined，在组件中遍历就会报错
            // 没有数据则返回一个空数组给组件遍历即可,因为要是拿到数据了，计算后的数据也都是数组
            return state.searchList.goodsList || []
        },
        trademarkList(state){
            return state.searchList.trademarkList || []
        },
        attrsList(state){
            return state.searchList.attrsList || []
        },
        total(state){
            return state.searchList.total 
        }


    }
}
