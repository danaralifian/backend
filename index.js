// app.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const config = require('./config/app.config')
const { pusher } = require('./config/app.config')

//routes
const route = require('./routes/routes.config')
const authRoute = require('./authorization/authorization.route.config')
//test routes
const testRoutes = require('./test/routes.test')

//init models
const ChatModel = require('./chat/models/chat.models')

express.static(path.join(__dirname, '/'))
// Create Express app
const app = express()
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  next()
})

//CONFIGURATION  MONGODB ===> source uri database
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

//connection for pusher
const db = mongoose.connection;

db.once("open", ()=>{
  console.log('stream connected')
  const chatCollection = db.collection('chats')
  const changeStream = chatCollection.watch()
  changeStream.on("change", (change)=>{
    console.log(change)
    if(change.operationType === 'insert'){
      const msgDetails = change.fullDocument;
      // messages ==> is channel
      pusher.trigger('messages', 'inserted', msgDetails)
    }else{
      console.log('Err trigger pusher')
    }
  })
})

//adding route 
authRoute(app)
route(app)
testRoutes(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is listening on port 5000");
});