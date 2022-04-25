const Product = require('../../models/product')
const createProduct = async (req, res) => {
  try {
    const { firebaseUrl } = req.file || ''
    req.body.image = firebaseUrl
    const product = await new Product(req.body)
    await product.save()

    res.status(200).render('index')
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

module.exports = {
  createProduct,
}
