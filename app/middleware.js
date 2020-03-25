const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload');

module.exports = (app)=>{

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: false}))
    app.use(fileUpload());
}