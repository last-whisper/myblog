<template>
    <div id="sign-in-mask" v-if="signInBox">
       <div class="sign-in-box">
            <div class="box-title"><span>登陆</span><i @click="toggleSignInBox" class="el-icon-close"></i></div>
            <div class="box-body">
                <p>手机号</p>
                <input type="text" v-model="signInInput.username" placeholder="11位手机号">
                <p>密码</p>
                <input type="password" v-model="signInInput.password" placeholder="请输入密码">
                <button @click="login" class="sign-in">登陆</button>
                <button @click="tabToSignUp" class="sign-up">注册新账号</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import request from '../../axios/index'
import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'
import {login} from '../../assets/ts/utils'
interface SignInInput{
     username:string;
     password:string;   
}
@Component
export default class SignIn extends Vue {

    @State(state=>state.signInBox.isOpen) signInBox
    @State('isLogin') isLogin
    @Mutation('toggleSignInBox') toggleSignInBox
    @Mutation('toggleSignUpBox') toggleSignUpBox
    @Mutation('toggleLoginInfo') toggleLoginInfo
    @Mutation('saveUserInfo') saveUserInfo
    signInInput:SignInInput = {
       username:'' ,
       password:''
    }

    @Emit()
    login(){
        login(this.signInInput).then(({data})=>{
            //登陆成功保存token和用户ID
            if(data.code === 0){
                localStorage.setItem('authorization',data.authorization)
                localStorage.setItem('userId',data.data._id)
                //保存用户数据
                this.toggleLoginInfo(true)
                this.saveUserInfo(data.data)
                //关闭登陆框
                this.toggleSignInBox()
            }else{
                this.$message.info(data.message || '登陆失败')
            }
            

        })
        .catch(err=>{
            console.log(err)
        })
    }
    @Emit()
    tabToSignUp(){
        this.toggleSignInBox()
        this.toggleSignUpBox()
    }
    @Watch('isLogin')//如果登出清除登陆框数据
    clearInputsValue(val,oldVal){
        if(oldVal && !val){
            this.signInInput = {
                username:'' ,
                password:''
            }
        }
    }
}
</script> 
<style scoped>
i.el-icon-close{color:#ccc;font-weight: bold;font-size: 14px;cursor: pointer;}
i.el-icon-close:hover{color:#a7a7a7;}
    #sign-in-mask{
        position:absolute;
        width:100%;
        top:0;
        left:0;
        height:100vh;
        background: rgba(0,0,0,.4);
        z-index:100;
    }
    .sign-in-box{
        width: 600px;background:#fff;
        margin:200px auto 0;
        border-radius:6px;
        overflow:hidden;

    }
    .box-title{
        font-size:18px;
        background: #f3f3f3;
        padding: 15px;
        border-bottom:1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .box-body{
        padding:20px 125px 40px;
        display: flex;
        flex-direction: column
    }
    .box-body p{flex-grow: 1;text-align:left;font-weight: bold;font-size:14px;}
    input{
        
        height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42858;
    color: #555;
    background-color: #fff;
   
    border: 1px solid #ccc;
    border-radius: 4px;
    }
    button{flex-grow:1;border-radius:4px;line-height:34px;line-height: 1.42858;padding:10px 0;}
    button.sign-in{
        margin:40px 0 15px;
        color:#fff;
        background: rgb(0, 154, 97)
    }
    button.sign-in:hover{
        background: #006741
    }
    button.sign-up{border:1px solid #ccc}
    button.sign-up:hover{background: #ccc;}
</style>   