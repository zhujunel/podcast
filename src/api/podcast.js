/* eslint-disable func-call-spacing,no-unexpected-multiline,no-unused-vars,no-unused-vars */
import base from './base'
import Page from '../utils/Page'
import moment from 'moment'

moment.locale('zh-cn')

export default class podcast extends base {
  /**
   * 获取推荐内容列表
   * @returns {Pagination}
   */
  static stickys () {
    const url = `${this.baseUrl}/posts?sticky=true`
    // const data = await this.get(url)
    // return data
    return new Page(url)
  }
  /**
   * 获取节目列表从全部分类中
   */
  static page () {
    const url = `${this.baseUrl}/posts?type=post_format`
    return new Page(url, this.__before.bind(this), this.__after.bind(this))
  }

  /**
   * 获取节目信息
   * @param id
   * @returns {Promise.<*>}
   */
  static async detail (id) {
    const url = `${this.baseUrl}/posts/${id}`
    const data = await this.get(url)
    return data
  }

  /**
   * 按作者查找
   * @param author
   * @returns {Promise.<*>}
   */
  static async findByAuthor (author) {
    const url = `${this.baseUrl}/posts`
    const data = await this.get(url, {author: author})
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
    // console.log(JSON.stringify(data))
    return data
  }

  static async loadEpisodes (item) {
    const url = `${this.baseUrl}/posts`
    const data = await this.get(url, {parent: item.id})
    return data.data
  }

  /**
   * Like
   * @param postId
   * @returns {Promise.<*>}
   */
  static async newLike (postId) {
    const url = `${this.baseUrl}/posts/${postId}/likes/new`
    const data = await this.post(url, {})
    return data
  }

  /**
   * Un Like
   * @param postId
   * @returns {Promise.<void>}
   */
  static async unLike (postId) {
    const url = `${this.baseUrl}/posts/${postId}/likes/mine/delete`
    const data = await this.post(url, {})
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
