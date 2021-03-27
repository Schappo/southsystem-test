import { DocumentType, mongoose } from '@typegoose/typegoose'

export type ModelType<T> = mongoose.Model<any, DocumentType<T>> & T;
