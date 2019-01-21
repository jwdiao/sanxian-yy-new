import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const Manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const Home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const AllList = r => require.ensure([], () => r(require('@/page/allList')), 'allList');
const NoDataPage = r => require.ensure([], () => r(require('@/page/noDataPage')), 'noDataPage');
const DeletePaigong = r => require.ensure([], () => r(require('@/page/deletePaigong')), 'deletePaigong');
const FactoryCamera = r => require.ensure([], () => r(require('@/page/factoryCamera')), 'factoryCamera');

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
	{
		path: '/manage',
		component: Manage,
		name: '',
		children: [{
			path: '/',
			component: Home,
		},{
			path: '/allList',
			component: AllList,
			meta: ['用户管理', '组织架构'],
		},{
            path: '/deletepaigong',
            component: DeletePaigong,
            meta: ['用户管理', '删除派工'],
        },{
            path: '/factorycamera',
            component: FactoryCamera,
            meta: ['用户管理', '工厂摄像头列表'],
        },{
            path: '/nodatapage',
            component: NoDataPage,
            meta: ['用户管理', '空白'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
