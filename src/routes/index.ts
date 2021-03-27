import express from 'express'
import authController from '../controllers/auth.controller'
import bookRoutes from './book.routes'
import userRoutes from './user.routes'

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))

// Auth Routes
router.post('/singin', authController.singIn)

// Books Routes
router.use('/book', bookRoutes)

// User Router
router.use('/user', userRoutes)

export default router
