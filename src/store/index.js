import Vue from 'vue'
import Vuex from 'vuex'
// import 'babel-polyfill'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        adminObj: {
            username: ''
        }, //管理页信息
    },
    mutations: {
        // 设置登陆信息
        loginMuta (state, item) {
            state.adminObj = item;
            sessionStorage.setItem('user', state.adminObj.username)
            sessionStorage.setItem('token', state.adminObj.token)
        },
        // 注销登陆
        logoutMuta (state) {
            state.adminObj = {};
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
        }
    },
    actions: {
        loginAction ({ commit }, item) {
            commit('loginMuta', item)
        }
    }
})
export default store;
