import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import bookService from '../services/book.service'
import { IBook } from '../shared/interfaces/book.interface'
import queryString from 'query-string'

const findAll = async (req: Request, res: Response): Promise<Response> => {
  const [, query] = req.url.split('?')
  const queryObject = queryString.parse(query, { parseNumbers: true, parseBooleans: true })
  try {
    const response = await bookService.findAll(queryObject)
    return res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal Server Error!')
  }
}

const findById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await bookService.findById(new ObjectId(id))
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
  const data: IBook = req.body
  try {
    const response = await bookService.update(new ObjectId(id), data)
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
  const data: IBook = req.body
  try {
    const response = await bookService.create(data)
    return res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json('Internal Server Error!')
  }
}

const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const response = await bookService.remove(new ObjectId(id))
    if (response) {
      return res.status(200).json(response)
    } else {
      return res.status(404).json('Book not Found')
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
