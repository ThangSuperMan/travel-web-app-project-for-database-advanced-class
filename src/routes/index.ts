import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.render('welcome')
})

router.get('/dashboard', (req: Request, res: Response) => {
  res.render('dashboard')
})

export default router
