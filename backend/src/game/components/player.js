"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumanPlayer = exports.Player = void 0;
var hand_1 = require("./hand");
var uuid_1 = require("uuid");
var Player = /** @class */ (function () {
    function Player(uuid, name) {
        this.uuid = null;
        this.hand = new hand_1.Hand([]);
        this.score = 0;
        this.name = name;
        this.uuid = uuid || uuid_1.v4();
    }
    Player.prototype.resetScore = function () {
        this.score = 0;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.addPoints = function (points) {
        this.score += points;
    };
    Player.prototype.setHand = function (hand) {
        this.hand = hand;
    };
    Player.prototype.getHand = function () {
        return this.hand;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.getId = function () {
        return this.uuid;
    };
    return Player;
}());
exports.Player = Player;
var HumanPlayer = /** @class */ (function (_super) {
    __extends(HumanPlayer, _super);
    function HumanPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HumanPlayer;
}(Player));
exports.HumanPlayer = HumanPlayer;
