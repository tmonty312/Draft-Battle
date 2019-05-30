require('dotenv').config()

// const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
// const massive = require('massive')
const session = require('express-session')

const port = process.env.SERVER_PORT 

const app = express() 

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

app.use(bodyParser.json())

app.use(express.static(`${__dirname}/../build`))




app.listen(port, ()=>console.log('I am listening on',port))


