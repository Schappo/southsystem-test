import express from 'express'
import bookController from '../controllers/book.controller'
import bookDto from '../dtos/book.dto'
import { bodyValidateMiddleware } from '../middleware/body.middleware'
const router = express.Router()

router.route('/')
  // Create Book
  .post(
    bodyValidateMiddleware(bookDto.createBookSchema), (req, res) => bookController.create(req, res)
  )
  // Find All Books
  .get(
    (req, res) => bookController.findAll(req, res)
  )
router.route('/:id')
  // Find Book By Id
  .get((req, res) => bookController.findById(req, res))
  // Update Boody
  .put(bodyValidateMiddleware, (req, res) => bookController.update(req, res))
  // Delete Book
  .delete((req, res) => bookController.remove(req, res))

export default router
