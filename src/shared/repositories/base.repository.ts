import { ModelType } from '@typegoose/typegoose/lib/types'
import { MongoId, NullAble } from '../../@types'
import { omit } from 'lodash'
class BaseRepository<T> {
  protected model: ModelType<T>;

  constructor (model: ModelType<T>) {
    this.model = model
  }

  async findAll (query = {}): Promise<T[]> {
    return await this.model.find(query).exec()
  }

  async findById (id: MongoId): Promise<NullAble<T>> {
    return await this.model.findById(id).exec()
  }

  async update (id: MongoId, data: Partial<T>): Promise<NullAble<T>> {
    return await this.model.findByIdAndUpdate(id, omit(data, ['_id']), { new: true }).exec()
  }

  async create (item: T): Promise<T> {
    return await this.model.create(omit(item, ['_id']))
  }

  async delete (id: MongoId): Promise<boolean> {
    const deleted = await this.model.findByIdAndDelete(id).exec()
    return Boolean(deleted)
  }
}

export default BaseRepository
