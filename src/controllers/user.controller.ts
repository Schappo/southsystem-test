import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import userService from '@services/user.service'
import { IUser } from '@shared/interfaces'

const findAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = await userService.findAll()
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
  const data: IUser = req.body
  try {
    const response = await userService.update(new ObjectId(id), data)
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

export default {
  findAll,
  findById,
  create,
  update,
  remove
}
