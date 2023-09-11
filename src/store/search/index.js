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
            console.log(result);
            if(result.code === 200){
                context.commit('GETSEARCHLIST',result.data)
            }
        }
    },
    // 计算属性，在项目当中，为了简化数据而生
    getters : {}
}
