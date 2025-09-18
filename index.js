import express from 'express'
import connectDB from './db/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import auth from './routes/auth.js'
import movie from './routes/movies.js'

dotenv.config()
const app = express()
// console.clear()

app.use(express.json())
app.use(cors())
connectDB()
const port = process.env.PORT || 3000

app.use('/api/auth', auth)
app.use('/', movie)

app.listen(port, () => {
    console.log(`server running on ${port}`)
})