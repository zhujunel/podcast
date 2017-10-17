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
    options: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/options?key=_wxapp`
    },
    recommend: {
      method: 'GET',
      url: `/app/${PICKER_APPID}/posts`
    },
    episodes: (parentId) => {
      return {
        method: 'GET',
        url: `/app/${PICKER_APPID}/posts/?parent=${parentId}`
      }
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
