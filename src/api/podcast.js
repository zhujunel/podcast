/* eslint-disable func-call-spacing,no-unexpected-multiline,no-unused-vars,no-unused-vars */
import base from './base'
import Page from '../utils/Page'

export default class podcast extends base {
  /**
   * 获取节目列表从全部分类中
   */
  static page () {
    const url = `${this.baseUrl}/posts?term=category`
    return new Page(url, this.__before.bind(this), this.__after.bind(this))
  }

  static async __before (item) {
    item.list = await this.loadEpisodes(item)
    item.loaded = true
    return item
  }

  static async __after (item) {
    // $wxapp.emitter.emit(Event.PODCAST_LIST_UPDATE, item)
  }
  static async loadEpisodes (item) {
    const url = `${this.baseUrl}/posts`
    const data = await this.get(url, {parent: item.id})
    return data
  }
}
