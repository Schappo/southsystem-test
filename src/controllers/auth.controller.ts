import { Request, Response } from 'express'
import authService from '../services/auth.service'

const singIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body

  const { user, token } = await authService.singIn(email, password)

  if (!user) return res.status(404).send('User not found!')

  return res.status(200).send({ user, token })
}

export default {
  singIn
}
