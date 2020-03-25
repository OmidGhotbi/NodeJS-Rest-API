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


exports.SeerchId =async (inputToken)=>{
  const db = await connection()
  const [result,fields] =await db.query('SELECT uid FROM users WHERE token ="'+inputToken+'"',)
  const resultValue = Object.values(result)[0];
  const getuId = Object.values(resultValue)[0];
    return getuId
}

exports.updateScore =async (inputId,inputScore,inputField)=>{
  const db = await connection();
  //await db.query("UPDATE scores SET "+inputField+"="+inputScore+" WHERE uid=?", [inputId])
   await db.query("UPDATE scoresmemory SET "+inputField+"="+inputScore+", UPDATE_TIME = NOW() WHERE uid='"+inputId+"'")//db.query("UPDATE scoresmemory SET score = (SELECT ('score','scoreCup','scoreTeam','scoreTeamDistance','scoreTeamEvent,scoreChalenge1,scoreChalenge1,scoreChalenge2,scoreChalenge3) FROM scores WHERE scores.uid = scoresMemory.uid) WHERE (select UPDATE_TIME from INFORMATION_SCHEMA.TABLES where TABLE_NAME = 'scores' )> (NOW() - INTERVAL 5 MINUTE )")

  setTimeout (async() => {
    console.log('update score table from memory')
    db.query("UPDATE scores SET score=scoresmemory.score, scoreCup=scoresmemory.scoreCup WHERE (scores.uid = scoresmemory.uid AND scorememory.UPDATE_TIME > (NOW() - INTERVAL 1 MINUTE ))")
  }, 10000);
}
