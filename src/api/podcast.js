/* eslint-disable func-call-spacing,no-unexpected-multiline,no-unused-vars,no-unused-vars */
import base from './base'
import Page from '../utils/Page'
import moment from 'moment'
moment.locale('zh-cn')

export default class podcast extends base {
  /**
   * 获取节目列表从全部分类中
   */
  static page () {
    const url = `${this.baseUrl}/posts?term=category&status=publish`
    return new Page(url, this.__before.bind(this), this.__after.bind(this))
  }

  /**
   * 获取节目信息
   * @param id
   * @returns {Promise.<*>}
   */
  static async detail (id) {
    const url = `${this.baseUrl}/posts`
    const data = await this.get(url, {id: id})
    return data
  }

  /**
   * 获取列表
   * @param parent
   * @returns {Promise.<*>}
   */
  static async list (parent) {
    const url = `${this.baseUrl}/posts`
    const data = await this.get(url, {parent: parent})
    return data
  }

  static async loadEpisodes (item) {
    const url = `${this.baseUrl}/posts`
    const data = await this.get(url, {parent: item.id})
    return data
  }

  /**
   * 前置数据处理
   * @param item
   * @returns {Promise.<*>}
   * @private
   */
  static async __before (item) {
    item.list = await this.loadEpisodes(item)
    item.modified = moment(item.modified).fromNow()
    item.list.forEach((value) => {
      value.modified = moment(value.modified).fromNow()
    })
    item.loaded = true
    return item
  }

  static async __after (item) {
    // $wxapp.emitter.emit(Event.PODCAST_LIST_UPDATE, item)
  }
}
