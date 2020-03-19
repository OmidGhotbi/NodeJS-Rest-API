const tokenService = require('./token')
exports.auth=(req,res,next)=>{

    const token = tokenService.findToken(req);
    if(!token){
        res.status(401/*authorization*/).send({
            success: false,
            message:'you dont have any permission to this resource' ,
            token
        })
    }
    const payload = tokenService.verify(token);
    if(!payload){
        res.status(401/*authorization*/).send({
            success: false,
            message:'you dont have any permission to this resource' ,
            token
        })
    
    }
    return next();
}