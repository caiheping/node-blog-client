import httpRequest from '../../utils/request'

// 查询轮播
export function findBanner (query = {}) {
  return httpRequest('/admin/other/findBanner', 'get', query)
}

export function addBanner (query = {}) {
  return httpRequest('/admin/other/addBanner', 'post', query)
}

export function deleteBanner (query = {}) {
  return httpRequest('/admin/other/deleteBanner', 'post', query)
}

export function updateBanner (query = {}) {
  return httpRequest('/admin/other/updateBanner', 'post', query)
}

// 查询友情链接
export function findFriendshipLink (query = {}) {
  return httpRequest('/admin/other/findFriendshipLink', 'get', query)
}

export function addFriendshipLink (query = {}) {
  return httpRequest('/admin/other/addFriendshipLink', 'post', query)
}

export function deleteFriendshipLink (query = {}) {
  return httpRequest('/admin/other/deleteFriendshipLink', 'post', query)
}

export function updateFriendshipLink (query = {}) {
  return httpRequest('/admin/other/updateFriendshipLink', 'post', query)
}
