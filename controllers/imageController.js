import Image from '../models/Image.js'

const createImage = async (req, res) => {
  console.log(req.body)
  const product = await Image.create(req.body)
  res.status(200).json({ product })
}

const getImages = async (req, res) => {
  const Images = await Image.find({})
  res.status(200).json({ Images })
}

export { createImage, getImages }
