import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { IBook } from '@shared/interfaces/book.interface'

@modelOptions({ schemaOptions: { collection: 'books' } })
class BookModel implements IBook {
  @prop({ required: true, trim: true, maxlength: 100 })
  title: string

  @prop({ required: true, maxlength: 13 })
  ibsn: number

  @prop({ required: true, trim: true, maxlength: 100 })
  category: string

  @prop({ required: true, max: 9999 })
  year: number
}

export default getModelForClass(BookModel)
