<template>
    <div class="search-box">
        <input type="text" v-model="keyword" placeholder="搜索问题或关键字">
        <button class="el-icon-search" @click="search"></button>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import {Prop, Component,Emit} from "vue-property-decorator"
@Component
export default class SearchBox extends Vue {
    keyword:string = ''
    @Emit()
    search(){
        console.log(this.keyword)
    }
}
</script> 
<style scoped>
.search-box{flex-grow:2.5;position:relative;}
button{height:34px;width:34px;position:absolute;right:0;top:18px;}
    input{line-height:34px;color:#555;border-radius: 4px;border:1px solid #ccc;padding:0px 12px;width:100%}
</style>   