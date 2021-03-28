import jwt from 'jsonwebtoken'
import { ISingIn } from '../shared/interfaces'
import userService from './user.service'
import bcrypt from 'bcrypt'

const singIn = async (email: string, pass: string): Promise<ISingIn> => {
  const user = await userService.findByEmail(email)

  if (user) {
    if (checkPassword(pass, user.password)) {
      return {
        user,
        token: await generateToken(user)
      }
    }
  } else {
    return { user: null, token: null }
  }
}

const generateToken = async (user): Promise<string> => {
  const { _id, role } = user
  // return jwt.sign({ _id, role }, process.env.APP_SECRET, { expiresIn: 60 })
  return jwt.sign({ _id, role }, process.env.APP_SECRET)
}

const checkPassword = (passToValidate, userPassword) => {
  return bcrypt.compare(passToValidate, userPassword)
}

export default {
  singIn
}
