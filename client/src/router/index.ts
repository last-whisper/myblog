import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/views/index.vue'
import EditorPage from '@/components/views/editor.vue'
import EditorQuestion from '@/components/editor/EditorQuestion.vue'
import EditorBlog from '@/components/editor/EditorBlog.vue'
import store from '../store'
import request from '../axios'
import api from '../assets/ts/api'
Vue.use(Router)

const router = [
  {
    path: '/:category?',
    name: 'home',
    component:HomePage,
    meta: { requiresAuth: false },
    props:true
  },
  {
    path: '/channel/:category',
    name: 'channel',
    component:HomePage,
    meta: { requiresAuth: false },
    props:true
  },
  {
    path: '/editor',
    component:EditorPage,
    meta:{
      requiresAuth: true
    },
    children:[
      {
        path:'question',
        name:'editorQuestion',
        component:EditorQuestion
      },
      {
        path:'blog',
        name:'editorBlog',
        component:EditorBlog
      }
    ]
  }
]

const routers = new Router({
    mode:'history',
    routes:router,
    scrollBehavior(to,from,savedPosition){
      return savedPosition || { x: 0, y: 0 }
    },
    
})
routers.beforeEach((to,from,next)=>{
  //如果没有登陆但是本地有token则使用token免密登陆
  let token = localStorage.getItem('authorization')
  if(!store.state.isLogin && token){
    request.get(api.TOKENAUTHORIZATION,{
      headers:{
        authorization:token
      }
    })
    .then(({data})=>{
      //token登陆成功
      if(data.code === 0){
        store.commit('toggleLoginInfo',true)
        store.commit('saveUserInfo',data.data)
        next()
      }else{
        next()
        //token验证失败
      }
    })
    .catch((err)=>{
      next()
    })
  }else{
    next()
  }
})

export default routers
