"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSocket = void 0;
var client_action_handler_1 = require("./handlers/client-action.handler");
var game_socket_interface_1 = require("./interfaces/game-socket.interface");
var socket = require("socket.io");
var GameSocket = /** @class */ (function () {
    function GameSocket(server) {
        this.clientSockets = {};
        this.clientActionHandler = new client_action_handler_1.ClientActionHandler;
        this.socket = socket(server);
    }
    GameSocket.prototype.initialize = function () {
        var _this = this;
        this.socket.on('connection', function (clientSocket) {
            _this.registerSocket(clientSocket);
            _this.handleClientActions();
        });
    };
    GameSocket.prototype.handleClientActions = function () {
        var _this = this;
        Object.keys(this.clientSockets).forEach(function (clientId) {
            _this.refreshClientSockets(clientId);
            _this.clientActionHandler.handle(clientId);
        });
    };
    GameSocket.prototype.refreshClientSockets = function (clientId) {
        this.clientSockets[clientId].removeAllListeners();
        this.clientActionHandler.updateSockets(this.clientSockets);
    };
    GameSocket.prototype.registerSocket = function (clientSocket) {
        var clientId = clientSocket.handshake.query.playerId;
        if (Object.keys(this.clientSockets).length < 2) {
            this.addNewSocket(clientSocket, clientId);
        }
        else {
            this.clientSockets[clientId] = clientSocket;
        }
    };
    GameSocket.prototype.addNewSocket = function (clientSocket, clientId) {
        this.clientSockets[clientId] = clientSocket;
        clientSocket.emit(game_socket_interface_1.ServerAction.CONNECTED, clientId);
    };
    return GameSocket;
}());
exports.GameSocket = GameSocket;
