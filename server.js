// app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pg = require('pg')

const routes = require('./routes/index.js')
// Create Express app
const app = express()

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

//adding route
routes(app)

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log("Server is listening on port 5001");
});