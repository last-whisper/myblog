<template>
    <div id="userinfo">
        <div class="to-login" v-if="!isLogin">
            <button class="login" @click='toggleSignInBox'>立即登陆</button>
            <button class="register" @click="toggleSignUpBox" >立即注册</button>
        </div>
        <div class="user-box" v-else>
            <button @click="toggleList">
                <span>创建</span>
                <i class="el-icon-caret-bottom"></i>
            </button>
            <div class="user-pic" @mouseenter="toggleUserBox(true)" @mouseleave="toggleUserBox(false)">
                <img :src="globalConfig.host + userinfo.avatar" alt="">
                <div class="user-info" v-show="userInfoOnOff">
                <div class="exp">我的声望：{{userinfo.exp}}</div>
                <ul>
                    <li>我的收藏</li>
                    <li>我的主页</li>
                    <li>我的提问</li>
                    <li>我的回答</li>
                    <li>我的关注：{{userinfo.follow}}</li>
                    <li>我的粉丝：{{userinfo.fans}}</li>
                
                </ul>
                <button class="exit" @click='safeLogOut'>安全登出</button>
            </div>
            </div>
            <ul class="drop-list" v-show="listOnOff">
                <li 
                    @click="create(item)" 
                    v-for="(item,index) in listArr" 
                    :key="index"
                >
                    {{item.text}}
                </li>
            </ul>
            
        </div>
    </div>
</template>
<script lang="ts">
import globalConfig from '../../assets/ts/config'
import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit} from 'vue-property-decorator'
@Component
export default class UserInfo extends Vue {
    globalConfig = globalConfig
    listArr:any = [{
        text:'提问',
        router:{name:'editorQuestion'}
    },{
        text:'博客',
        router:{name:'editorBlog'}
    }]
    listOnOff:boolean = false
    userInfoOnOff:boolean = false
    @State('isLogin') isLogin
    @State('userinfo') userinfo
    @Mutation('toggleLoginInfo') toggleLoginInfo
    @Mutation('toggleSignInBox') toggleSignInBox
    @Mutation('toggleSignUpBox') toggleSignUpBox
    @Mutation('saveUserInfo') saveUserInfo
    @Emit()
    toggleList(b:boolean){
        if(b === undefined){
            this.listOnOff = b
        }else{
            this.listOnOff =!this.listOnOff 
        }
        
    }
    @Emit()
    create(item:any){
        this.toggleList(false)
        if(this.$route.name !== item.router.name){
            this.$router.push(item.router)
        }
    }
    @Emit()
    toggleUserBox(b:boolean){
        this.userInfoOnOff = b
    }
    @Emit()//安全登出
    safeLogOut(){
        localStorage.removeItem('authorization')
        localStorage.removeItem('userId')
        //返回首页

        //设置成未登陆
        this.toggleLoginInfo(false)
        //清除用户数据
        this.saveUserInfo()
    }
    
}
</script> 
<style scoped>
.drop-list li{cursor: pointer;}
.user-info .exit:hover{background: #008151;}
.user-info .exit{width: 90%;border:none;background: #009a61;color:#fff;}
.user-info ul{display: flex;flex-wrap: wrap;padding-top:10px;}
.user-info li{width: 50%;line-height: 36px;cursor: pointer;text-align: left;text-indent:20px;}
.exp{line-height:46px;border-bottom:1px solid #f1f1f1;text-align: left;text-indent:20px;}
.user-info{position: absolute;background: #fff;overflow: hidden;border-radius:5px;border:1px solid #ccc;width:250px;right:0;top:37px;}
.user-pic img{border-radius: 50%;width: 34px;height:34px;}
.user-pic{width: 34px;height:34px;position: relative;}
#userinfo{flex-grow: 2;display: flex;align-items: center;}
#userinfo>div{display: flex;justify-content: flex-end;width:100%;}
.user-box{display: flex;justify-content: space-between;height: 70px;align-items: center;position: relative;}
.drop-list{overflow:hidden;background: #fff;border-radius:5px;border:1px solid #ccc;width:105px;position: absolute;right:49px;top:57px;z-index:100000;}
.drop-list li{line-height:36px;cursor: pointer;}
.drop-list li:hover{background: #f2f2f2}
.user-box button{width:105px;line-height:34px;border-radius:4px;border:1px solid #ccc;text-align: center;margin:0 15px;}
.user-box button.register{margin-right:0;}
.user-box button:hover{background:#e6e6e6;}
.to-login button{border-radius: 5px;width: 100px;height: 34px;margin: 0 10px}
 #userinfo{line-height:70px;}
 .login{color:#009a61;}
 .login:hover{background: #f5f5f5}
 .register{color:#fff;background: #009a61}
 .register:hover{background: #008151}
</style>   