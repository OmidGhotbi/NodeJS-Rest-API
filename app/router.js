const userRoute = require('../app/modules/users/routes')
const authRoute = require('../app/modules/auth/routes')
const scoreRouter= require('./modules/scores/routes')
const {auth} = require('./modules/auth/middleware')

module.exports = (app)=>{
  
    app.use('/api/v1/users',userRoute)
    app.use('/api/v1/auth',authRoute)
    app.use('/api/v1/score',[auth],scoreRouter)
}