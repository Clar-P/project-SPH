import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"

// home模块的小仓库

export default {
    namespaced:true,
    state : {
        // home仓库中存储三级菜单的数据
        // state中数据默认初始值不能乱写，服务器返回的是对象就写对象，是数组就写数组
        categoryList :[],
        // 轮播图的数据
        bannerList:[],
        // floor组件的数据
        floorList:[]

    },
    actions : {
        // 通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
        // action 用户处理派发action的地方，可以书写异步语句、自己逻辑的地方
        async categoryList(context){
            let result = await reqCategoryList()
            if(result.code === 200){
                context.commit("CATEGORYLIST",result.data)
            }
        },

        // 获取首页轮播图的地方
        async getBannerList(context){
            let result =  await reqGetBannerList()
            if(result.code === 200){
                context.commit('GETBANNERLIST',result.data)
            }
        },

        // 获取floor数据
        async getFloorList(context){
            let result = await reqFloorList()
            if(result.code === 200){
                context.commit('GETFLOORLIST',result.data)
            }
        }
    },
    // mutations是唯一修改states的地方
    mutations : {
        CATEGORYLIST(state,categoryList){
            state.categoryList = categoryList
        },
        GETBANNERLIST(state,bannerList){
            state.bannerList = bannerList
        },
        GETFLOORLIST(state,floorList){
            state.floorList = floorList
        }
    },
    // 计算属性
    getters : {}

}