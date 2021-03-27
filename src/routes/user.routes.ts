import express from 'express'
import userController from '../controllers/user.controller'
import userDto from '../dtos/user.dto'
import { bodyValidateMiddleware } from '../middleware/body.middleware'
const router = express.Router()
router.route('/user')
// Create User
  .post(bodyValidateMiddleware(userDto.createUserSchema), (req, res) => userController.create(req, res))
  // Find All Users
  .get((req, res) => userController.findAll(req, res))
router.route('/user/:id')
// Find User By Id
  .get(
    (req, res) => userController.findById(req, res)
  )
  // Update User
  .put(
    bodyValidateMiddleware(userDto.updateUserSchema), (req, res) => userController.update(req, res)
  )
  // Delete User
  .delete((req, res) => userController.remove(req, res))

export default router
