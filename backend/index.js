import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import cors from 'cors'
import booksRoute from './routes/booksRoute.js'

const app = express()

app.use(express.json()) // middleware for parsing request body

// Middleware for handling CORS Policy
// Option 1: Allow all Origins with Default of cors(*)
app.use(cors()) 

// Option 2: Allow custom origins - best method
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// })) 

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
