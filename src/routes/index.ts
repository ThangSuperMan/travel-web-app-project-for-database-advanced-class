import express, { Request, Response } from 'express'
import { ensureAuthenticated } from '../config/auth'
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.render('welcome')
})

router.get('/dashboard', ensureAuthenticated, (req: Request, res: Response) => {
  console.log('dashboard get method')
  res.render('dashboard')
})

export default router
