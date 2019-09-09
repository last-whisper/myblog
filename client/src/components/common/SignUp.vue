<template>
    <div id="sign-in-mask" v-if="signUpBox">
       <div class="sign-in-box">
            <div class="box-title"><span>注册</span><i @click="toggleSignUpBox" class="el-icon-close"></i></div>
            <div class="box-body">
                <p>你的账号</p>
                <input @input="checkUsername" type="text" v-model.trim="signUpInput.username" placeholder="不能超过12位">
                <span :class='{err:!check.username}' class="tip">{{tip.username}}</span>
                <p>你的昵称</p>
                <input @input="checkNickname" type="text" v-model.trim="signUpInput.nickname" placeholder="不能超过12位">
                <span :class='{err:!check.nickname}' class="tip">{{tip.nickname}}</span>

                <p>设置密码</p>
                <input type="password" v-model.trim="signUpInput.password" placeholder="不能超过12位">
                <span :class='{err:!check.password}' class="tip">{{tip.password}}</span>

                <p>确认密码</p>
                <input type="password" v-model.trim="signUpInput.confirmPassword" placeholder="请再次输入密码">
                <span :class='{err:!check.confirmPassword}' class="tip">{{tip.confirmPassword}}</span>

                <button :class='{disabled:!couldSend}' :disabled='!couldSend' @click="signUp" class="sign-in">提交</button>
                <button @click="tabToSignIn" class="sign-up">已有账号直接登陆</button>
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
import api from '../../assets/ts/api'
import { Checkbox } from 'element-ui';
interface SignUpInput{
     nickname:string;
     username:string;
     password:string;
     confirmPassword:string;
}

interface Check{
    username:boolean;
    nickname:boolean;
    password:boolean;
    confirmPassword:boolean;
}

interface Tip{
    nickname:string;
    username:string;
    password:string;
    confirmPassword:string;
}

@Component
export default class SignUp extends Vue {
    signUpInput:SignUpInput = {
        nickname:'',
        username:'',
        password:'',
        confirmPassword:''
    }
    check:Check = {
        username:false,
        nickname:true,
        password:false,
        confirmPassword:false,
    }

    tip:Tip = {
        username:'用户名不能为空',
        nickname:'选填',
        password:'密码不能为空',
        confirmPassword:'两次密码输入不一致'
    }

    checkUsernameDelay:any = null
    checkNicknameDelay:any = null

    @State(state=>state.signUpBox.isOpen) signUpBox
    @State('isLogin') isLogin

    @Mutation('toggleSignUpBox') toggleSignUpBox
    @Mutation('toggleSignInBox') toggleSignInBox
    @Mutation('toggleLoginInfo') toggleLoginInfo
    @Mutation('saveUserInfo') saveUserInfo
    
    @Emit()
    tabToSignIn(){
        this.toggleSignUpBox()
        this.toggleSignInBox()
    }
    @Emit()
    signUp(){ 
        request.post(api.REGISTER,{
            username:this.signUpInput.username,
            nickname:this.signUpInput.nickname,
            password:this.signUpInput.password,
        })
        .then(({data})=>{
            if(data.code === 0){
                this.$message.success(data.message)
                //注册成功reload,使用token登陆
                localStorage.setItem('authorization',data.authorization)
                localStorage.setItem('userId',data.data._id)
                window.location.reload()
                
            }else{
                this.$message.warning(data.message || '注册失败')
            }
        })
        .catch(err=>{
            this.$message.error(err || '注册失败')
        })
    }
    @Emit()
    checkUsername(){
        clearTimeout(this.checkUsernameDelay)
        if(!this.signUpInput.username) return
        this.checkUsernameDelay = setTimeout(()=>{
            request.get(api.CHECKUSERNAME + '?username=' + this.signUpInput.username)
            .then(({data})=>{
                this.tip.username = data.message
                if(data.code === 0){
                    this.check.username = true
                }else{
                    this.check.username = false
                }
            })
            .catch(err=>{
                this.$message.error(err)
            })
        },500)
    }
    @Emit()
    checkNickname(){
        clearTimeout(this.checkNicknameDelay)
        this.checkNicknameDelay = setTimeout(()=>{
            if(!this.signUpInput.nickname) return
            request.get(api.CHECKNICKNAME + '?nickname=' + this.signUpInput.nickname)
            .then(({data})=>{
                this.tip.nickname = data.message
                if(data.code === 0){
                    this.check.nickname = true
                }else{
                    this.check.nickname = false
                }
            })
            .catch(err=>{
                this.$message.error(err)
            })
        },500)
    }

    get couldSend(){
        if(this.check.username && this.check.nickname && this.check.password && this.check.confirmPassword){
            return true
        }
        return false
    }

    //表单校验
    @Watch('signUpInput.username')
    watchUsername(n,o){
        if(n.trim() && n.length <= 12){
            this.check.username = false
            this.tip.username = '检测中...'
        }else if(!n.trim()){
            this.check.username = false
            this.tip.username = '用户名不能为空'
        }else if(n.length > 12){
            this.check.username = false
            this.tip.username = '用户名长度不能超过12位'
        }
    }

    @Watch('signUpInput.nickname')
    watchNickname(n,o){
        if(n.trim() && n.length <= 12){
            this.check.nickname = false
            this.tip.nickname = '检测中...'
        }else if(!n.trim()){
            this.check.nickname = true
            this.tip.nickname = '选填'
        }else if(n.length > 12){
            this.check.nickname = false
            this.tip.nickname = '昵称长度不能超过12位'
        }
    }

    @Watch('signUpInput.password')
    watchPassword(n,o){
        if(n.trim() && n.length <= 12){
            this.check.password = true
            this.tip.password = '设置成功'
        }else if(!n.trim()){
            this.check.password = false
            this.tip.password = '密码不能为空'
        }else if(n.length > 12){
            this.check.password = false
            this.tip.password = '密码长度不能超过12位'
        }
        if(n !== this.signUpInput.confirmPassword){
            this.check.confirmPassword = false
            this.tip.confirmPassword = '两次密码输入不一致'
        }else if(n === this.signUpInput.confirmPassword){
            this.check.confirmPassword = true
            this.tip.confirmPassword = '校验成功'
        }
    }

    @Watch('signUpInput.confirmPassword')
    watchConfirmPassword(n,o){
        if(!n.trim() || n !== this.signUpInput.password){
            this.check.confirmPassword = false
            this.tip.confirmPassword = '两次密码输入不一致'
        }else if(n === this.signUpInput.confirmPassword){
            this.check.confirmPassword = true
            this.tip.confirmPassword = '校验成功'
        }
    }

    
    
}
</script> 
<style scoped lang='stylus'>
button.disabled.sign-in
    background #ccc
    cursor not-allowed
    &:hover
        background #ccc

.tip
    font-size 12px
    text-align left
    margin-top 5px
    color #ccc
    &.err
        color pink
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