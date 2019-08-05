import httpRequest from '../../utils/request'

// 查询类型
export function findArticleType (query = {}) {
  return httpRequest('/fornt/article/findArticleType', 'get', query)
}

// 查询文章
export function findArticle (query = {}) {
  return httpRequest('/fornt/article/findArticle', 'get', query)
}

// 通过id查询文章
export function findArticleById (query = {}) {
  return httpRequest('/fornt/article/findArticleById', 'get', query)
}

// 通过id查询文章
export function setBrowse (query = {}) {
  return httpRequest('/fornt/article/setBrowse', 'post', query)
}

// 喜欢
export function articleLike (query = {}) {
  return httpRequest('/front/article/like', 'post', query)
}

// 获取ip
export function getIp (query = {}) {
  return httpRequest('/fornt/getIp', 'get', query)
}
