<template>
    <div id='editor-blog'>
        <ckeditor :editor='editor' :editorData='editorData'></ckeditor>    
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
    components:{
    }
})
export default class EditorBlog extends Vue {
    editor:any = ClassicEditor
    editorData:any = '<p>请输入博客正文</p>'
  

   
}
</script>       
<style scoped lang='stylus'>

</style>   