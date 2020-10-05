"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pot = void 0;
var card_properties_1 = require("../properties/card.properties");
var Pot = /** @class */ (function () {
    function Pot() {
        this.cards = [];
        this.challenge = false;
    }
    Pot.prototype.addCard = function (card) {
        this.evaluateCard(card);
        this.cards.push(card);
    };
    Pot.prototype.getFirstCard = function () {
        if (this.cards.length > 0) {
            return this.cards[0];
        }
        return null;
    };
    Pot.prototype.reset = function () {
        this.cards = [];
        this.potWinner = null;
    };
    Pot.prototype.isComplete = function () {
        return this.cards.length % 2 === 0;
    };
    Pot.prototype.isPotEmpty = function () {
        return this.cards.length === 0;
    };
    Pot.prototype.isChallenge = function () {
        return !!this.challenge;
    };
    Pot.prototype.setPotWinner = function (player) {
        this.potWinner = player;
    };
    Pot.prototype.getPotWinner = function () {
        return this.potWinner;
    };
    Pot.prototype.getPointsAmmount = function () {
        var points = 0;
        this.cards.forEach(function (card) {
            if (card.isPoint()) {
                points++;
            }
        });
        return points;
    };
    Pot.prototype.isWinnerCard = function (card) {
        var _a;
        return card.getName() === ((_a = this.getFirstCard()) === null || _a === void 0 ? void 0 : _a.getName()) || card.getName() === card_properties_1.WINNER_POT_CARD;
    };
    Pot.prototype.evaluateCard = function (card) {
        this.challenge = false;
        if (this.isWinnerCard(card)) {
            this.challenge = true;
        }
    };
    return Pot;
}());
exports.Pot = Pot;
