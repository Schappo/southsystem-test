import express from 'express'
import userController from '../controllers/user.controller'
import userDto from '../dtos/user.dto'
import { authMiddleware, authReaderMiddleware } from '../middleware/auth.middleware'
import { bodyValidateMiddleware } from '../middleware/body.middleware'
import { RoleEnum } from '../shared/enums'
const router = express.Router()
router.route('/')
// Create User
  .post([
    authReaderMiddleware,
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(userDto.createUserSchema)
  ], (req, res) => userController.create(req, res))
  // Find All Users
  .get([
    authReaderMiddleware,
    authMiddleware([RoleEnum.LIBRARY_OP])
  ], (req, res) => userController.findAll(req, res))
router.route('/:id')
// Find User By Id
  .get([
    authReaderMiddleware,
    authMiddleware([RoleEnum.LIBRARY_OP])
  ], (req, res) => userController.findById(req, res)
  )
  // Update User
  .put([
    authReaderMiddleware,
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(userDto.updateUserSchema)
  ], (req, res) => userController.update(req, res)
  )
  // Delete User
  .delete([
    authReaderMiddleware,
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(userDto.updateUserSchema)
  ], (req, res) => userController.remove(req, res))

export default router
