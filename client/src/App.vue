<template>
  <div id="app">
    <main-nav/>
    <router-view/>
    <SignIn/>
    <SignUp/>
    <input type="file" multiple name="avater" @change="showfiles($event)">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainNav from './components/common/MainNav.vue'
import Component from 'vue-class-component'
import {Emit} from 'vue-property-decorator'
import {State,Mutation} from 'vuex-class'
import request from './axios/index'
import SignIn from './components/common/SignIn.vue'
import SignUp from './components/common/SignUp.vue'

import {login,tokenAuthorization} from './assets/ts/utils'
@Component({
  components:{
    MainNav,
    SignIn,
    SignUp
  }
})
export default class App extends Vue{
  formData:any = new FormData()
  authorization:string | null = ''
  userId:string | null = ''
  @State('authoration') authoration
 
  @Emit()
  showfiles(e){
    Array.from(e.target.files).forEach((item,index) => {
      this.formData.append('avatar'+index,item)
    });
    console.log(this.formData.getAll('avatar'))
    request.post('upload',this.formData).then(()=>{}).catch(e=>console.log(e))
  }
  created() {
    console.log(this.$route)
  }
}
</script>

<style>
  ul{list-style: none;}
  *{box-sizing: border-box}
  html,body,ul,li,input,button{margin:0;padding:0}
  a{color:#666;text-decoration: none;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;  
  }
  img{vertical-align: top}
  input,button{
      outline: none;
      border:none;
      background:none
    }
  button{cursor: pointer;border-radius:4px}
  input::-webkit-input-placeholder{
    color:#ccc;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#ccc;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#ccc;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color:#ccc;
  }
</style>
