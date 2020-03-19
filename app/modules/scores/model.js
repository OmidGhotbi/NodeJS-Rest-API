//const mysql = require('mysql2/promise');
const connection = require('../../../database/mysql/conncection')


exports.createTable = async ()=>{
    const usersData = 'CREATE TABLE IF NOT EXISTS scores(id INT PRIMARY KEY AUTO_INCREMENT,score INT ,uid VARCHAR(255)NOT NULL) ';
    const db =await connection();
      return db.query(usersData, function (err, result) {  
     if (err) throw err;  
     console.log("score Table created");  
     
     });  
   }


  exports.getScore = ()=>{

  const db = connection();
  db.query('SELECT score FROM scores',(err,result,fields)=>{

    if(err)throw err;
    return result[0]
  })
}

exports.SeerchUid =async (inputToken)=>{
  const db =await connection()
  const [result,fields] =await db.query('SELECT uid FROM users WHERE token = "'+ inputToken +'"')
    const resultValiue = Object.values(result)[0];
    const getUid = Object.values(resultValiue)[0];
    return getUid
}

exports.updateScore =async (inputUid,inputScore)=>{
  const db =await connection();
  try {
    const [result,fields] = await db.query("UPDATE scores SET score='"+inputScore+"' WHERE uid='"+ inputUid +"'")
      const resultValiue = Object.values(result)[0];
      const getScore = Object.values(resultValiue)[0];
      return getScore;
  }catch (error){
    console.error(error);
<<<<<<< HEAD
=======
    return "Somthing happen, unsuccess";
>>>>>>> 01d000f618319a86f3e4ccab1137e83d37113942
  }
}

//"UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
/*exports.updateScoreToTable = async (inpScore, inputUid, res)=>{
  let con = await connection();
  try {
    await con.query("UPDATE scores SET score='"+inpScore+"' WHERE uid='"+ inputUid +"'", function(err, result)
    {
      if (err) console.log(err)
      console.log(result);
      res.send({
        sucsess:true,
        message:'score add to table',
        result
      })
    })
  }catch (error){
    console.error(error);
  }
}*/