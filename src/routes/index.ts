import express from 'express'
import authController from '../controllers/auth.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import mainService from '../services/main.service'
import { RoleEnum } from '../shared/enums'
import bookRoutes from './book.routes'
import userRoutes from './user.routes'

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))
router.get('/populate-db', authMiddleware([RoleEnum.ADMIN]), mainService.populateDB)

// Auth Routes
router.post('/singin', authController.singIn)

// Books Routes
router.use('/book', bookRoutes)

// User Router
router.use('/user', userRoutes)

export default router
