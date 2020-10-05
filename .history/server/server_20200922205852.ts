import express = require('express');
const socket = require("socket.io");

const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
const server = app.listen(3000, function () {
console.log('App is listening on port 3000!');
});

const io = socket(server);