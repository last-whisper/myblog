export interface State{
    isLogin:boolean;   
    globalColor:string;
    signInBox:SignInBox;
    signUpBox:SignUpBox;
    userinfo:UserInfo;
}

export interface SignInBox{
    isOpen:boolean;
}

export interface SignUpBox{
    isOpen:boolean;
}

export interface UserInfo{
    _id:string;
    username:string;
    nickname:string;
    github:string;
    location:string;
    follow:number;
    fans:number;
    exp:number;
    avatar:string;
}

export let defaultUserInfo = {
    _id:'',
    username:'',
    nickname:'',
    github:'',
    location:'',
    follow:0,
    fans:0,
    exp:0,
    avatar:'',
}

const state:State = {
    isLogin:false,//是否登陆    
    globalColor:'#009a61',//主题色
    signInBox:{//登陆框参数
        isOpen:false,//是否打开
    },
    signUpBox:{
        isOpen:false,//是否打开
    },
    userinfo:{
        _id:'',
        username:'',
        nickname:'',
        github:'',
        location:'',
        follow:0,
        fans:0,
        exp:0,
        avatar:'',
    }
}

export default state