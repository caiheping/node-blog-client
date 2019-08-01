let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api'
}
export default {
  baseUrl
}
