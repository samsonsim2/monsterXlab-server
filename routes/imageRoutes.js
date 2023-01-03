import { getImages, createImage } from '../controllers/imageController.js'

import { uploadImage } from '../controllers/uploadController.js'

import express from 'express'
const router = express.Router()

router.route('/').post(createImage).get(getImages)
router.route('/uploads').post(uploadImage)

export default router
