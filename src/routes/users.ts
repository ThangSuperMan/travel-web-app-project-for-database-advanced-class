import express, { Request, Response } from 'express'
const router = express.Router()

// Login Page
router.get("/login", (req: Request, res: Response) => {
  console.log("login router")
  res.render("login")
})

// Register Page
router.get("/register", (req: Request, res: Response) => {
  console.log('register router')
  res.render("register")
})

interface FormError {
  msg: string
}

// Register Handle
router.post("/register", (req: Request, res: Response) => {
  console.log(req.body)
  const { name, email, password, confirmPassword } = req.body
  console.log(name)
  console.log(email)
  console.log(password)
  console.log(confirmPassword)

  let errors: FormError[] = []

  // Check required fields
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please fill in all fields" })
  }

  // Check password match
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords dot not match" })
  }

  // Check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 charaters" })
  }

  console.log(`Number of errors: ${errors.length}`)

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  } else {
    res.send('Pass')
  }
})

export default router
