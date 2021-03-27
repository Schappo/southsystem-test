import { NextFunction, Request, Response } from 'express'

export const bodyMiddleware = () => {
  return function (req: Request, res: Response, next: NextFunction): any {
    // if (error) {
    //   const { details } = error
    //   const message = {}
    //   details.forEach(item => {
    //     message[item.context.label] = item.message.replace(/["]+/g, '')
    //   })

    //   return res.status(400).json({
    //     error: 'Bad Request',
    //     statusCode: 400,
    //     constraint: message
    //   })
    // }

    next()
  }
}
