
const conncection= require('../../../database/mysql/conncection')


exports.createTable = async ()=>{
 const usersData = 'CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255)NOT NULL UNIQUE,fulname VARCHAR(255)NOT NULL UNIQUE,email VARCHAR(255)NOT NULL UNIQUE,uid VARCHAR(255)NOT NULL,password VARCHAR(255)NOT NULL, token VARCHAR(255)NOT NULL) ';
 const db = await conncection();
   return db.query(usersData, function (err, result) {  
  if (err) throw err;  
  console.log("Table created");  
  
  });  
}


exports.createUser = async (newUserData)=>{
    
    const db =await conncection();
    try {
      const [results,fields] = await db.query('INSERT INTO users SET ? ',[newUserData])
    
    } catch (error) {
      return error
    }
    
    await db.query('INSERT INTO scores SET uid=? ',[Object.values(newUserData)[3]])
    await db.query(' SELECT * FROM `scores` WHERE 1 ')
   return results.insertId;
}


exports.findUserByCredential = async(email,password)=>{
const db = await conncection();
const[rows,fields] = await db.query('SELECT * FROM users WHERE email =? AND password =?',[email,password])
console.log(rows[0])
return rows[0]

}

exports.deleteUser=async (id)=>{
  const db = await conncection()
  const [result,fields]=await db.query("DELETE FROM users WHERE id=?",[id])
  return result.affectedRows > 0;
}