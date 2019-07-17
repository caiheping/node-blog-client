import httpRequest from '../../utils/request'

export function home (query = {}) {
  return httpRequest('/front/home', 'get', query)
}
