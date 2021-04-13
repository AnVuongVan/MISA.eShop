import Vuex from 'vuex'
import Vue from 'vue'
import stores from './modules/stores'
import groups from './modules/groups'

//load vuex
Vue.use(Vuex)

//create store
export default new Vuex.Store({
    modules: {
        stores,
        groups
    }
})