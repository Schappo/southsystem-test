import { IBook } from '@shared/interfaces'
import bookModel from '@shared/models/book.model'
import { BookRepository } from '@shared/repositories/book.repository'
import { MongoId, NullAble } from '../@types'

const bookrepository = new BookRepository(bookModel)

const findAll = async (query: Partial<IBook>): Promise<IBook[]> => {
  return await bookrepository.findAll(query)
}

const findById = async (id: MongoId): Promise<NullAble<IBook>> => {
  return await bookrepository.findById(id)
}

const update = async (id: MongoId, data: Partial<IBook>): Promise<NullAble<IBook>> => {
  return await bookrepository.update(id, data)
}

const create = async (book: IBook): Promise<IBook> => {
  return await bookrepository.create(book)
}

const remove = async (id: MongoId): Promise<boolean> => {
  const deleted = await bookrepository.delete(id)
  return Boolean(deleted)
}

export default {
  findById,
  findAll,
  update,
  create,
  remove
}
