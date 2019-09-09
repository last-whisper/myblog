import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state,{State} from './state'
import mutations from './mutations'
export default new Vuex.Store<State>({
    state,
    mutations
})