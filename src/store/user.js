import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {getToken,setToken,removeToken} from '@/utils/token'

export default {
    namespaced:true,
    state:{
        code:'',
        token:getToken(),
        userInfo:{}
    },
    actions:{
        // 获取验证码
        async getCode(context, phone){
            // 获取验证码的这个接口，把验证码返回，但是正常情况下，后台把验证码发到用户手机上【为了省钱就假装返回一个验证码】

            let  result  = await reqGetCode(phone)
            if(result.code == 200){
                context.commit('GETCODE',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
        async userRegister(context,user){
            let result = await reqUserRegister(user)
            if(result.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // 登录业务(token)
        async userLogin(context,data){
            let result = await reqUserLogin(data)
            // 服务器下发token,用户唯一标识符（uuid）
            // 将来经常通过带token找服务器要用户信息进行展示
            if(result.code == 200){
                // 用户已经登录成功且获取到token
                context.commit('USERLOGIN',result.data.token);
                // 持久化存储token
                // localStorage.setItem('TOKEN',result.data.token)
                setToken(result.data.token)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },
        // token校验用户登录信息
        async getUserInfo(context){
            let result =  await reqUserInfo()
            // console.log(result);
            // 提交用户信息
            if(result.code == 200){
                context.commit('GETUSERINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        },

        // 退出登录
        async userLogout(context){
            // 只是向服务器发起一次请求，通知服务器清除token
            let result = await reqLogout()
            if(result.code == 200){
                context.commit('CLEAR')
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code = code
        },
        USERLOGIN(state,token){
            state.token = token
        },
        GETUSERINFO(state,data){
            state.userInfo = data
        },
        // 清除本地数据
        CLEAR(state){
            // 帮仓库中的相关用户信息清空
            state.token = ''
            state.userInfo = {}
            // 本地存储清空
            removeToken()
        }
    },
    getters:{}

}