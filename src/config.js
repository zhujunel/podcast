// ENV
const env = 'development' // 'development' or 'production'

// WXAPP VERSION
const version = 1.0

// development and production host
const hosts = {
  development: 'http://zy.picker.la/api',
  production: 'https://zy.picker.cc/api'
}

const basic_token = 'Basic token='
const PICKER_APPID = '1'
// apis
const api = {
  common: {
    options: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/options/wxapp`
    },
    recommend: {
      method: 'GET',
      url: '/podcast/recommend'
    }
  }

}

module.exports = {
  env,
  version,
  api: disposeUrl(api, hosts[env])
}

function disposeUrl(obj, prefix) {
  Object.keys(obj).forEach(v => {
    if (obj[v].url) {
      obj[v].url = prefix + obj[v].url
    } else {
      obj[v] = disposeUrl(obj[v], prefix)
    }
  })

  return obj
}
