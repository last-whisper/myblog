<template>
    <div class="main-banner">
        <el-carousel height="150px">
            <el-carousel-item v-for="(item,index) in bannerData" :key="index">
                <img :src="item.src" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'
import bannerOne from '../../assets/images/banner-1.png'
import bannerTwo from '../../assets/images/banner-2.png'

@Component
export default class MainBanner extends Vue {
    bannerData:any = [
        {
            src:bannerOne
        },
        {
            src:bannerTwo
        }
    ]

    
    
}
</script> 
<style scoped lang='stylus'>
    img
        width 750px
        height 150px
</style>   