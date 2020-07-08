const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const urlerncodedParser = bodyparser.urlencoded({limit: '20mb', extended: true, parameterLimit: 1000})
const http = require('http')
const server = http.createServer(app)
const routes = require('./router')
const mongoose = require('mongoose')
const { urlencoded } = require('express')
const environment = require('dotenv').config()

// require the script for automated database backups
global.CronJob = require('./database_backuptimer.js')

app.use(express.urlencoded({extended: false}))

// prevent cors errors when accessing in the client application.
app.use(cors())

app.use(bodyparser.json({limit: '20mb'}))
app.use(urlerncodedParser)


// log route access
const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`)
    res.on('finish', () => {
        console.info(`${res.statusMessage}; ${res.get('Content-Length') || 0} bytes sent`) 
    })
    next()
}

app.use(logRequestStart)

// connect to database
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useCreateIndex: true}).then(r =>{
  console.info('Database Connected...')
}).catch(r =>{ console.log('Database Not Connected!!')})


// register routes
routes.register(app);

// start server and listen on specified port
server.listen(process.env.PORT, () => {
    console.info('Server running on port:' + process.env.PORT)
}) 


module.exports = app
