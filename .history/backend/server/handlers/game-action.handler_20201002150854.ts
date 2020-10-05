import { Player } from "../../src/game/components/player";
import { GameAction } from "../../src/game/interfaces/game-data.interfaces";
import { START_ROUND } from "../../src/game/properties/game.observables.properties";
import { RoundPayload } from "../interfaces/game-socket.interface";
import { Observer } from "../interfaces/observer.interface";

export class GameActionHandler implements Observer {

    players: any;
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

    private emitSocketData(actionPayload: GameAction[]) {
        Object.keys(actionPayload).forEach( (clientId: any) => {
            this.sockets[clientId].emit(actionPayload[clientId]);
        });
    }

    private handleRoundAction(action: GameAction): GameAction[] {
        this.players = action.value?.players;
        const result: any = {};
        if (this.players) {
            Object.values(this.players).forEach( (player: any) => {
                result[player.getId()] = {
                    key: action.key,
                    value: player
                };
            })
        }
        return result;
    }

    buildDefaultClientPayload(action: GameAction): GameAction[] {
        return [action];   
    }

    private getOponent(player: Player): Player { 
        return <Player>Object.values(this.players).
            filter( (item: any) => item.getId() !== player.getId())[0];
    }
}