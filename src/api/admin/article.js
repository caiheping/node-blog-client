import httpRequest from '../../utils/request'

// 查询类型
export function findArticleType (query = {}) {
  return httpRequest('/admin/article/findArticleType', 'get', query)
}

// 查询所有类型
export function findArticleAllType (query = {}) {
  return httpRequest('/admin/article/findArticleAllType', 'get', query)
}

// 添加类型
export function addArticleType (query = {}) {
  return httpRequest('/admin/article/addArticleType', 'post', query)
}

// 删除类型
export function deleteArticleType (query = {}) {
  return httpRequest('/admin/article/deleteArticleType', 'post', query)
}

// 修改类型
export function updateArticleType (query = {}) {
  return httpRequest('/admin/article/updateArticleType', 'post', query)
}

// 查询文章
export function findArticle (query = {}) {
  return httpRequest('/admin/article/findArticle', 'get', query)
}

export function addArticle (query = {}) {
  return httpRequest('/admin/article/addArticle', 'post', query)
}

export function deleteArticle (query = {}) {
  return httpRequest('/admin/article/deleteArticle', 'post', query)
}

export function updateArticle (query = {}) {
  return httpRequest('/admin/article/updateArticle', 'post', query)
}
