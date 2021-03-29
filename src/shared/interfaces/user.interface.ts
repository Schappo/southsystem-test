import { MongoId } from '../../@types'
import { RoleEnum } from '../enums'
import { IMongoDocument } from './general.interface'

export interface IUser extends IMongoDocument {
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
  _id: MongoId
  role: RoleEnum
}
