import {State,UserInfo,defaultUserInfo} from './state'

export default {
    //切换登陆状态
    toggleLoginInfo(state:State,r:boolean){
        state.isLogin = r
    },
    //切换登陆框显示状态
    toggleSignInBox(state:State){
        state.signInBox.isOpen = !state.signInBox.isOpen
    },
    //切换注册框显示状态
    toggleSignUpBox(state:State){
        state.signUpBox.isOpen = !state.signUpBox.isOpen
    },
    //保存用户基本信息
    saveUserInfo(state:State,userinfo:UserInfo = defaultUserInfo){
        state.userinfo = userinfo
    }
}
