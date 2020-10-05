"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameData = void 0;
var GameData = /** @class */ (function () {
    function GameData() {
        this.observers = [];
    }
    GameData.prototype.setAction = function (action) {
        this.action = action;
        this.notifyObservables();
    };
    GameData.prototype.registerObservers = function (observer) {
        this.observers.push(observer);
    };
    GameData.prototype.notifyObservables = function () {
        var _this = this;
        this.observers.forEach(function (observer) {
            observer.update(_this.action);
        });
    };
    return GameData;
}());
exports.GameData = GameData;
