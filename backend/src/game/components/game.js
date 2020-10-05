"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var deck_1 = require("./deck");
var game_data_1 = require("./game-data");
var move_1 = require("./move");
var pot_1 = require("./pot");
var round_1 = require("./round");
var Game = /** @class */ (function () {
    function Game(player1, player2) {
        this.players = {};
        this.deck = new deck_1.Deck();
        this.pot = new pot_1.Pot();
        this.gameStarted = false;
        this.players[player1.getId()] = player1;
        this.players[player2.getId()] = player2;
        this.gameData = new game_data_1.GameData();
    }
    Game.prototype.start = function () {
        this.deck.initialise();
        this.startRound();
        this.gameStarted = true;
    };
    Game.prototype.move = function (player, card) {
        var move = new move_1.Move(this.pot, player, card);
        move.makeMove();
        if (move.isFinalMove() && !this.round.canStartAnotherRound()) {
            this.winner = this.getHigherPlayerScore();
        }
        else {
            this.round.handleMove(move);
        }
    };
    Game.prototype.registerHandler = function (handler) {
        this.getGameData().registerObservers(handler);
    };
    Game.prototype.getPlayerById = function (id) {
        return this.players[id];
    };
    Game.prototype.getWinner = function () {
        return this.winner;
    };
    Game.prototype.getGameData = function () {
        return this.gameData;
    };
    Game.prototype.isStarted = function () {
        return !!this.gameStarted;
    };
    Game.prototype.startRound = function () {
        this.round = new round_1.Round(this.gameData, this.players, this.pot, this.deck);
        this.round.startRound();
    };
    Game.prototype.getHigherPlayerScore = function () {
        var player1 = Object.values(this.players)[0];
        var player2 = Object.values(this.players)[1];
        if (player1.getScore() > player2.getScore()) {
            return player1;
        }
        return player2;
    };
    return Game;
}());
exports.Game = Game;
