import express, { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import passport from 'passport'

// Variables
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
  const { name, email, password, confirmPassword } = req.body
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
        console.log('User')
        console.log(user)
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

          newUser.password = hash
          newUser.save()
            .then(user => {
              console.log("Save user successfully")
              console.log(user)
              req.flash("success_msg", "You are now registered and can log in")
              res.redirect("/users/login")
            })
            .catch(err => console.log(err))
        }
      })

  }
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  function(req: Request, res: Response, next: NextFunction) {
    console.log('/users/login/ post method is being called!')
  })


export default router
