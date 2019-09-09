<template>
    <div id="nav">
        <div class="nav">
            <div class="logo">
                <router-link :to="{name:'home'}">
                    <img src="@/assets/images/logo.png" alt="">
                </router-link> 
            </div>
            <div class="menu">
                <ul>
                    <li><a href="">首页</a></li>
                    <li><a href="">问答</a></li>
                </ul>
            </div>
            <SearchBox/>
            <UserInfo/>
        </div>
        
    </div>
</template>
<script lang="ts">
import Vue from "vue"


import SearchBox from '@/components/common/SearchBox.vue'
import UserInfo from '@/components/common/UserInfo.vue'
import {Component,Prop} from 'vue-property-decorator'
@Component({
    components:{
        SearchBox,
        UserInfo
    }
})
export default class MainNav extends Vue {
    
}
</script> 
<style scoped>
.menu{flex-grow:3.5}
    .logo{margin-right:30px;flex-grow:1.5}
    ul{display: flex;font-size:16px;}
    li a{padding:0 10px;}
    #nav img{height:66px;}
    #nav{height:70px;line-height:70px;border-top: 3px solid #009a61;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    background: #fafafa;}
    .nav{width:1200px;margin:auto;display: flex;}
</style>   