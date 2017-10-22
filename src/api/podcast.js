import base from './base'
import Page from '../utils/Page'

export default class podcast extends base {
  /**
   * 获取节目列表从全部分类中
   */
  static page() {
    const url = `${this.baseUrl}/posts?term=category`
    return new Page(url)
    // return await this.get(url, {page: page})
  }
}
