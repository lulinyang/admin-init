import http from '@/http/server/api'
import VueCookies from 'vue-cookies'
import config from '@/config/index'
const user = {
	state: {
		username: VueCookies.get('username'),
		city_id: VueCookies.get('city_id'),
		password: VueCookies.get('password'),
		user_id: VueCookies.get('user_id'),
		level: VueCookies.get('level'),
	},
	mutations: {
		setName: (state, username) => {
			state.username = username;
			// config.cookieExpires
			VueCookies.set('username', username, 60 * 60 * 24 * config.cookieExpires);
		},
		setPassword: (state, password) => {
			state.password = password;
			VueCookies.set('password', password, 60 * 60 * 24 * config.cookieExpires);
		},
		setCityId: (state, city_id) => {
			state.city_id = city_id;
			VueCookies.set('city_id', city_id, 60 * 60 * 24 * config.cookieExpires);
		},
		setUserId: (state, user_id) => {
			state.user_id = user_id;
			VueCookies.set('user_id', user_id, 60 * 60 * 24 * config.cookieExpires);
		},
		setLevel: (state, level) => {
			state.level = level;
			VueCookies.set('level', level, 60 * 60 * 24 * config.cookieExpires);
		}
	},

	actions: {
		//登录
		login({ commit }, param) {
			return new Promise((resolve, reject) => {
					commit('setName', 'admin');
					// commit('setPassword', param.password);
					commit('setCityId', '1');
					commit('setUserId', '1');
					commit('setLevel', '1');
					resolve(param);
			});
		}
	}
}

export default user