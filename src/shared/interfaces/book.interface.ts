import { MongoId } from '../../@types'

export interface IBook {
  _id?: MongoId
  title: string
  ibsn: number
  category: string
  year: number
  rented: boolean
}
