const userRoute = require('../app/modules/users/routes')
const authRoute = require('../app/modules/auth/routes')
const scoreRouter= require('./modules/scores/routes')
const {auth} = require('./modules/auth/middleware')
const imageRouter = require('./modules/profileimage/routes')
const accesoriRouter =require('./modules/accesores/routes')

module.exports = (app)=>{
  
    app.use('/api/v1/users',userRoute)
    app.use('/api/v1/auth',authRoute)
    app.use('/api/v1/score',[auth],scoreRouter)
    app.use('/api/v1/accesories',[auth],accesoriRouter)
    app.use('/api/v1/image',[auth],imageRouter)
}