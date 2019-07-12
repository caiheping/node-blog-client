import httpRequest from '../../utils/request'

// 查询类型
export function findArticleType (query = {}) {
  return httpRequest('/fornt/article/findArticleType', 'get', query)
}

// 查询文章
export function findArticle (query = {}) {
  return httpRequest('/fornt/article/findArticle', 'get', query)
}
