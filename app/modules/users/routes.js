const express = require('express')
const userController = require('./controller')
const {auth} = require('../auth/middleware')
const router = express.Router();

//router.post('/createTable',userController.index);
router.post('/create',userController.create);
router.delete('/:id',userController.delete)
module.exports = router;