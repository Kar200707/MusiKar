const express = require('express');
const dbConnect = require('./DB/dbConnection');
const runServer = require('./server/server');
const app = express();

dbConnect().then(p => runServer(app));

app.use(express.json());
console.log()
module.exports = app;