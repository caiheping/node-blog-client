import httpRequest from '../../utils/request'

// 查询类型
export function findArticleType (query = {}) {
  return httpRequest('/article/findArticleType', 'get', query)
}

// 查询所有类型
export function findArticleAllType (query = {}) {
  return httpRequest('/article/findArticleAllType', 'get', query)
}

// 添加类型
export function addArticleType (query = {}) {
  return httpRequest('/article/addArticleType', 'post', query)
}

// 删除类型
export function deleteArticleType (query = {}) {
  return httpRequest('/article/deleteArticleType', 'post', query)
}

// 修改类型
export function updateArticleType (query = {}) {
  return httpRequest('/article/updateArticleType', 'post', query)
}

// 查询文章
export function findArticle (query = {}) {
  return httpRequest('/article/findArticle', 'get', query)
}

export function addArticle (query = {}) {
  return httpRequest('/article/addArticle', 'post', query)
}

export function deleteArticle (query = {}) {
  return httpRequest('/article/deleteArticle', 'post', query)
}

export function updateArticle (query = {}) {
  return httpRequest('/article/updateArticle', 'post', query)
}
