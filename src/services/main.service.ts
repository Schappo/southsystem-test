import { Request, Response } from 'express'
import { RoleEnum } from '../shared/enums'
import { IBook, IUser } from '../shared/interfaces'
import bookService from './book.service'
import userService from './user.service'

const createBook1: IBook = {
  category: 'romance',
  rented: false,
  ibsn: 1928212121211,
  title: 'Populate Book 1',
  year: 2008
}

const createBook2: IBook = {
  category: 'ficção cientifica',
  rented: false,
  ibsn: 1928212121212,
  title: 'Populate Book 2',
  year: 2008
}

const createUser1: IUser = {
  age: 27,
  bookmarks: [],
  email: 'reader-user@soouthsystem.com',
  name: 'Populate User 1',
  role: RoleEnum.READER,
  password: 'reader',
  phone: '0909090909',
  rentedBooks: []
}

const createUser2: IUser = {
  age: 27,
  bookmarks: [],
  email: 'library-op-user@soouthsystem.com',
  name: 'Populate User 1',
  role: RoleEnum.LIBRARY_OP,
  password: 'libraryop',
  phone: '0909090909',
  rentedBooks: []
}

const populateDB = async (req: Request, res: Response): Promise<void | Response> => {
  const chekIfCanPopulate = async () => {
    const [book1] = await bookService.findAll({ title: 'Populate Book 1' })
    const [book2] = await bookService.findAll({ title: 'Populate Book 2' })
    const [user1] = await userService.findAll({ email: 'library-op-user@soouthsystem.com' })
    const [user2] = await userService.findAll({ email: 'reader-user@soouthsystem.com' })
    return !(user1 || user2 || book1 || book2)
  }

  const canPopulate = await chekIfCanPopulate()

  if (canPopulate) {
    try {
      await bookService.create(createBook1)
      await bookService.create(createBook2)
      await userService.create(createUser1)
      await userService.create(createUser2)

      return res.status(200).json('Populated DB!')
    } catch (error) {
      res.status(500).json('Something got worng!')
    }
  }

  return res.status(400).json('Already exists data base in DB')
}

export default {
  populateDB
}
