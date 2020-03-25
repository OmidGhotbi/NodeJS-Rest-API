const UserModel = require('../users/model')
const authmodel = require('./model')
const tokenService = require('./token')
const cripto = require('../../../crypto')


exports.login = async (req,res)=>{
    const {email,password} = req.body;
   
    

    if(!(email,password)){
        res.send({
            success:false,
            message:"you should enter email and password",
            
        })
    }
        const encPass = cripto.encrypt(password)
       const user = await UserModel.findUserByCredential(email,encPass)
     
    if(!user){
        res.send({
            success:false,
            message:"mail or password is wrong"
        })
    }  

   
    const token = tokenService.generate({
         userid:user.id
        
    });
    const setTokenTOMysql = authmodel.saveTokenInMysql(token,email,encPass);


    res.send({
        success:true,
        token,
        setTokenTOMysql,
    })
    return token;
}


