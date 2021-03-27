import express from 'express'
import bookController from './controllers/book.controller'

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))

// Books Routes
router.route('/book/:id')
  .get((req, res) => bookController.findById(req, res))
  .put((req, res) => bookController.update(req, res))
  .delete((req, res) => bookController.remove(req, res))

router.route('/book')
  .post((req, res) => bookController.create(req, res))
  .get((req, res) => bookController.findAll(req, res))

export default router
