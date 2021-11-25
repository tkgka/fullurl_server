var fs = require('fs');
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
var https = require('https');
var certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');
var privateKey = fs.readFileSync('./sslcert/server.key', 'utf8');
var indexRouter = require('./routes/index');
var credentials = { key: privateKey, cert: certificate };
const port =  443 // https port
var express = require('express');
if (cluster.isMaster) { // 마스터 프로세스 식별
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // 코어 갯수만큼 워커 프로세스 생성
    }
    cluster.on("exit", () => {
        cluster.fork();
    });
} else {
    var app = express();
    app.set('views', __dirname + '/views');
    var httpsServer = https.createServer(credentials, app);

    app.use('/', indexRouter);

    httpsServer.listen(port, function () {
        console.log("https listen on", port)
    });
}