import path from 'path'
import { fileURLToPath } from 'url'
import Image from '../models/Image.js'
import { v2 as cloudinary } from 'cloudinary'

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,

    {
      use_filename: true,
      folder: 'monster-x-lab',
      gravity: 'center',
      height: 1500,
      width: 1150,
      crop: 'crop',
    }
  )

  console.log(result)
  return res.status(200).json({ image: { src: result.secure_url } })
}

const uploadImageLocal = async (req, res) => {
  const productImage = req.files.image
  const __filename = fileURLToPath(import.meta.url)

  const __dirname = path.dirname(__filename)
  const imagePath = path.join(
    __dirname,
    `../public/uploads/` + `${productImage.name}`
  )

  console.log(imagePath)

  await productImage.mv(imagePath)
  res.status(200).json({ image: { src: `/uploads/${productImage.name}` } })
}

export { uploadImage }
