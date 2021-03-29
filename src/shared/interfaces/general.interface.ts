import { MongoId } from '../../@types'
import { RoleEnum } from '../enums'
import { IUser } from './user.interface'

export interface IConfigMapping {
  [key: string]: unknown
}

export interface ISingIn {
  user: IUser
  token: string
}
export interface IDatabaseConfig extends IConfigMapping {
  dbUri: string
  options: {
    useNewUrlParser: boolean
    useCreateIndex: boolean
    useUnifiedTopology: boolean
    useFindAndModify: boolean
  }
}

export interface IMongoDocument {
  _id?: MongoId;
}

export interface IDecodedJWT {
  _id: MongoId
  role: RoleEnum
  iat: number
}
