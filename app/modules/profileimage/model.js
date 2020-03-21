const connection = require('../../../database/mysql/conncection')


exports.setImage = async (imagebase64,imageOrginalName,mimtype,size,sizeWidth,sizeHeight,token)=>{
    const db =await connection();
    const [result,fields] =await db.query('UPDATE profileimage SET imagebase64 ="'+imagebase64+'" , imageOrginalName="'+imageOrginalName+'",mimtype ="'+mimtype+'" ,size ="'+size+'" ,sizeWidth ="'+sizeWidth+'" ,sizeHeight ="'+sizeHeight+'" WHERE uid = (SELECT uid FROM users WHERE token = "'+token+'" )');
    return result
}

exports.showImage =async (token)=>{
 const db =await connection();
 const [result,fields] =await db.query('SELECT imagebase64 FROM profileimage WHERE uid = (SELECT uid FROM users WHERE token = ? )',[token]);
 return result
}

exports.getImageName = async(token)=>{
    const db =await connection();
 const [result] =await db.query('SELECT imageOrginalName,mimtype,size,sizeWidth,sizeHeight,UPDATE_TIME,uid FROM profileimage WHERE uid = (SELECT uid FROM users WHERE token = "'+token+'" )');
 return Object.values(result)
}