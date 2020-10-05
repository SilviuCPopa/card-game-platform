"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameActionHandler = void 0;
var game_observables_properties_1 = require("../../src/game/properties/game.observables.properties");
var GameActionHandler = /** @class */ (function () {
    function GameActionHandler() {
    }
    GameActionHandler.prototype.handle = function (action) {
        console.log(action.key);
        switch (action.key) {
            case game_observables_properties_1.START_ROUND: return this.handleRoundAction(action);
            default: return this.buildDefaultClientPayload(action);
        }
    };
    GameActionHandler.prototype.update = function (action) {
        var actionData = this.handle(action);
        this.emitSocketData(actionData);
    };
    GameActionHandler.prototype.updateSockets = function (sockets) {
        this.sockets = sockets;
    };
    GameActionHandler.prototype.buildDefaultClientPayload = function (action) {
        return [action];
    };
    GameActionHandler.prototype.emitSocketData = function (actionPayload) {
        var _this = this;
        Object.keys(actionPayload).forEach(function (clientId) {
            _this.sockets[clientId].emit(actionPayload[clientId].key, actionPayload[clientId].value);
        });
    };
    GameActionHandler.prototype.handleRoundAction = function (action) {
        var _a;
        var result = {};
        var players = (_a = action.value) === null || _a === void 0 ? void 0 : _a.players;
        if (players) {
            Object.values(players).forEach(function (player) {
                result[player.getId()] = {
                    key: action.key,
                    value: player
                };
            });
        }
        return result;
    };
    GameActionHandler.prototype.getOponent = function (players, player) {
        return Object.values(players).
            filter(function (item) { return item.getId() !== player.getId(); })[0];
    };
    return GameActionHandler;
}());
exports.GameActionHandler = GameActionHandler;
