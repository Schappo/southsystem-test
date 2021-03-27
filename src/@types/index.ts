import { DocumentType, mongoose } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export type ModelType<T> = mongoose.Model<any, DocumentType<T>> & T

export type NullAble<T> = T | null

export type MongoId = Types.ObjectId
