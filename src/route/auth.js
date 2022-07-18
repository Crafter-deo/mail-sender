const router = require('express').Router()
const authController = require('../controller/authController')

router.post('/register', authController.postRegister)

module.exports = router