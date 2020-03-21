const fs = require('fs')
const path  = require('path')
const imageModel =require('./model')
const tokenservice = require('./controller')


  exports.base64encoder = (file)=>{
      const buffer =  new Buffer(file).toString('base64');
      return buffer

}

 

exports.base64decoder =async (file)=>{
  const token = tokenservice.getToken;
 const imageName =await imageModel.getImageName(token)
 const valueCodes = Object.values(imageName)[0]
 const valueCode = Object.values(valueCodes)[0]
  const buffer =  new Buffer(file,'base64');
  fs.writeFileSync(path.join(__dirname,'../../storage/profileImage',valueCode), buffer);

}