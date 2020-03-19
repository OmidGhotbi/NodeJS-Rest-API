const userModel = require('./model')
const uuidv1 = require('uuid/v1')
const tokenService = require('../auth/controller')
const {showData} = require('./presenter')


exports.index = (req,res)=>{
    const createtable = userModel.createTable()

    res.status(201).send({
        success:true,
        message:'table created',
        createtable,
        
    })
}


exports.create = async (req,res)=>{
    const uid = uuidv1()
    const getToken = tokenService.login()

     const newUserData = {
         username: req.body.username,
         fulname: req.body.fulname,
         email : req.body.email,
         uid: uid,
         password : req.body.password,
         token : getToken,
     }
     //const showSortData = showData()
    const getUser =await userModel.createUser(newUserData)
    
    if (getUser.message == "Duplicate entry 'farhad' for key 'username'")
    {
        res.status(201).send(
            {
            success:false,
            message:'your data insert unsuccessfully',
            
            error_message:getUser.message,
        })
    }else
    {
        res.status(201).send(
            {
            success:true,
            message:'your data insert successfully',
            
            id:getUser,
        })
    }

}

exports.delete = async(req,res)=>{
  const id = req.params.id;
  const deleteUserId = await userModel.deleteUser(id);
  return res.send({
      success:true,
      messege:"deleted user successfull",
      id: deleteUserId
  })
}