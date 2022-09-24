import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postsRouter from './routes/postRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const PORT = process.env.PORT || 5000

// const DB_USERNAME = 'fotismenos'
// const DB_PASSWORD = 'fotismenos007'
// const CONNECTION_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.qy6uw.mongodb.net/?retryWrites=true&w=majority`

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
.catch(err => console.log(`${err} did not connect`))

/* Ketma-ketlik muhim yuqoridagi configlar va pastdagi routelar */
app.use('/posts', postsRouter)
app.use('/user', userRouter)
app.use('/', (req, res) => res.status(200).json({ message: 'Bismillah, Memories-Comments API' }))