// interApi.js
import axios from 'axios'
import businessServer from "@/config/business_server";
import VueCookies from 'vue-cookies'
import { Message } from 'element-ui'
import router from '../../router/index';

// 配置 axios，并生成实例
const creatAxios = axios.create({
  baseURL: businessServer.baseUrl,
  withCredentials: true
})

// 拦截器配置
creatAxios.interceptors.request.use(configData => { // 请求拦截 在发送请求之前做些什么
  configData.withCredentials = false;
  if(configData.method=='post'){
    configData.data = {
      ...configData.data,
      city_id: VueCookies.get('city_id'),
      user_id: VueCookies.get('user_id'),
      level:  VueCookies.get('level')
    }
  }
  return configData
}, error => { // 请求失败做的事情
  return Promise.reject(error)
})

creatAxios.interceptors.response.use(response => { // 响应拦截 对响应数据做点什么
  // endLoading();
  // if(response.data.stateCode !== 200) {
  //   Message.error(response.data.stateMsg);
  //   return response;
  // }
  return response
}, error => { 
  switch (error.response.status) {
    case 500:
      Message.error('服务器内部错误，请联系开发人员！');
      break;
    case 403: 
      Message.error('服务器理解请求客户端的请求，但是拒绝执行此请求！');
      break;
    case 405:
      Message.error('客户端请求中的方法被禁止，请联系开发人员！');
      break;
    case 401:
      VueCookies.remove("city_id");
      VueCookies.remove("user_id");
      VueCookies.remove("username");
      VueCookies.remove("level");
      router.push('/login');
      break;
      case 408: 
      Message.error('请求超时！');
      break;
  }

  return Promise.reject(error.response);
})

function sendAll(arr) { 
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return axios.all(arr).then(axios.spread(function (...res) {
      // 请求全部都执行完成
      return Promise.resolve(res)
    }))
  } else {
    const error = new Error('参数错误！')
    try {
      throw error
    } catch (e) {
      // console.log(e)
    }
  }
}

export default {
  creatAxios,
  sendAll
}