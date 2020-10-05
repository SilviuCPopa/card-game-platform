"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
var Move = /** @class */ (function () {
    function Move(pot, player, card) {
        this.finalMove = false;
        this.player = player;
        this.card = card;
        this.pot = pot;
    }
    Move.prototype.getPlayer = function () {
        return this.player;
    };
    Move.prototype.getCard = function () {
        return this.card;
    };
    Move.prototype.makeMove = function () {
        this.setPotWinner();
        this.player.getHand().playCard(this.card);
        this.pot.addCard(this.card);
        this.evaluateMove();
    };
    Move.prototype.isFinalMove = function () {
        return !!this.finalMove;
    };
    Move.prototype.setPotWinner = function () {
        if (this.pot.isPotEmpty() || this.pot.isWinnerCard(this.card)) {
            this.pot.setPotWinner(this.player);
        }
    };
    Move.prototype.evaluateMove = function () {
        if (!this.pot.isWinnerCard(this.card) && this.pot.isComplete()) {
            this.finalMove = true;
        }
    };
    return Move;
}());
exports.Move = Move;
