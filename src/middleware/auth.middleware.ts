import { NextFunction, Request, Response } from 'express'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import { RoleEnum } from '../shared/enums'
import { getJWTUser, getTokenFromRequest } from '../shared/helpers'

export const authMiddleware = (roles: RoleEnum[]): any => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json('Token not provided!')

    const token = getTokenFromRequest(req)

    const decodedJWT = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    const isAuthorized = roles.some(role => role === decodedJWT.role || decodedJWT.role === RoleEnum.ADMIN)

    if (!isAuthorized) return res.status(401).json({ message: 'You don\'t have premission to access this route!' })

    return next()
  }
}

export const authReaderMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const jwtToken = getTokenFromRequest(req)
  const { id } = req.params
  const { _id: requesterID, role: requesterRole } = await getJWTUser(jwtToken)
  if (requesterRole === RoleEnum.READER) {
    if (requesterID !== id) return res.status(401).send('You are not allowed to update this User')
  }
  return next()
}
