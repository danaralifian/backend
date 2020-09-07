// app.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const serverless = require("serverless-http")
const config = require('../config/app.config')
const UsersController = require('../users/controllers/users.controller')
const route = require('../routes/routes.config')
const authRoute = require('../authorization/authorization.route.config')

// Create Express app
const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

//source uri database
const uri = config.db_uri
// make connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

app.get('/', (req,res)=>{
  res.send('Welcome to API')
})

//adding route configuration
route(app)
authRoute(app)

//for heroku
// const port = process.env.PORT || 5000

// app.listen(port, () => {
//     console.log("Server is listening on port 5000");
// });

module.exports = app;
module.exports.handler = serverless(app)