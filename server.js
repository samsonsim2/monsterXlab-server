import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
const app = express()
import cors from 'cors'
import imageRouter from './routes/imageRoutes.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
//middleware
app.use(cors())
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

// pre flight cors
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   )
//   next()
// })
// app.use((req, res, next) => {
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }
//   next()
// })
// ------- end of pre flight cors

// const whitelist = [
//   'http://localhost:3000',
//   'https://monster-xlab-server.vercel.app',
// ]

// app.options('*', cors())

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }

// app.use(cors(corsOptions))

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
