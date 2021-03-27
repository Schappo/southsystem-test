import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import bookService from '../services/book.services'
import { IBook } from '../shared/interfaces/book.interface'

const findAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = await bookService.findAll()
    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ data: 'Internal Server Error!' })
  }
}

const findById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await bookService.findById(new ObjectId(id))
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json({ data: 'Book not Found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ data: 'Internal Server Error!' })
  }
}

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const data: IBook = req.body
  try {
    const response = await bookService.update(new ObjectId(id), data)
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json({ data: 'Book not Found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ data: 'Internal Server Error!' })
  }
}

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: IBook = req.body
  try {
    const response = await bookService.create(data)
    return res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ data: 'Internal Server Error!' })
  }
}

const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await bookService.remove(new ObjectId(id))
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json({ data: 'Book not Found' })
    }
  } catch (error) {
    console.error(error)
  }
}

export default {
  findAll,
  findById,
  create,
  update,
  remove
}
