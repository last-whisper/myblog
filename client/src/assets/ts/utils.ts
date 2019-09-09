import request from '../../axios/index'
import api from './api'
interface LoginInfo{
    username:string;
    password?:string;
}

interface Config {
    headers:any
}



//token认证登陆
export function tokenAuthorization(_id:string = '',config:Config){
    return request.get(api.TOKENAUTHORIZATON + '?_id=' + _id,config)
}

//登陆请求
export function login(data:LoginInfo,config?:Config){
    return request.post(api.LOGIN,data,config)
}