import httpRequest from '../../utils/request'

// 查询类型
export function findUserInfo (query = {}) {
  return httpRequest('/front/user/userInfo', 'get', query)
}

// 查询个人日志
export function findNote (query = {}) {
  return httpRequest('/front/user/findNote', 'get', query)
}
