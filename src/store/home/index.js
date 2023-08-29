import { reqCategoryList } from "@/api"

// home模块的小仓库
const state = {
    // state中数据默认初始值不能乱写，服务器返回的是对象就写对象，是数组就写数组
    categoryList :[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList(context){
        let result = await reqCategoryList()
        if(result.code === 200){
            context.commit("CATEGORYLIST",result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}