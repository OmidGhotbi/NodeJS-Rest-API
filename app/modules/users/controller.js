const userModel = require('./model')
const uuidv1 = require('uuid/v1')
const cripto = require('../../../crypto')
var validator = require("email-validator");


exports.index = (req,res)=>{
    const createtable = userModel.createTable()

    res.status(201).send({
        success:true,
        message:'table created',
        createtable,
        
    })
}


exports.create =async (req,res)=>{
    const uid = uuidv1()
     
     const newUserData = {
         username: req.body.username,
         fulname: req.body.fulname,
         email : req.body.email,
         uid: uid,
         password :cripto.encrypt(req.body.password),
         token : "getToken",
     }
     try {
       
        const getUser =await userModel.createUser(newUserData)
        return res.status(201).send(
            {
            success:true,
            message:'your data insert successfully',
            getUser
        })
     } catch (error) {
        (error.code === "Duplicate entry '"+newUserData.username+"' for key 'username'" || "Duplicate entry '"+newUserData.email+"' for key 'email'") 

           return res.send(
                {
                success:false,
                message:'there was your data before',
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


exports.MemoryTabling =async(req,res)=>{
    const memoryEngine =await userModel.TestMemoryTabling();
    res.send({
            success:true,
            messege:"data input to memory",
            id: memoryEngine
        }
    )
}

exports.innerjoin=async(req,res)=>{
 
    const showInner =await userModel.testInnerJoin();
    console.log(showInner)
    res.send({
        success:true,
        messege:"data inner to watch",
        id: showInner
    })
}



exports.makeuser= (req,res)=>{

    const makenewuser = userModel.makeuser(); 
    let {username}= req.body;
    let {fulname} = req.body;
    let {password}= req.body
    let {email}= req.body;
    let checkgmail =()=>{
        let emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let testEmail= emailRegexp.test(email);
         if(testEmail === true ){
            return email
         } else{
             return res.send({
             messege:'your email is encurrect'
         })}
        }
     let gmail = checkgmail()
    const user = new makenewuser({
        username : username,
        fulname:fulname,
        email:gmail,
        password:password,
    })
    console.log(req.headers)

    user.save().then(result =>{
        res.status(201).send({
            success:true,
            message: 'data saved successfully',
            result: result.username,
        })
    }).catch(err =>{
        if(err.keyPattern = {username: 1}){
                            res.send({
                                success:false,
                                messege:'this username or email alredy existed!',
                                err: err
                            })  
                              
                           }        
    })
    

}

exports.findUserUpdate = (req,res)=>{

    const user = userModel.makeuser();

     user.findOneAndUpdate({username:req.body.username},{password:req.body.password},(err,result)=>{
        res.send({
                  result: result.password
                 })
     })

    }   
     
    exports.findUserUpdateed = (req,res)=>{

        const user = userModel.makeuser();
         user.find({},(err,result)=>{
            res.send({
                      result: result
                     })
         })
    
        }   

        exports.findUserdeleted = (req,res)=>{

            const user = userModel.makeuser();
             user.remove({},(err,result)=>{
                res.send({
                          result: result
                         })
             })
        
            }   