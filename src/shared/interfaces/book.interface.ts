import { IMongoDocument } from './general.interface'

export interface IBook extends IMongoDocument {
  title: string
  ibsn: number
  category: string
  year: number
  rented: boolean
}
