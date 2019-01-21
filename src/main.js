import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


// import Vue2OrgTree from 'vue2-org-tree'


Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(Vue2OrgTree)

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
