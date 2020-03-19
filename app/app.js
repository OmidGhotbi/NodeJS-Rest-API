const express = require('express');

const app = express();

require('./middleware')(app)
require('./router')(app)
require('./402')(app);
const runApp = ()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app is running on port ${process.env.PORT}`)
    })
}
module.exports = runApp;