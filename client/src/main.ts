import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import ElementUI from 'element-ui'
import router from './router/index'
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn.js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.directive('autofocus', {
  inserted: function(el, binding) {
      el.focus()
      el.style.borderColor = '#3b99fc'
      el.style.boxShadow = '0 0 3px 0px #3b99fc'
  }
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use( CKEditor )
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
