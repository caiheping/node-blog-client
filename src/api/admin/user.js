import httpRequest from '../../utils/request'

// 查询用户
export function findUser (query = {}) {
  return httpRequest('/admin/user/findUser', 'get', query)
}

// 添加用户
export function addUser (query = {}) {
  return httpRequest('/admin/user/addUser', 'post', query)
}

// 编辑用户
export function updatePwd (query = {}) {
  return httpRequest('/admin/user/updatePwd', 'post', query)
}

// 删除用户
export function deleteUser (query = {}) {
  return httpRequest('/admin/user/deleteUser', 'post', query)
}

// 编辑个人简介信息
export function updateUserInfo (query = {}) {
  return httpRequest('/admin/user/updateUserInfo', 'post', query)
}

// 查询技能
export function findSkill (query = {}) {
  return httpRequest('/admin/user/findSkill', 'get', query)
}

export function addSkill (query = {}) {
  return httpRequest('/admin/user/addSkill', 'post', query)
}

export function deleteSkill (query = {}) {
  return httpRequest('/admin/user/deleteSkill', 'post', query)
}

export function updateSkill (query = {}) {
  return httpRequest('/admin/user/updateSkill', 'post', query)
}

// 查询个人日志
export function findNote (query = {}) {
  return httpRequest('/admin/user/findNote', 'get', query)
}

export function addNote (query = {}) {
  return httpRequest('/admin/user/addNote', 'post', query)
}

export function deleteNote (query = {}) {
  return httpRequest('/admin/user/deleteNote', 'post', query)
}

export function updateNote (query = {}) {
  return httpRequest('/admin/user/updateNote', 'post', query)
}
