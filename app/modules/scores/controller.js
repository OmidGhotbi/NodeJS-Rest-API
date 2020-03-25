const scoresModel = require ('./model')
const connection = require('../../../database/mysql/conncection')
const tokenService = require('../auth/token')
const serviceValidate = require('./service')

exports.CreateScoreTable =  (req,res)=>{

    const newCtreatCsores = scoresModel.createTable();
    res.send({
        sucsess:true,
        message:"table is created",
        newCtreatCsores
    })

}


exports.addScore = async (req,res)=>{
  try {
        const inputToken = await tokenService.findToken(req);
        const checkUid = await scoresModel.SeerchId(inputToken);
        console.log(checkUid)
        const {score} = req.body;
        const {scoreFiled} = req.body;
        const valid = false

        if(!(score , scoreFiled)){
            res.send({
                sucsess:false,
                message:"there are not score and scoreFiled on your body",
            })
            return
        }

        const validates = serviceValidate;
        
        for(let i =0;i<validates;i++){
            if (!valid) 
            res.send({
                sucsess:false,
                message:"input filed not acceptable",
            })
       if (validates[i] == scoreFiled) {
                valid = true
            }
        }
           
       
        
      
        const addnewScore =await scoresModel.updateScore(checkUid,score,scoreFiled);
        console.log(score)
        res.send({
            sucsess:true,
            message:"updated",
            score:addnewScore,
       })
       } catch (error) {
        console.log( error);       
    }
}
