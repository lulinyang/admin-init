import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/',
			component: resolve => require(['@/components/common/Home.vue'], resolve),
			meta: { title: '系统首页' },
			children: [
				{
					path: '/home',
					component: resolve => require(['@/view/home.vue'], resolve),
					meta: { title: '系统首页' }
				},
				//404
				{
					path: '/404',
					component: resolve => require(['@/view/404.vue'], resolve),
					meta: { title: '404' }
				},
				{
					path: '/403',
					component: resolve => require(['@/view/403.vue'], resolve),
					meta: { title: '403' }
				}
			]
		},
		{
			path: '/login',
			component: resolve => require(['@/view/login.vue'], resolve)
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
})
