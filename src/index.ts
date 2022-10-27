import express, { Request, Response } from 'express'
import path from 'path'
import commonRouter from './routes/index'
import userRouter from './routes/users'

const app = express()
const port = 3001

console.log('hello from node ts')

// Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Load static contents
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', commonRouter)
app.use('/users', userRouter)

app.listen(port, () => {
  console.log(`Listenning on the port: ${port}`)
})
