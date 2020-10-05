"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerAction = exports.ClientActions = void 0;
var ClientActions;
(function (ClientActions) {
    ClientActions["CONNECT"] = "connect";
    ClientActions["DISCONNECT"] = "disconnect";
    ClientActions["PLAYER_READY"] = "PLAYER_READY";
    ClientActions["START_GAME"] = "START_GAME";
})(ClientActions = exports.ClientActions || (exports.ClientActions = {}));
var ServerAction;
(function (ServerAction) {
    ServerAction["CONNECTED"] = "CONNECTED";
})(ServerAction = exports.ServerAction || (exports.ServerAction = {}));
