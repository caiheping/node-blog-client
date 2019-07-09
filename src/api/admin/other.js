import httpRequest from '../../utils/request'

// 查询轮播
export function findBanner (query = {}) {
  return httpRequest('/other/findBanner', 'get', query)
}

export function addBanner (query = {}) {
  return httpRequest('/other/addBanner', 'post', query)
}

export function deleteBanner (query = {}) {
  return httpRequest('/other/deleteBanner', 'post', query)
}

export function updateBanner (query = {}) {
  return httpRequest('/other/updateBanner', 'post', query)
}

// 查询友情链接
export function findFriendshipLink (query = {}) {
  return httpRequest('/other/findFriendshipLink', 'get', query)
}

export function addFriendshipLink (query = {}) {
  return httpRequest('/other/addFriendshipLink', 'post', query)
}

export function deleteFriendshipLink (query = {}) {
  return httpRequest('/other/deleteFriendshipLink', 'post', query)
}

export function updateFriendshipLink (query = {}) {
  return httpRequest('/other/updateFriendshipLink', 'post', query)
}
