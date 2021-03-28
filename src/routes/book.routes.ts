import express from 'express'
import bookController from '../controllers/book.controller'
import bookDto from '../dtos/book.dto'
import { authMiddleware } from '../middleware/auth.middleware'
import { bodyValidateMiddleware } from '../middleware/request.middleware'
import { RoleEnum } from '../shared/enums'
const router = express.Router()

router.route('/')
  // Create
  .post([
    authMiddleware([RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(bookDto.createBookSchema)
  ], (req, res) => bookController.create(req, res))
  // Find All
  .get([
    authMiddleware([RoleEnum.LIBRARY_OP, RoleEnum.READER])
  ], (req, res) => bookController.findAll(req, res))

router.route('/:id')
  // Find One
  .get([
    authMiddleware([RoleEnum.LIBRARY_OP, RoleEnum.READER])
  ], (req, res) => bookController.findById(req, res))
  // Update
  .put([
    authMiddleware([RoleEnum.LIBRARY_OP]),
    bodyValidateMiddleware(bookDto.updateBookSchema)
  ], (req, res) => bookController.update(req, res))
  // Delete
  .delete([
    authMiddleware([RoleEnum.LIBRARY_OP])
  ], (req, res) => bookController.remove(req, res))

export default router
