"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_HAND_SIZE = exports.LAST_CARD_INDEX = exports.INITIAL_CARD_INDEX = exports.WINNER_POT_CARD = exports.CARD_COLOR = exports.CARD_FORM = exports.GAME_POINTS = void 0;
exports.GAME_POINTS = [
    '1', '10'
];
var CARD_FORM;
(function (CARD_FORM) {
    CARD_FORM["I"] = "I";
    CARD_FORM["F"] = "F";
    CARD_FORM["R"] = "R";
    CARD_FORM["T"] = "T";
})(CARD_FORM = exports.CARD_FORM || (exports.CARD_FORM = {}));
var CARD_COLOR;
(function (CARD_COLOR) {
    CARD_COLOR["BLACK"] = "BLACK";
    CARD_COLOR["RED"] = "RED";
})(CARD_COLOR = exports.CARD_COLOR || (exports.CARD_COLOR = {}));
exports.WINNER_POT_CARD = '7';
exports.INITIAL_CARD_INDEX = 7;
exports.LAST_CARD_INDEX = 14;
exports.MAX_HAND_SIZE = 4;
