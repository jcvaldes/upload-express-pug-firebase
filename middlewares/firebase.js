const admin = require('firebase-admin')
const path = require('path')
const serviceAccount = require('../config/firebase-key.json')

const BUCKET = 'angularfotos-ad681.appspot.com'
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
})

const bucket = admin.storage().bucket(BUCKET)

const uploadImage = (req, res, next) => {
  // return new Promise((resolve, reject) => {
  const file = req.file
  if (!file) {
    reject('No image file')
  }
  let newFileName = `${Date.now()}${path.extname(file.originalname)}`

  let fileUpload = bucket.file(newFileName)

  const blobStream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  })

  blobStream.on('error', (error) => {
    throw new Error('Something is wrong! Unable to upload at the moment.')
  })

  blobStream.on('finish', async () => {
    await fileUpload.makePublic()
    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileUpload.name}`
    next()
  })

  blobStream.end(file.buffer)
}
module.exports = uploadImage
