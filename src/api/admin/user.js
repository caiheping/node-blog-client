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

// 编辑个人简介信息
export function updateUserInfo (query = {}) {
  return httpRequest('/user/updateUserInfo', 'post', query)
}

// 查询技能
export function findSkill (query = {}) {
  return httpRequest('/user/findSkill', 'get', query)
}

export function addSkill (query = {}) {
  return httpRequest('/user/addSkill', 'post', query)
}

export function deleteSkill (query = {}) {
  return httpRequest('/user/deleteSkill', 'post', query)
}

export function updateSkill (query = {}) {
  return httpRequest('/user/updateSkill', 'post', query)
}

// 查询个人笔记
export function findNote (query = {}) {
  return httpRequest('/user/findNote', 'get', query)
}

export function addNote (query = {}) {
  return httpRequest('/user/addNote', 'post', query)
}

export function deleteNote (query = {}) {
  return httpRequest('/user/deleteNote', 'post', query)
}

export function updateNote (query = {}) {
  return httpRequest('/user/updateNote', 'post', query)
}
