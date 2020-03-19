module.exports = (app)=>{

    app.use((req,res)=>{

        res.status(402).send({
            massage:'address is wrong'
        }
        )
    })
}
console.log('hi')
