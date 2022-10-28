import express, { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
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
    errors.push({ msg: "Password should be at least 6 characters" })
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
    // Validate passed
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          // User exists
          errors.push({ msg: "Email is already registered" })
          res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword,
          })
        } else {
          const newUser = new User({
            name,
            email,
            password,
          })

          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(newUser.password, salt);
          console.log(`salt: ${salt}`)
          console.log(`hash: ${hash}`)

          newUser.password = hash
          newUser.save()
            .then(user => {
              res.redirect("/login")
            })
            .catch(err => console.log(err))


          console.log('newUser')
          console.log(newUser)
          res.send("Hello")
        }
      })

  }
})

export default router
