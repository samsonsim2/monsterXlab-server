import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from '../db/connect.js'
const app = express()

import imageRouter from '../routes/imageRoutes.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
//middleware
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

app.get('/api', (req, res) => {
  res.send('welcome!')
})
app.use('/api/v1/images', imageRouter)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
