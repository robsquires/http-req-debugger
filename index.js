const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const fs = require('fs')
const http = require('http')
const https = require('https')

// this file path might be different for you
const privateKey  = fs.readFileSync(`${__dirname}/../ft-app/server/dev-insecure.key`, 'utf8')
const certificate = fs.readFileSync(`${__dirname}/../ft-app/server/dev-insecure.crt`, 'utf8')
var credentials = {key: privateKey, cert: certificate}


const app = express()

const allowedOrigin = process.argv[2];
console.log('cors: allowed origin', allowedOrigin);

const c = cors({
    origin: allowedOrigin,
    credentials: true
})
 
app.options('*', c)

app.post('/ingest', c, bodyParser.json(), function (req, res) {
    if (req.body.category === 'cta') { // prints CTA events only
        console.log(req.body)
    }
    res.json();
})
 
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// these ports might be different for you
httpServer.listen(4001);
httpsServer.listen(4000);