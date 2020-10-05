"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
var game_observables_properties_1 = require("../properties/game.observables.properties");
var turn_1 = require("./turn");
var Round = /** @class */ (function () {
    function Round(gameData, players, pot, deck) {
        this.gameData = gameData;
        this.players = {};
        this.players = players;
        this.pot = pot;
        this.deck = deck;
        this.turn = new turn_1.Turn(gameData, players);
    }
    Round.prototype.nextRound = function () {
        this.endRound();
        this.startRound();
    };
    Round.prototype.canStartAnotherRound = function () {
        return !this.deck.isDeckEmpty();
    };
    Round.prototype.startRound = function () {
        this.turn.getCurrentPlayerTurn();
        this.pot.reset();
        this.refillPlayersHand();
        this.gameData.setAction({
            key: game_observables_properties_1.START_ROUND,
            value: {
                players: this.players
            }
        });
    };
    Round.prototype.endRound = function () {
        var potWinnerPlayer = this.pot.getPotWinner();
        potWinnerPlayer.addPoints(this.pot.getPointsAmmount());
        this.turn.setPlayerTurn(potWinnerPlayer);
    };
    Round.prototype.nextTurn = function (player) {
        this.turn.setPlayerTurn(this.getOponentPlayer(player));
    };
    Round.prototype.handleMove = function (move) {
        var opponent = this.getOponentPlayer(move.getPlayer());
        if (!this.pot.isChallenge() && move.isFinalMove()) {
            this.nextRound();
        }
        else {
            this.setPlayerTurn(opponent, move);
        }
    };
    Round.prototype.setPlayerTurn = function (opponent, move) {
        if (this.opponentCanContinue(opponent, move)) {
            this.turn.setOptionalPlayerTurn(opponent);
        }
        else {
            this.turn.setPlayerTurn(opponent);
        }
    };
    Round.prototype.opponentCanContinue = function (opponent, move) {
        var opponentHand = opponent.getHand();
        return opponentHand.hasCandidateCards(move.getCard());
    };
    Round.prototype.refillPlayersHand = function () {
        var _this = this;
        Object.values(this.players).forEach(function (player) {
            var drawAmount = _this.getEvenlyCardAmmount(player.getHand());
            var cards = _this.deck.draw(drawAmount);
            player.getHand().addCards(cards);
        });
    };
    Round.prototype.getEvenlyCardAmmount = function (playerHand) {
        var requiredCards = playerHand.getPlayedCardsAmmount();
        var deckLength = this.deck.getDeckLength();
        if (deckLength > 0 && (requiredCards * 2) > deckLength) {
            return deckLength / 2;
        }
        return requiredCards;
    };
    Round.prototype.getOponentPlayer = function (player) {
        var playerId = Object.keys(this.players).filter(function (id) { return id !== player.getId(); })[0];
        return this.players[playerId];
    };
    return Round;
}());
exports.Round = Round;
