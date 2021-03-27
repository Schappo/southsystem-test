import { MongoId, NullAble } from '../@types'
import { IBook } from '../shared/interfaces/book.interface'
import bookModel from '../shared/models/book.model'
import { BookRepository } from '../shared/repositories/book.repository'

const findAll = async (): Promise<IBook[]> => {
  return await new BookRepository(bookModel).findAll()
}

const findById = async (id: MongoId): Promise<NullAble<IBook>> => {
  return await new BookRepository(bookModel).findById(id)
}

const update = async (id: MongoId, data: Partial<IBook>): Promise<NullAble<IBook>> => {
  return await new BookRepository(bookModel).update(id, data)
}

const create = async (book: IBook): Promise<IBook> => {
  return await new BookRepository(bookModel).create(book)
}

const remove = async (id: MongoId): Promise<boolean> => {
  const deleted = await new BookRepository(bookModel).delete(id)
  return Boolean(deleted)
}

export default {
  findById,
  findAll,
  update,
  create,
  remove
}
