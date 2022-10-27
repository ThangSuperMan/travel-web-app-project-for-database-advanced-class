import express, { Request, Response } from 'express'
const router = express.Router()


// Login Page
router.get('/login', (req: Request, res: Response) => {
  res.send('Login')
})

// Register Page
router.get('/register', (req: Request, res: Response) => {
  res.render('register')
})

export default router
