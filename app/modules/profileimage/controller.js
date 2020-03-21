const getService = require('./service')
const imageModel =require('./model')
const tokenservice = require('../auth/token')
const fs = require('fs')
const path  = require('path')
var sizeOf = require('image-size');



exports.encodeImage =async(req,res,next)=>{
    
  const {file} = req.files;
  if(!(file)){
   return res.send('name of key in body is *file*')
  }
    const fileData = file.data

      if(!(file.mimetype == 'image/jpeg') && !(file.mimetype == 'image/png') && !(file.mimetype == 'image/jpg')){
        return res.send({
            success : false,
            message:"your file is not image",
        })
      }else
      if(file.size > 70000){
        return res.send({
            success : false,
            message:'the image size is bigger than 70KB',
        })
      }else if(file.size < 70000){

        const imageCode =  getService.base64encoder(fileData)
        const imageOrginalName = req.files.file.name;
        const {mimetype} = req.files.file;
        const {size} = req.files.file;  
        let dimensions = sizeOf(fileData);
        const sizeWidth =dimensions.width;
        const sizeHeight =dimensions.height;
        const token  = tokenservice.findToken(req)
        const saveImage =await imageModel.setImage(imageCode,imageOrginalName,mimetype,size,sizeWidth,sizeHeight,token)

        fs.writeFileSync(path.join(__dirname,'../../storage/profileImage',imageOrginalName), fileData);
        //fs.sta(path.join(__dirname,'../../storage/profileImage',imageOrginalName), fileData)
        return res.send({
            success : true,
            message:'thats good!...',
            saveImage
        })
      }    
} 


exports.decodeShowImageprofile = async (req,res)=>{
  console.log('Request URL:', req.url, req.method)
  const token  = tokenservice.findToken(req)
  exports.getToken = token
  console.log(token)
  const imageInformation =await imageModel.getImageName(token)
  return res.send({
    success : true,
    message:'thats good!...',
    imageInformation,
})
} 