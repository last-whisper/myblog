<template>
    <div class="main-aticle">
        <div class="top">
            <div class="title">
                {{titleContext}}
            </div>
            <ul>
                <li>
                    <div class="author">ladawfaawdaadwad</div>
                    <div class="text">
                        <div class="aticle-title">wdawgfad</div>
                        <div class="aticle-content">大娃娃大大伟大伟大达瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发瓦达瓦达瓦大过热大外国人发我达瓦达瓦大碗大碗大碗大碗的</div>
                    </div>
                    <div class="pic">
                        <img src="@/assets/images/logo.png" alt="">
                    </div>
                    <div class="info">
                        <i class="el-icon-star-on"></i> 
                        <span class='num'>x2·</span>
                        <span>赞</span>
                        <span class="date">6小时前</span>
                    </div>
                </li>
            </ul>
            <button class="more">
                点击加载更多
            </button>
        </div>
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'

@Component
export default class MainAticle extends Vue {
    @State(state => state.isLogin) isLogin
    @Prop({
        type: String,
        default: ''
    }) 
    category: string | undefined

    get titleContext(){
        if(this.category){
            switch(this.category){
                case 'hotest':return '最近热门'
                break
                case 'newest':return '最新内容'
                break
                case 'frontend':return '前端'
                break
                case 'backend':return '后端'
                break
                case 'miniprogram':return '小程序'
                break
                default:return '' 
                break
                
            }
        }else{
            if(this.isLogin){
                return '您的订阅'
            }else{
                return '为您推荐'
            }
        }
    }
   
    
    
}
</script> 
<style scoped lang='stylus'>
    button.more
        display: block;
        padding: 5px 14px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 15px;
        color #009a61
        margin 20px auto
        &:hover
            color #333
            background #e7e7e7
    .main-aticle
        text-align left
    
    .title
        text-align left 
        line-height 40px
        border-bottom 1px solid #ccc
    li  
        padding 15px 0
        flex-wrap wrap 
        display flex
        justify-content space-between
        & .text
            width 580px
            & *
                overflow hidden
                text-overflow ellipsis
        & .pic
            width 80px
            margin-top 14px
        .author 
            font-size 14px
            color #9e9e9e
        .aticle-title
            font-size 18px
            line-height 38px
        .aticle-content
            margin-bottom: 15px;
            line-height: 1.5;
            color: #888;
            font-size: 13px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            box-orient: vertical;
            display: -webkit-box;
            display: box;
        .info 
            font-size 13px
            i 
                padding: 3px;
                background: rgba(1,126,102,0.08);
                border-radius: 10px;
                margin-right: 5px;
                font-size 14px
                color #009a61
                &:hover
                    color #ffffff
                    background #009a61
        .num
            color #009a61
            letter-spacing 2px
        .date
            margin-left 30px
            color #7e7e7e
        img 
            width 80px
            height 58px
            border-radius 4px
</style>   