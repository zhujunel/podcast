// ENV
const env = 'development' // 'development' or 'production'

// WXAPP VERSION
const version = 1.0

// development and production host
const hosts = {
  development: 'http://api.picker.la/v1',
  production: 'https://zy.picker.cc/api'
}

const basic_token = 'Basic token='
const PICKER_APPID = 'S11SeYT2W'
// apis
const api = {
  common: {
    get: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/posts`,
      data: {}
    },
    options: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/options?key=_wxapp`
    },
    sticky: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/posts`
    },
    list: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/posts?term=category`
    },
    recommend: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/posts`
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
  console.log(JSON.stringify(obj))
  return obj
}
