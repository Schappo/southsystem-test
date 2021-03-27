import express from 'express'
import bookRoutes from './book.routes'
import userRoutes from './user.routes'

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))

// Books Routes
router.use(bookRoutes)

// User Router
router.use(userRoutes)

export default router
