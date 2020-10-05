import { Player } from "../../src/game/components/player";
import { GameAction } from "../../src/game/interfaces/game-data.interfaces";
import { START_ROUND } from "../../src/game/properties/game.observables.properties";
import { Observer } from "../interfaces/observer.interface";

export class GameActionHandler implements Observer {

    players: any;

    handle(action: GameAction) {
        switch (action.key) {
            case START_ROUND: this.handleRoundAction(action)
                break;
            default: return action;
        }
    }

    update(event: any) {
        this.handle(event); 
    }

    private handleRoundAction(action: GameAction) {
        this.players = action.value?.players;
        if (this.players) {
            return this.buildClientPayload(action, this.getRoundPayload);
        }
        return null;
    }

    buildClientPayload(action: GameAction, payload: Function) {
        const result: any = {};
        Object.values(this.players).forEach( (player: any) => {
            result[player.getId()] = {
                key: action.key,
                value: payload(player)
            };
        })
        return result;
    }

    private getOponent(player: Player): Player {
        return <Player>Object.values(this.players).
            filter( (item: any) => item.getId() !== player.getId())[0];
    }

    private getRoundPayload(player: Player) {
        return {
            player: player,
            oponent: {
                handLength: this.getOponent(player).getHand().getHandSize()
            }
        }
    }
}