const jwt = require('jsonwebtoken')


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
    return jwt.sign(params,process.env.JTW_SECRET);
};

exports.verify=(token)=>{
    try {
       const payload= jwt.verify(token,process.env.JTW_SECRET)
       return payload

    } catch (error) {
        return false;
    }
}