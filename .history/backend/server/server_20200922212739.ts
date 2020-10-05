import express = require('express');
const socket = require("socket.io");

const SERVER_PORT = 3000;

const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
const server = app.listen(SERVER_PORT, function () {
console.log('App is listening on port 3000!');
});

const io = socket(server);

io.on("connection", (socket: any) => {
    console.log("Made socket connection");
});