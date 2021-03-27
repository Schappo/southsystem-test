import { boolean } from 'joi'
import { Types } from 'mongoose'

export interface ConfigMapping {
  [key: string]: unknown;
}

export interface DatabaseConfig extends ConfigMapping {
  uri: string;
  options: {
    useNewUrlParser: boolean;
    useCreateIndex: boolean;
    useUnifiedTopology: boolean;
    useFindAndModify: boolean;
  }
}

export interface HashMap {
  [key: string]: unknown;
}

export interface MongoDocument {
  _id?: Types.ObjectId;
}
