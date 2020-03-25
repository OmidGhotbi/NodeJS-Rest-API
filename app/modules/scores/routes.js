const express = require('express')
const scorecontroller = require('./controller')





const router = express.Router()
//router.post('/createTable',scorecontroller.CreateScoreTable)

router.post('/add',scorecontroller.addScore)
module.exports = router;