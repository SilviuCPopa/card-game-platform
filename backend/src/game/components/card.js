"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var card_properties_1 = require("../properties/card.properties");
var Card = /** @class */ (function () {
    function Card(name, form, color) {
        this.name = name;
        this.form = form;
        this.color = color;
    }
    Card.prototype.getName = function () {
        return this.name;
    };
    Card.prototype.isPoint = function () {
        return card_properties_1.GAME_POINTS.indexOf(this.name) >= 0;
    };
    Card.prototype.getImagePath = function () {
        return 'j + this.forms[i];';
    };
    return Card;
}());
exports.Card = Card;
