import { NextFunction, Request, Response } from 'express'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import { RoleEnum } from '../shared/enums'

export const authMiddleware = (param: RoleEnum[] | string): any => {
  const roles = []
  if (typeof param === 'string') {
    roles.push(param)
  }
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json('Token not provided!')

    const [, token] = authHeader.split(' ')

    try {
      const decodedJWT = await promisify(jwt.verify)(token, process.env.APP_SECRET)

      const isAuthorized = roles.some(role => role === decodedJWT.role || decodedJWT.role === RoleEnum.ADMIN)

      if (!isAuthorized) return res.status(401).json({ message: 'Yout don\'t have premission to access this route!' })

      return next()
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid' })
    }
  }
}
