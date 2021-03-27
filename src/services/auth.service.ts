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
        token: generateToken(user)
      }
    }
  }
}

const generateToken = (user) => {
  const { _id, role } = user
  return jwt.sign({ _id, role }, process.env.APP_SECRET, { expiresIn: 10 })
}

const checkPassword = (passToValidate, userPassword) => {
  return bcrypt.compare(passToValidate, userPassword)
}

export default {
  singIn
}
