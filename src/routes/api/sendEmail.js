const express = require('express')
const router = express.Router()

const ctrlWrapper = require('../../middlewares')

const { sendEmail: ctrl } = require('../../controllers')

router.post('/', ctrlWrapper(ctrl.sendEmail))

module.exports = router
