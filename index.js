// app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Client } = require('pg')
const { Pool } = require('pg')
const pg = require('pg')

const config = require('./config/app.config')

// Create Express app
const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

var connectionString = config.DB_URI

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
console.log('connected to db')

// client.connect(connectionString, function(err, client, done) {
//   console.log('connected to db')
//   client.query('SELECT * FROM your_table', function(err, result) {
//      done();
//      if(err) return console.error(err);
//      console.log(result.rows);
//   });
// })

app.get('/', (req,res)=>{
  res.send('Welcome to API')
})

//adding route configuration

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log("Server is listening on port 5001");
});