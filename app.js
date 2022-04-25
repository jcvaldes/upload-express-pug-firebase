const { readdirSync } = require('fs')
const express = require('express')
const morgan = require('morgan')
const path = require('path')

const API_VERSION = process.env.API_VERSION || 'v1'
const environment = process.env.NODE_ENV || 'development'
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '5mb' }))

app.set('view engine', 'pug')
app.set('views', './views')
app.set(express.static('public'))

if (environment === 'development') {
  app.use(morgan('dev'))
}
readdirSync('./routes').map((r) =>
  app.use(`/api/${API_VERSION}`, require(`./routes/${r}`))
)
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Home' })
})
module.exports = app
