const UserModel = require('../users/model')
const authmodel = require('./model')
const tokenService = require('./token')


exports.login = async (req,res)=>{
    const {email,password} = req.body;
   
    if(!(email,password)){
        res.send({
            success:false,
            message:"you should enter email and password",
            
        })
    }

       const user = await UserModel.findUserByCredential(email,password)
     
    if(!user){
        res.send({
            success:false,
            message:"mail or password is wrong"
        })
    }
    //const uid = uuidv1();
    const token = tokenService.generate({
         userid:user.id
        
    });
       //console.log(user.id)
    const setTokenTOMysql = authmodel.saveTokenInMysql(token,email,password);
    res.send({
        success:true,
        token,
        setTokenTOMysql,
        user
    })
    return token;
}


/*exports.setTokenTOMysql = async (req,res)=>{
const {token,email,password} = req.body
const getToken = authmodel.saveTokenInMysql(token,email,password)
res.send({
    success:true,
    message:"updated",
    getToken
})

}
*/
