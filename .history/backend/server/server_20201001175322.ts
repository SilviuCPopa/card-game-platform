import express = require('express');
import { GameSocket } from './game.socket';

const SERVER_PORT = 3000;

const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
const server = app.listen(SERVER_PORT, function () {
    console.log('App is listening on port 3000!');
});

const gameSocket = new GameSocket(server);
gameSocket.initialize();
