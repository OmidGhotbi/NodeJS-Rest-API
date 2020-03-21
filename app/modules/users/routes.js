const express = require('express')
const userController = require('./controller')
const {auth} = require('../auth/middleware')
const router = express.Router();
const create = 'create'
//router.post('/createTable',userController.index);
router.post('/create',userController.create);
router.delete('/delete:id',userController.delete)
router.get('/showmem',userController.MemoryTabling)
router.get('/inner',userController.innerjoin)
router.post('/set',userController.makeuser)
router.post('/updatePassword',userController.findUserUpdate)
router.get('/find',userController.findUserUpdateed)
router.get('/remove',userController.findUserdeleted)

module.exports = router;
 