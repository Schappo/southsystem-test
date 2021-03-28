import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { MongoId } from '../../@types'
import { RoleEnum } from '../enums'
import { IUser } from '../interfaces'

@modelOptions({
  schemaOptions: { collection: 'users' },
  options: { allowMixed: 0 }
})
class UserModel implements IUser {
  @prop({ required: true, trim: true, maxlength: 100 })
  name: string

  @prop({ required: true, trim: true, maxlength: 100 })
  phone: string

  @prop({ required: true, trim: true, maxlength: 100, unique: true })
  email: string

  @prop({ required: true, trim: true, maxlength: 100 })
  password: string

  @prop({ required: true })
  age: number

  @prop({ required: false, default: [] })
  bookmarks: MongoId[] = []

  @prop({ required: false, default: RoleEnum.READER, enum: RoleEnum, type: String })
  role = RoleEnum.READER

  @prop({ required: false, default: [] })
  rentedBooks: MongoId[]
}

export default getModelForClass(UserModel)
