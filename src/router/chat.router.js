const { Router } = require('express')
const { getMessages } = require('./../controllers/bd/ChatController')

const router = Router()

router.get('/',getMessages)

module.exports = router