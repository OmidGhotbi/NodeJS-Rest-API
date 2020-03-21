
const connection = require('../../../database/mysql/conncection')


exports.getUid = async(token)=>{
    const db = await connection();
    const[result] = await db.query('SELECT uid FROM users WHERE token = ?',[token])
    const resultValiue = Object.values(result)[0];
    const getId = Object.values(resultValiue)[0];
    return getId

}

exports.updateAccesories =async (inputUid,inputitem,inputItemValue)=>{
    const db = await connection();
    const [result,fields] = await db.query("UPDATE accesores SET "+inputitem+"="+inputItemValue+" WHERE uid=?", [inputUid])
 return result 
}