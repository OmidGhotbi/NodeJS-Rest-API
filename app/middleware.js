const bodyparser = require('body-parser')

module.exports = (app)=>{

    app.use(bodyparser.json())
}