import { MongoId } from '../../@types'
import { RoleEnum } from '../enums'

export interface IUser {
  _id?: MongoId
  name: string
  age: number
  phone: string
  email: string
  password: string
  bookmarks: MongoId[]
  rentedBooks: MongoId[]
  role: RoleEnum
}

export interface IJwtUser {
  _id: string
  role: RoleEnum
}
