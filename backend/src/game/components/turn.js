"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turn = void 0;
var game_observables_properties_1 = require("../properties/game.observables.properties");
var Turn = /** @class */ (function () {
    function Turn(gameData, players) {
        this.gameData = gameData;
        this.players = players;
        this.setRandomPlayerTurn();
    }
    Turn.prototype.getCurrentPlayerTurn = function () {
        return this.activePlayer;
    };
    Turn.prototype.setPlayerTurn = function (player) {
        this.activePlayer = player;
        this.updateGameData({
            key: game_observables_properties_1.SET_TURN,
            value: player
        });
    };
    Turn.prototype.setOptionalPlayerTurn = function (player) {
        this.activePlayer = player;
        this.updateGameData({
            key: game_observables_properties_1.SET_OPTIONAL_TURN,
            value: player
        });
    };
    Turn.prototype.updateGameData = function (value) {
        this.gameData.setAction(value);
    };
    Turn.prototype.setRandomPlayerTurn = function () {
        var index = Math.floor(Math.random() * Math.floor(2));
        this.activePlayer = Object.values(this.players)[index];
    };
    return Turn;
}());
exports.Turn = Turn;
