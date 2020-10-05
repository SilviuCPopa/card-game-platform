"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientActionHandler = void 0;
var game_1 = require("../../src/game/components/game");
var player_1 = require("../../src/game/components/player");
var game_socket_interface_1 = require("../interfaces/game-socket.interface");
var game_action_handler_1 = require("./game-action.handler");
var ClientActionHandler = /** @class */ (function () {
    function ClientActionHandler() {
        this.readyPlayers = {};
        this.gameActionHandler = new game_action_handler_1.GameActionHandler();
    }
    ClientActionHandler.prototype.handle = function (clientId) {
        var _this = this;
        var clientSocket = this.sockets[clientId];
        clientSocket.on(game_socket_interface_1.ClientActions.PLAYER_READY, function (playerName) {
            _this.setPlayerReady(clientId, playerName);
        });
        clientSocket.on(game_socket_interface_1.ClientActions.START_GAME, function () {
            _this.startGame();
        });
        clientSocket.on(game_socket_interface_1.ClientActions.DISCONNECT, function () {
            if (_this.isSocketDefined(clientId)) {
                console.log('disconnected', clientId);
            }
        });
    };
    ClientActionHandler.prototype.updateSockets = function (sockets) {
        this.gameActionHandler.updateSockets(sockets);
        this.sockets = sockets;
    };
    ClientActionHandler.prototype.setPlayerReady = function (clientId, playerName) {
        if (!this.readyPlayers[clientId]) {
            this.readyPlayers[clientId] = new player_1.HumanPlayer(clientId, playerName);
        }
    };
    ClientActionHandler.prototype.isSocketDefined = function (id) {
        return !!this.sockets[id];
    };
    ClientActionHandler.prototype.startGame = function () {
        if (this.canStartGame()) {
            this.createGame();
            this.game.start();
        }
    };
    ClientActionHandler.prototype.createGame = function () {
        var players = Object.values(this.readyPlayers);
        this.game = new game_1.Game(players[0], players[1]);
        this.game.registerHandler(this.gameActionHandler);
    };
    ClientActionHandler.prototype.canStartGame = function () {
        var _a;
        return Object.values(this.readyPlayers).length === 2 && !((_a = this.game) === null || _a === void 0 ? void 0 : _a.isStarted());
    };
    return ClientActionHandler;
}());
exports.ClientActionHandler = ClientActionHandler;
