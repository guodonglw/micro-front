import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

const instance = axios.create({
  timeout: 15000,
  baseURL: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    message.error(error.msg || error.message)
    return Promise.reject(error)
  }
)

// 封装请求实例
class Http {
  static get (url, params) {
    return instance.get(url, { params })
  }

  /**
   *url 访问链接
   *params 请求参数
   *contentType 请求内容类型 urlencoded/json
  */
  static post (url, params, contentType = 'json') {
    if (contentType === 'urlencoded') {
      return instance.post(url, qs.stringify(params))
    } else {
      return instance.post(url, params, {
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }

  static delete (url, params, contentType = 'json') {
    if (contentType === 'urlencoded') {
      return instance.delete(url, { params: { ...params } })
    } else {
      return instance.delete(url, params, {
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
}

export default Http
