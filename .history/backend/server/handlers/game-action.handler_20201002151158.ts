import { Player } from "../../src/game/components/player";
import { GameAction } from "../../src/game/interfaces/game-data.interfaces";
import { START_ROUND } from "../../src/game/properties/game.observables.properties";
import { RoundPayload } from "../interfaces/game-socket.interface";
import { Observer } from "../interfaces/observer.interface";

export class GameActionHandler implements Observer {
    private sockets: any;

    handle(action: GameAction): GameAction[] {
        switch (action.key) {
            case START_ROUND: this.handleRoundAction(action)
                break;
            default: return this.buildDefaultClientPayload(action);
        }
    }

    update(event: any) {
        const actionData = this.handle(event); 
        this.emitSocketData(actionData);
    }

    setSockets(sockets: any) {
        this.sockets = sockets;
    }

    buildDefaultClientPayload(action: GameAction): GameAction[] {
        return [action];   
    }

    private emitSocketData(actionPayload: GameAction[]) {
        Object.keys(actionPayload).forEach( (clientId: any) => {
            this.sockets[clientId].emit(actionPayload[clientId]);
        });
    }

    private handleRoundAction(action: GameAction): GameAction[] {
        const result: any = {};
        const players = action.value?.players;

        if (players) {
            Object.values(players).forEach( (player: any) => {
                result[player.getId()] = {
                    key: action.key,
                    value: player
                };
            })
        }
        return result;
    }

    private getOponent(players: Player[], player: Player): Player { 
        return <Player>Object.values(players).
            filter( (item: any) => item.getId() !== player.getId())[0];
    }
}