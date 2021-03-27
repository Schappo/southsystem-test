import { ModelType } from '@typegoose/typegoose/lib/types'

class BaseRepository<T> {
  protected model: ModelType<T>;

  constructor (model: ModelType<T>) {
    this.model = model
  }
}

export default BaseRepository
