import $ from 'cafy'
import moment, { Moment } from 'moment'
import Model, { validateDate } from './_model'

export default class Account implements Model {
  id: number
  name: string
  screenName: string
  postsCount: number
  createdAt: Moment
  updatedAt: Moment

  private validate(user: any) {
    return $.obj({
      id: $.num,
      name: $.str,
      screenName: $.str,
      postsCount: $.num,
      createdAt: validateDate,
      updatedAt: validateDate
    })
      .strict()
      .throw(user)
  }

  constructor(u: any) {
    const user = this.validate(u)
    this.id = user.id
    this.name = [].filter
      .call(user.name.trim(), c => c.charCodeAt() !== 8203)
      .join('')
      .replace(/[\u200B-\u200D\uFEFF]/g, '').length
      ? user.name
      : `@${user.screenName}`
    this.screenName = user.screenName
    this.postsCount = user.postsCount
    this.createdAt = moment(user.createdAt)
    this.updatedAt = moment(user.updatedAt)
  }

  unpack() {
    return {
      id: this.id,
      name: this.name,
      screenName: this.screenName,
      postsCount: this.postsCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
