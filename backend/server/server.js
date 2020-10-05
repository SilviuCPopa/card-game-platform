"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var game_socket_1 = require("./game.socket");
var SERVER_PORT = 3000;
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
var server = app.listen(SERVER_PORT, function () {
    console.log('App is listening on port 3000!');
});
var gameSocket = new game_socket_1.GameSocket(server);
gameSocket.initialize();
