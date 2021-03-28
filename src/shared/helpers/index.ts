import { Request } from 'express'
import { promisify } from 'util'
import { IDecodedJWT, IJwtUser, IUser } from '../interfaces'
import jwt from 'jsonwebtoken'
import { RoleEnum } from '../enums'

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
