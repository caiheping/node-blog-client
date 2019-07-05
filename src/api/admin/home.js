import httpRequest from '../../utils/request'

// 获取首页信息
export function home (query = {}) {
  return httpRequest('/home/getArticleTypeTotal', 'get', query)
}
