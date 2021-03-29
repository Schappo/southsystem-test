import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import userService from '@services/user.service'
import { IUser } from '@shared/interfaces'
import queryString from 'query-string'
import bookService from '../services/book.service'

const findAll = async (req: Request, res: Response): Promise<Response> => {
  const [, query] = req.url.split('?')
  const queryObject = queryString.parse(query)
  try {
    const response = await userService.findAll(queryObject)
    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal Server Error!')
  }
}

const findById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await userService.findById(new ObjectId(id))
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json('Book not Found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal Server Error!')
  }
}

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const user: IUser = req.body

  try {
    const response = await userService.update(new ObjectId(id), user)
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json('Book not Found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal Server Error!')
  }
}

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: IUser = req.body
  try {
    const response = await userService.create(data)
    return res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal Server Error!')
  }
}

const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await userService.remove(new ObjectId(id))
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json('User not Found')
    }
  } catch (error) {
    console.error(error)
  }
}

const getBookMarkList = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await userService.getBookMarkList(new ObjectId(id))

    return res.send(response)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something got wrong!')
  }
}

const getRentedBooksList = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await userService.getRentedBooksList(new ObjectId(id))
    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Something got wrong!')
  }
}

const rentBook = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { bookId } = req.body
  try {
    const book = await bookService.findById(bookId)
    if (book.rented) return res.status(400).json('This book is alread rented')

    const response = await userService.rentBook(new ObjectId(id), bookId)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).send('Something got wrong!')
  }
}

const bookReturn = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { bookId } = req.body
  try {
    const response = await userService.bookReturn(new ObjectId(id), bookId)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).send('Something got wrong!')
  }
}

export default {
  findAll,
  findById,
  create,
  update,
  remove,
  getBookMarkList,
  getRentedBooksList,
  rentBook,
  bookReturn
}
