const express = require('express')
const router = express.Router()

const ctrlWrapper = require('../middlewares')

const { healthcheck: ctrl } = require('../controllers')

router.get('/', ctrlWrapper(ctrl.healthcheck))

module.exports = router
