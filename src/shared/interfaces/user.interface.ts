import { MongoId } from '../../@types'

export interface IUser {
  _id?: MongoId
  name: string
  age: number
  phone: string
  email: string
  password: string
  bookmarks: string[]
}
