import BaseRepository from './base.repository'
import { IUser } from '../interfaces'
import { ModelType } from '../../@types'

export class UerRepository extends BaseRepository<IUser> {
  protected userModel: ModelType<IUser>;

  constructor (userModel: any) {
    super(userModel)
    this.userModel = userModel
  }

  async findByEmail (email: string): Promise<IUser> {
    const [user] = await this.userModel.find({ email })
    return user
  }
}
