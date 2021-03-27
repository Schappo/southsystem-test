import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
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

  @prop({ required: true, trim: true, maxlength: 100 })
  email: string

  @prop({ required: true, trim: true, maxlength: 100 })
  password: string

  @prop({ required: true })
  age: number

  @prop({ required: false, default: [] })
  bookmarks: string[] = []
}

export default getModelForClass(UserModel)
