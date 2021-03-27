import express from 'express'
import bookController from '../controllers/book.controller'
import bookDto from '../dtos/book.dto'
import { authMiddleware } from '../middleware/auth.middleware'
import { bodyValidateMiddleware } from '../middleware/body.middleware'
import { RoleEnum } from '../shared/enums'
const router = express.Router()

router.route('/')
  .post(bodyValidateMiddleware(bookDto.createBookSchema), (req, res) => bookController.create(req, res))
  .get((req, res) => bookController.findAll(req, res))

router.route('/:id')
  .get((req, res) => bookController.findById(req, res))
  .put([
    authMiddleware(RoleEnum.LIBRARY_OP),
    bodyValidateMiddleware(bookDto.updateBookSchema)
  ], (req, res) => bookController.update(req, res))
  .delete((req, res) => bookController.remove(req, res))

export default router
