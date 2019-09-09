<template>
    <div class="index-side-bar">
        <div class="main-select">
            <ul>
                <router-link tag="li" v-for='(item,index) in mainSelectData' :key=index :to='item.router'>
                    <i :class="item.icon"></i>
                    <span>{{item.text}}</span>
                </router-link>
            </ul>
        </div>
        <div class="tec-channel">
            <div class="title"><span>技术频道</span><div class="hr"></div></div>
            <ul>
                <router-link tag='li' v-for='(item,index) in selectData' :key="index" :to='item.router'>
                    <img :src="item.icon" alt="">
                    <span>{{item.text}}</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'
import iconFrontend from '../../assets/images/icon-channel-frontend.png'
import iconBackend from '../../assets/images/icon-channel-backend.png'
import iconMiniProgram from '../../assets/images/icon-channel-miniprogram.png'

@Component
export default class SideBar extends Vue {
    @State('isLogin') isLogin
    mainSelectData:any = [
        {
            icon:'el-icon-star-off',
            text:'为您推荐',
            router:{
                name:'home'
            }
        },{
            icon:'el-icon-news',
            text:'最近热门',
            router:{
                name:'home',
                params:{
                    category:'hotest'
                }
            },
        },
        {
            icon:'el-icon-time',
            text:'最新内容',
            router:{
                name:'home',
                params:{
                    category:'newest'
                }
            },
        }
    ]

    selectData:any = [
        {
            icon:iconFrontend,
            text:'前端',
            router:{
                name:'channel',
                params:{
                    category:'frontend'
                }
            }
        },
        {
            icon:iconBackend,
            text:'后端',
            router:{
                name:'channel',
                params:{
                    category:'backend'
                }
            }
        },
        {
            icon:iconMiniProgram,
            text:'小程序',
            router:{
                name:'channel',
                params:{
                    category:'miniprogram'
                }
            }
        }
    ]

    @Watch('isLogin',{immediate:true})
    toggleMainSelectData(n,o){
        if(!n){
            Vue.set(this.mainSelectData,0,{
                icon:'el-icon-star-off',
                text:'为您推荐',
                router:{
                name:'home'
            }
            })
        }else{
            Vue.set(this.mainSelectData,0,{
                icon:'el-icon-bell',
                text:'我的订阅',
                router:{
                name:'home'
            }
            })
        }
    }
    
}
</script> 
<style scoped lang='stylus'>
    .tec-channel
        .title
            font-size 14px
            text-indent 10px
            margin 15px 0
            display flex
            justify-content space-between
            align-items center
            .hr
                border-bottom 1px solid #eee
                width 97px
        img 
            width 16px
            height 16px
            margin-right 10px
        li  
            padding-left 10px
            color #757575
            display flex
            justify-content flex-start  
            align-items center
            margin-bottom 2px
            height 34px

    .index-side-bar 
        width 170px
        background #fff
        font-size 14px
        li
            cursor pointer
            &:hover
                background rgba(0,154,97,0.08)
        li.router-link-exact-active
            background #009A61 
            border-radius 4px
            color #fff
            &:hover
                background #009A61
        .main-select li
            padding-left 10px
            display flex
            justify-content flex-start  
            align-items center
            margin-bottom 2px
            height 34px
            i 
                margin-right 10px
                padding 0 1px

</style>   