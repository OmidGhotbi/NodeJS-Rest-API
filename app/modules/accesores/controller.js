const model = require('./mode')
const getToken = require('../auth/token')



exports.updateAccesory =async (req,res)=>{
 const token = getToken.findToken(req)
 const inputUid =await model.getUid(token) ;
 const {inputItem} = req.body;
 const {inputItemValue} = req.body;
 const updateNewAccesory =await model.updateAccesories(inputUid,inputItem,inputItemValue);
 return res.send({
     success:true,
     message:'accesory is avalable',
     updateNewAccesory
 })
}