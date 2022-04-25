const ProductPostController = require('../controllers/views/ProductPostController')
const uploadImage = require('../middlewares/firebase')
const express = require('express')
const multer = require('multer')

// Para subir en una carpeta uploads del propio servidor
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
// })
const storage = multer.memoryStorage({
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const router = express.Router()
// para subir localmente en el servidor sacar uploadImage
router.post(
  '/products',
  [upload.single('imageupload'), uploadImage],
  ProductPostController.createProduct
)

module.exports = router
