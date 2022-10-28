import express, { Request, Response } from 'express'
import path from 'path'
import db from './config/keys'
import mongoose from 'mongoose'
import commonRouter from './routes/index'
import userRouter from './routes/users'

const app = express()
const port = 3002

// Connect to Mongo
mongoose.connect(db.MongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Load static contents
app.use(express.static(path.join(__dirname, 'public')))

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', commonRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Listenning on the port: ${port}`)
})
