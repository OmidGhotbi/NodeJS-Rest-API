const connection = require('../../../database/mysql/conncection')

exports.saveTokenInMysql = async (token,email,password)=>{
const db =await connection();
const [results , fields] =await db.query('UPDATE users SET token=? WHERE email=? AND password=?',[token,email,password])
 return results;
}

