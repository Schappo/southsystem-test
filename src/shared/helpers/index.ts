import { Request } from 'express'
import { promisify } from 'util'
import { IDecodedJWT, IJwtUser } from '../interfaces'
import jwt from 'jsonwebtoken'

export const getJWTUser = async (token: string): Promise<IJwtUser> => {
  const decodedJWT: IDecodedJWT = await promisify(jwt.verify)(token, process.env.APP_SECRET)
  return {
    _id: decodedJWT._id,
    role: decodedJWT.role
  }
}

export const getTokenFromRequest = (req: Request): string => {
  const authHeader = req.headers.authorization
  const [, token] = authHeader.split(' ')
  return token
}

export const findAndRemoveArrayStringItem = (array: any[], elem: any, removeAll = false): any => {
  let index = array.indexOf(elem)
  while (index > -1) {
    array.splice(index, 1)

    if (!removeAll) break

    index = array.indexOf(elem)
  }

  return array
}
