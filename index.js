import express from 'express'
import connectDB from './db/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import auth from './routes/auth.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
connectDB()
const port = process.env.PORT || 3000

app.use('/api/auth', auth)

app.listen(port, () => {
    console.log(`server running on ${port}`)
})