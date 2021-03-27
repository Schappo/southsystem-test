import { Types } from 'mongoose'
import { IUser } from './user.interface'

export interface IConfigMapping {
  [key: string]: unknown;
}

export interface ISingIn {
  user: IUser,
  token: string
}
export interface IDatabaseConfig extends IConfigMapping {
  dbUri: string;
  options: {
    useNewUrlParser: boolean;
    useCreateIndex: boolean;
    useUnifiedTopology: boolean;
    useFindAndModify: boolean;
  }
}

export interface IHashMap {
  [key: string]: unknown;
}

export interface IMongoDocument {
  _id?: Types.ObjectId;
}
