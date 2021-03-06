import { IBook, IUser } from '@shared/interfaces'
import userModel from '@shared/models/user.model'
import { UerRepository } from '@shared/repositories/user.repository'
import { MongoId, NullAble } from '../@types'
import bcrypt from 'bcrypt'
import bookService from './book.service'
import { ObjectId } from 'mongodb'
import { findAndRemoveArrayStringItem } from '@shared/helpers'

const { BCRYPT_SALT } = process.env
const userRepository = new UerRepository(userModel)

const findAll = async (query: any): Promise<IUser[]> => {
  return await userRepository.findAll(query)
}

const findByEmail = async (email: string): Promise<IUser> => {
  return await userRepository.findByEmail(email)
}

const findById = async (id: MongoId): Promise<NullAble<IUser>> => {
  return await userRepository.findById(id)
}

const update = async (id: MongoId, user: Partial<IUser>): Promise<NullAble<IUser>> => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT)
    user.password = bcrypt.hashSync(user.password, salt)
  }
  return await userRepository.update(id, user)
}

const create = async (user: IUser): Promise<IUser> => {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT)
  user.password = bcrypt.hashSync(user.password, salt)
  return await userRepository.create(user)
}

const remove = async (id: MongoId): Promise<boolean> => {
  const deleted = await userRepository.delete(id)
  return Boolean(deleted)
}

const getBookMarkList = async (id: MongoId) : Promise<IBook[]> => {
  const user = await findById(id)
  const result = []
  for (const bookId of user.bookmarks) {
    const book = await bookService.findById(new ObjectId(bookId))
    if (book) {
      result.push(book)
    }
  }
  return result
}

const getRentedBooksList = async (id: MongoId): Promise<IBook[]> => {
  const user = await findById(id)
  const result = []
  for (const bookId of user.rentedBooks) {
    const book = await bookService.findById(new ObjectId(bookId))
    if (book) {
      result.push(book)
    }
  }
  return result
}

const rentBook = async (id: MongoId, bookId: MongoId): Promise<IUser> => {
  const user = await findById(id)
  const rentedBooks = user.rentedBooks
  rentedBooks.push(bookId)

  await bookService.update(bookId, { rented: true })

  return await update(id, { rentedBooks })
}

const bookReturn = async (id: MongoId, bookId: MongoId): Promise<IUser> => {
  const user = await findById(id)
  const updatedUserRentedBooks: MongoId[] = findAndRemoveArrayStringItem(user.rentedBooks, bookId)
  try {
    const updatedUser = await update(id, { rentedBooks: updatedUserRentedBooks })

    await bookService.update(bookId, { rented: false })

    return updatedUser
  } catch (error) {

  }
}

export default {
  findById,
  findByEmail,
  findAll,
  update,
  create,
  remove,
  getBookMarkList,
  getRentedBooksList,
  rentBook,
  bookReturn
}
