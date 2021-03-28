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
  ], userController.create)
  // Find All Users
  .get([
    authReaderMiddleware,
    authMiddleware([RoleEnum.LIBRARY_OP])
  ], userController.findAll)
router.route('/:id')
// Find User By Id
  .get([
    authReaderMiddleware,
    authMiddleware([RoleEnum.LIBRARY_OP])
  ], userController.findById
  )
  // Update User
  .put([
    authReaderMiddleware,
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(userDto.updateUserSchema)
  ], userController.update
  )
  // Delete User
  .delete([
    authReaderMiddleware,
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(userDto.updateUserSchema)
  ], userController.remove)

// get Books mark list
router.get('/bookmark/:id', [
  authReaderMiddleware,
  authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP])
], userController.getBookMarkList)

// get Rented Books list
router.get('/rented-list/:id', [
  authReaderMiddleware,
  authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP])
], userController.getRentedBooksList)

export default router
