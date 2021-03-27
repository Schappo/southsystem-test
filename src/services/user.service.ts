import { IUser } from '@shared/interfaces'
import userModel from '@shared/models/user.model'
import { UerRepository } from '@shared/repositories/user.repository'
import { MongoId, NullAble } from '../@types'
import bcrypt from 'bcrypt'

const { BCRYPT_SALT } = process.env
const userRepository = new UerRepository(userModel)

const findAll = async (): Promise<IUser[]> => {
  return await userRepository.findAll()
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

export default {
  findById,
  findAll,
  update,
  create,
  remove
}
