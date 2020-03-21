
const conncection= require('../../../database/mysql/conncection')
const conncetMongo= require('../../../database/mongodb/connection')



exports.createTable = async ()=>{
 const usersData = 'CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255)NOT NULL UNIQUE INDEX,fulname VARCHAR(255)NOT NULL'+
 ' ,email VARCHAR(255)NOT NULL UNIQUE INDEX,uid VARCHAR(255)NOT NULL,password VARCHAR(255)NOT NULL, token VARCHAR(255)NOT NULL) ';
 const db = await conncection();
   return db.query(usersData, function (err, result) {  
  if (err) throw err;  
  console.log("Table created");  
  
  });  
}


exports.createUser = async (newUserData)=>{
    
    const db =await conncection();
    
      const [result] = await db.query('INSERT INTO users SET ? ',[newUserData])
    await db.query('INSERT INTO scores SET uid=? ',[Object.values(newUserData)[3]])
    await db.query('INSERT INTO usersMemory SET ? ',[newUserData])
    await db.query('INSERT INTO scoresMemory SET uid=? ',[Object.values(newUserData)[3]])
    await db.query('INSERT INTO accesores SET uid=? ',[Object.values(newUserData)[3]])
    await db.query('INSERT INTO profileimage SET uid=? ',[Object.values(newUserData)[3]])
    return result.insertId
  }


exports.findUserByCredential = async(email,password)=>{
const db = await conncection();
const[rows,fields] = await db.query('SELECT * FROM users WHERE email =? AND password =?',[email,password])
console.log(rows[0])
return rows[0]

}

exports.deleteUser=async (id)=>{
  const db = await conncection()
  const [result,fields]=await db.query("DELETE FROM scores WHERE id=?",[id])
  return result.affectedRows > 0;
}


exports.TestMemoryTabling = async()=>{
  const db = await conncection();

  await db.query('CREATE TABLE IF NOT EXISTS test78 ENGINE = MEMORY SELECT * FROM users')
  await db.query('CREATE TABLE IF NOT EXISTS test79 ENGINE = MEMORY SELECT * FROM scores')
 try {
  const[result,fields] = await db.query( ' SELECT username,email,score FROM test78 INNER JOIN test79  ON test78.uid = test79.uid');
  return result
 } catch (error) {
  // return error
  (error.code === "Unknown column 'users.uid' in 'on clause'")
   const[result,fields] = await db.query( ' SELECT username,email,score FROM test78 INNER JOIN scores  ON scores.uid = users.uid');
   return result
 }

}
//INSERT INTO `table2` SELECT * FROM `table1`;



exports.testInnerJoin = async()=>{
  const db = await conncection();
 const [result,fields]= await db.query('SELECT username,email,score FROM users INNER JOIN scores  ON scores.uid = users.uid')
 return Object.values(result)
}


exports.makeuser = ()=>{
  let makenewuser = conncetMongo
  return makenewuser;
}
