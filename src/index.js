const express = require('express')
const bodyParser = require('body-parser')
const route = require('./routes/route')
require('dotenv').config()

const {default : mongoose } = require('mongoose');
const blog = express()
blog.use(bodyParser.json())   

const PORT = process.env.PORT
const URL = process.env.MongoURL
mongoose.connect(
URL ,{  useNewUrlParser: true  }
).then(() => console.log( "MongoDb is connected" ) ).catch( err => console.log(err) )


blog.use('/', route)

blog.listen( PORT, function(){
console.log('Express app running on port ' + (PORT))
})