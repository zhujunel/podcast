const env = 'development' // 'development' or 'production'
const isProdMode = Object.is(env, 'production')
// ENV
exports = {
  baseURL: isProdMode ? 'https://zy.picker.cc/api' : 'http://api.picker.la',
  socketHost: isProdMode ? 'https://picker.cc' : 'http://localhost:5000'
}
