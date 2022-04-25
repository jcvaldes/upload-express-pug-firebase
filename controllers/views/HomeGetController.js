const index = async (req, res) => {
  res.status(200).render('index') // Pinta datos en el pug
}

module.exports = {
  index,
}
