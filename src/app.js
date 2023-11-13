const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
require('dotenv').config()

const healthcheckRouter = require('./routes/healthcheck')
const productsRouter = require('./routes/products')
const sendEmailRouter = require('./routes/sendEmail')

app.use(logger(formatsLogger))
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/', healthcheckRouter)
app.use('/send_order', sendEmailRouter)
app.use('/products', productsRouter)
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res) {
  res.status(500)
  res.render('error', { error: err })
}

module.exports = app
