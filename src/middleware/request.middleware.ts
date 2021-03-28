import { NextFunction, Request, Response } from 'express'
import { Schema, ValidationResult } from 'joi'

export const bodyValidateMiddleware = (dto: Schema) => {
  return function (req: Request, res: Response, next: NextFunction): Response {
    const { error }: ValidationResult = dto.validate(req.body, { abortEarly: false })
    if (error) {
      const { details } = error
      const message = {}
      details.forEach(item => {
        message[item.context.label] = item.message.replace(/["]+/g, '')
      })

      return res.status(400).json({
        error: 'Bad Request',
        statusCode: 400,
        constraint: message
      })
    }

    next()
  }
}
