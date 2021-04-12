import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import store from './store'

import StoreList from './components/page/StoreList'

const routes = [
	{
		path: '/danh-muc/cua-hang',
		component: StoreList
	}
]

const router = new VueRouter({
	routes
});

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
