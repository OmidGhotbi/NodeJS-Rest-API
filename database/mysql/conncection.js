const mysql = require('mysql2/promise');

const connection =async ()=>{
    var con =await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "diringame"
      });
      const usersData =await 'CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255)NOT NULL UNIQUE,fulname VARCHAR(255)NOT NULL UNIQUE,email VARCHAR(255)NOT NULL UNIQUE,uid VARCHAR(255)NOT NULL,password VARCHAR(255)NOT NULL, token VARCHAR(255)NOT NULL) ';
      con.query(usersData, function (err, result) {  
        if (err)throw err;
        //console.log(result);
      })

      const usersDataScoures =await 'CREATE TABLE IF NOT EXISTS scores(id INT PRIMARY KEY AUTO_INCREMENT,score INT ,uid VARCHAR(255)NOT NULL) ';
       con.query(usersDataScoures, function (err, result) {  
       if (err) throw err;  
            //console.log(result);
        })
  // Creat All tables here if notexist
      //console.log('connected to database');
      return con;
}

module.exports = connection;