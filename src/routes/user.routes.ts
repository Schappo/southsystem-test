import express from 'express'
import userController from '../controllers/user.controller'
import userDto from '../dtos/user.dto'
import { authMiddleware, authReaderMiddleware } from '../middleware/auth.middleware'
import { bodyValidateMiddleware } from '../middleware/request.middleware'
import { RoleEnum } from '../shared/enums'
const router = express.Router()
router.route('/')
// Create User
  .post([
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    authReaderMiddleware,
    bodyValidateMiddleware(userDto.createUserSchema)
  ], userController.create)
  // Find All Users
  .get([
    authMiddleware([RoleEnum.LIBRARY_OP]),
    authReaderMiddleware
  ], userController.findAll)
router.route('/:id')
// Find User By Id
  .get([
    authMiddleware([RoleEnum.LIBRARY_OP]),
    authReaderMiddleware
  ], userController.findById
  )
  // Update User
  .put([
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    authReaderMiddleware,
    bodyValidateMiddleware(userDto.updateUserSchema)
  ], userController.update
  )
  // Delete User
  .delete([
    authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP]),
    authReaderMiddleware,
    bodyValidateMiddleware(userDto.updateUserSchema)
  ], userController.remove)

// get Books mark list
router.get('/bookmarks/:id', [
  authReaderMiddleware,
  authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP])
], userController.getBookMarkList)

// get Rented Books list
router.get('/rented-list/:id', [
  authReaderMiddleware,
  authMiddleware([RoleEnum.READER, RoleEnum.LIBRARY_OP])
], userController.getRentedBooksList)

// get Rented Books list
router.put('/rent-book/:id', [
  authReaderMiddleware,
  authMiddleware([RoleEnum.LIBRARY_OP])
], userController.rentBook)

export default router
