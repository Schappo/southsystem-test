import express from 'express'
import bookController from './controllers/book.controller'
import userController from './controllers/user.controller'

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))

// Books Routes
router.route('/book/:id')
  .get((req, res) => bookController.findById(req, res))
  .put((req, res) => bookController.update(req, res))
  .delete((req, res) => bookController.remove(req, res))
router.route('/books')
  .post((req, res) => bookController.create(req, res))
  .get((req, res) => bookController.findAll(req, res))

// User Router
router.route('/user/:id')
  .get((req, res) => userController.findById(req, res))
  .put((req, res) => userController.update(req, res))
  .delete((req, res) => userController.remove(req, res))
router.route('/user')
  .post((req, res) => userController.create(req, res))
  .get((req, res) => userController.findAll(req, res))

export default router
