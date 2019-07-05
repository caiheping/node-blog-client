import httpRequest from '../../utils/request'

// 登录接口
export function login (query = {}) {
  return httpRequest('/login', 'post', query)
}
