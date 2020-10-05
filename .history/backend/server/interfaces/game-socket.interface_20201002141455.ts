import { Player } from "../../src/game/components/player";

export enum ClientActions {
    DISCONNECT = 'disconnect',
    PLAYER_READY = 'PLAYER_READY',
    START_GAME = 'START_GAME'
}

export enum ServerAction {
    CONNECTED = 'CONNECTED',
}

export interface OpponentData {
    handLength: number;
}

export interface RoundPayload {
    player: Player,
    opponent: OpponentData
}