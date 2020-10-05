"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hand = void 0;
var card_properties_1 = require("../properties/card.properties");
var Hand = /** @class */ (function () {
    function Hand(cards) {
        this.limit = card_properties_1.MAX_HAND_SIZE;
        this.cards = cards;
    }
    Hand.prototype.addCards = function (cards) {
        var renewedCards = this.cards.concat(cards);
        if (renewedCards.length <= this.limit) {
            this.cards = this.cards.concat(cards);
        }
        else {
            throw new Error('Hand limit exceded!');
        }
    };
    Hand.prototype.playCard = function (card) {
        this.cards = this.cards.filter(function (item) { return item.getName() !== card.getName(); });
    };
    Hand.prototype.getHandSize = function () {
        return this.cards.length;
    };
    Hand.prototype.isHandFull = function () {
        return this.cards.length === this.limit;
    };
    Hand.prototype.getPlayedCardsAmmount = function () {
        return this.limit - this.getHandSize();
    };
    Hand.prototype.hasCandidateCards = function (card) {
        var candidateCards = this.getCandidateCards(card);
        return !!candidateCards.length;
    };
    Hand.prototype.getCandidateCards = function (card) {
        var _this = this;
        return Object.values(this.cards).filter(function (item) { return (item.getName() === card.getName()) || _this.isWinnerCard(card); });
    };
    Hand.prototype.isHandEmpty = function () {
        return this.cards.length === 0;
    };
    Hand.prototype.setLimit = function (limit) {
        this.limit = limit;
    };
    Hand.prototype.isWinnerCard = function (card) {
        return card.getName() === card_properties_1.WINNER_POT_CARD;
    };
    return Hand;
}());
exports.Hand = Hand;
