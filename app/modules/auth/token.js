const jwt = require('jsonwebtoken')
const config = require('./config')

exports.findToken = (req)=>{

    if (!('authorization' in req.headers)){
        
        return false
    }
    const {authorization} = req.headers;
    const [prefix, token] = authorization.split(' ');
    if(!token){
        return false
    }
    return token;
}

exports.generate = (params)=>{
    return jwt.sign(params,process.env.JTW_SECRET,{expiresIn: {"tokenLife": 900}});
};

exports.verify=(token)=>{
    try {
       const payload= jwt.verify(token,process.env.JTW_SECRET)
       return payload

    } catch (error) {
        return false;
    }
}