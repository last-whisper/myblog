<template>
    <div id='editor-question'>
        <input class='title' type="text" v-model="title" placeholder="请输入提问标题" v-autofocus>
        <ckeditor :editor='editor' v-model='editorData' :config='editorConfig' ></ckeditor>
        <button class='send' @click="send">提交</button>   
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import {State,Mutation} from 'vuex-class'
import {Component,Prop,Emit,Watch} from 'vue-property-decorator'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import config from '../../assets/ts/config'
@Component({
    components:{
    }
})
export default class EditorQuestion extends Vue {
    title:string = ''
    editor:any = ClassicEditor
    editorData:any = '<p>请输入...</p>'
    editorConfig:any = {
        
        language:'zh-cn',
        toolbar:['bold','code'],
        heading:{
            options:[
                {
                    model:'heading1',
                    view:'h1',
                    title:'+步骤阅读标题',
                    class:'step'
                }
            ]
        },
        ckfinder: {
            uploadUrl: config.host+'upload',

            options: {
                resourceType: 'Images'
            }
        }
    }

    @Emit()
    show(){
        
    }

    @Emit()
    send(){
console.log(this.editorData)
    }

   
}
</script>       
<style scoped lang='stylus'>
    .send
        background #009a61 
        color #ffffff
        line-height 34px
        width 120px
        margin 20px 0
        float right
        &:hover
            background #008151

        
    #editor-question input.title
        background #fff
        width 100%
        display block
        border-radius 5px
        border 1px solid #cccccc
        font-size 20px
        text-indent 18px
        color #ccc
        line-height 40px
        margin-bottom 20px
</style>   