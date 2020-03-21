const express = require('express');
const accessoryController =require('./controller') 
const router = express.Router()

router.post('/input',accessoryController.updateAccesory)

module.exports=router