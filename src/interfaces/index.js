import wepy from 'wepy'
import { api } from '../config'

const interfaces = {
  async getUserInfo () {
    const loginData = await wepy.login()
    const userinfo = await wepy.getUserInfo()
    console.log(JSON.stringify(loginData))
    userinfo.code = loginData.code
    return userinfo
  },
  async login () {
    let userinfoRaw = {}
    let userinfo = {}
    console.log("login .....")
    try {
      userinfoRaw = await interfaces.getUserInfo()
      console.log(userinfoRaw)
      // console.log('user info raw .......')
      // console.log(JSON.stringify(userinfoRaw))
      userinfo = await wepy.request({
        url: api.user.login.url,
        method: api.user.login.method,
        header: {
          // 'approach': 'wechat',
          'x-wechat-code': userinfoRaw.code,
          'x-wechat-encrypted': userinfoRaw.encryptedData,
          'x-wechat-iv': userinfoRaw.iv
        },
        dataType: 'json',
        data: {}
      })

      await wepy.setStorage({
        key: '_token',
        data: userinfo.data.token
      })
    } catch (e) {
      wepy.showModal({
        title: '提示',
        content: `获取用户信息失败，请关闭重新进入。${e.message}`
      })
    }
  }
}

export default interfaces
