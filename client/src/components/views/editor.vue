<template>
    <div id='editor'>
        <div class="editor-content">
            <router-view/>  
        </div>
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'
@Component({
    components:{
    }
})
export default class EditorPage extends Vue {
    created(){
        document.body.style.background = '#f3f3f3'
    }
    destroyed(){
        document.body.style.background = '#fff'
    }
}
</script>       
<style scoped lang='stylus'>
    #editor 
        .editor-content
            width 1200px
            padding 50px 0
            margin auto
</style>   