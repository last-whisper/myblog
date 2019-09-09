<template>
    <div class="container">
        <side-bar></side-bar>
        <div class="center-block">
            <main-banner></main-banner>
            <main-aticle :category='category'></main-aticle>
            
        </div>  
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'
import SideBar from '../index/SideBar.vue'
import MainBanner from '../index/banner.vue'
import MainAticle from '../index/MainAticle.vue'

@Component({
    components:{
        SideBar,
        MainBanner,
        MainAticle
    }
})
export default class HomePage extends Vue {
    @Prop({
        type: String,
        default: ''
    }) 
    category: string | undefined

   
}
</script>       
<style scoped lang='stylus'>
    .container 
        width 1200px
        margin 30px auto
        display flex
    .center-block
        padding 0 30px
        width 760px
        height 500px
</style>   