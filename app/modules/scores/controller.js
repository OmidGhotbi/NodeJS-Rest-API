const scoresModel = require ('./model')
const connection = require('../../../database/mysql/conncection')
const tokenService = require('../auth/token')

exports.CreateScoreTable =  (req,res)=>{

    const newCtreatCsores = scoresModel.createTable();
    
    res.send({
        sucsess:true,
        message:"table is created",
        newCtreatCsores
    })

}


exports.saveUid =async (req,res)=>{
    const db =await connection();
    console.log('connected to'+ db)

    await db.query("SELECT score FROM scores", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        const row = Object.values(result)[0]
        console.log(result);
        res.send({
            sucsess:true,
            message:"score is showing!",
            score:row
        }) 
        });
    
}
  

exports.addScore = async (req,res)=>{
   
    const inputToken = tokenService.findToken(req);
    const checkUid = await scoresModel.SeerchUid(inputToken)
    const {score} = req.body;
    const addnewScore = await scoresModel.updateScore(checkUid,score);
    res.send({
        sucsess:true,
        message:"update",
        addnewScore
    })
}