import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import flash from 'connect-flash'
import session from 'express-session'
import db from './config/keys'
import commonRouter from './routes/index'
import userRouter from './routes/users'

const app = express()
const port = 3001

// Connect to Mongo
mongoose.connect(db.MongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Load static contents
app.use(express.static(path.join(__dirname, 'public')))

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Init the session stored in server side
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))

app.use(flash())

// Global variables
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Loaded the Global variables')
  res.locals.successMessage = req.flash("success_msg")
  res.locals.errorMessage = req.flash("error_msg")
  next()
})

// app.use(flash())

// Routes
app.use('/', commonRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Listenning on the port: ${port}`)
})
