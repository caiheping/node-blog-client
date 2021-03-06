import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import router from '../router'
import config from './config'

axios.defaults.withCredentials = true

// 添加请求拦截器，在发送请求之前做些什么
axios.interceptors.request.use(function (config) {
  store.state.requestTime = new Date().getTime()
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
  return response.data
}, function (error) {
  return Promise.reject(error)
})

// 封装数据返回失败提示函数
function errorState (response) {
  // 隐藏loading
  store.state.loading = false
  Message({
    type: 'error',
    message: '网络错误'
  })
  return response
}

// 封装数据返回成功提示函数
function successState (response) {
  // 隐藏loading
  let timeInterval = new Date().getTime() - store.state.requestTime
  if (timeInterval < store.state.minLoading) {
    setTimeout(() => {
      store.state.loading = false
    }, store.state.minLoading)
  } else {
    store.state.loading = false
  }
  // 登录超时
  if (response.code && response.code === 401) {
    // 清楚登录标记
    sessionStorage.setItem('isLogin', false)
    router.replace('/login')
  }
  // 如果code不等于0，提示错误信息
  if (response.code && response.code !== 0) {
    Message({
      type: 'error',
      message: response.data
    })
  }
  return response
}

// 封装axios
function httpRequest (url, method = 'GET', params = {}, contentType = '', isLoading = true) {
  if (isLoading) {
    store.state.loading = true
  }
  // 设置token
  if (process.env.NODE_ENV === 'development') {
    url = config.baseUrl + url
  }
  method = method.toUpperCase()
  let httpDefault = {
    method: method,
    url: url,
    headers: {
      withCredentials: true,
      'Content-Type': 'application/json;charset=utf-8'
    },
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? params : null,
    timeout: 10000
  }

  return new Promise((resolve, reject) => {
    axios(httpDefault).then((response) => {
      successState(response)
      resolve(response)
    }).catch((response) => {
      errorState(response)
      reject(response)
    })
  })
}

export default httpRequest
