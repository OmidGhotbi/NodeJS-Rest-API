const express = require('express')
const encodeController = require('./controller')

const router = express.Router()

router.post('/',encodeController.encodeImage);
router.get(`/show`,encodeController.decodeShowImageprofile);


module.exports = router;