module.exports = (app)=>{

    app.use((req,res,next)=>{

        res.status(402).send({
            massage:'address is wrong'
        }
        )
    })
}

