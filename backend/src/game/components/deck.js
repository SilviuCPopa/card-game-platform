"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deck = void 0;
var card_properties_1 = require("../properties/card.properties");
var card_1 = require("./card");
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        this.forms = [
            card_properties_1.CARD_FORM.F,
            card_properties_1.CARD_FORM.T,
            card_properties_1.CARD_FORM.I,
            card_properties_1.CARD_FORM.R,
        ];
        this.colors = [
            card_properties_1.CARD_COLOR.RED,
            card_properties_1.CARD_COLOR.RED,
            card_properties_1.CARD_COLOR.BLACK,
            card_properties_1.CARD_COLOR.BLACK,
        ];
    }
    Deck.prototype.initialise = function () {
        this.createDeck();
        this.suffleDeck();
    };
    Deck.prototype.draw = function (ammount) {
        if (this.canDraw(ammount)) {
            var cards = this.cards.slice(0, ammount);
            this.cards.splice(0, ammount);
            return cards;
        }
        return [];
    };
    Deck.prototype.suffleDeck = function () {
        var i = this.cards.length, j, tempi, tempj;
        if (i === 0)
            return;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = this.cards[i];
            tempj = this.cards[j];
            this.cards[i] = tempj;
            this.cards[j] = tempi;
        }
    };
    Deck.prototype.canDraw = function (ammount) {
        return !this.isDeckEmpty() && this.cards.length >= ammount;
    };
    Deck.prototype.isDeckEmpty = function () {
        return this.cards.length === 0;
    };
    Deck.prototype.getDeckLength = function () {
        return this.cards.length;
    };
    Deck.prototype.createDeck = function () {
        for (var i = 0; i < this.forms.length; i++) {
            this.createCardsWithForm(this.forms[i], this.colors[i]);
        }
    };
    Deck.prototype.createCardsWithForm = function (form, color) {
        for (var i = card_properties_1.INITIAL_CARD_INDEX; i <= card_properties_1.LAST_CARD_INDEX; i++) {
            this.cards.push(new card_1.Card(i.toString(), form, color));
        }
    };
    return Deck;
}());
exports.Deck = Deck;
