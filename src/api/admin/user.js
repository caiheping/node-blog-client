import httpRequest from '../../utils/request'

// 查询用户
export function findUser (query = {}) {
  return httpRequest('/user/findUser', 'get', query)
}

// 添加用户
export function addUser (query = {}) {
  return httpRequest('/user/addUser', 'post', query)
}

// 编辑用户
export function updatePwd (query = {}) {
  return httpRequest('/user/updatePwd', 'post', query)
}

// 删除用户
export function deleteUser (query = {}) {
  return httpRequest('/user/deleteUser', 'post', query)
}
