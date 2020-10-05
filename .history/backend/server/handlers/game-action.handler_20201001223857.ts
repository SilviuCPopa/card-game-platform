import { Player } from "../../src/game/components/player";
import { GameAction } from "../../src/game/interfaces/game-data.interfaces";
import { START_ROUND } from "../../src/game/properties/game.observables.properties";


export class GameActionHandler {

    players: any;

    handle(action: GameAction, clients: any) {
        switch (action.key) {
            case START_ROUND: this.handleRoundAction(action, clients)
                break;
            default: this.handleAction(action, clients);
        }
    }

    private handleRoundAction(action: GameAction, clients: any) {
        this.players = action.value?.players;
        if (this.players) {
            Object.values(this.players).forEach( (player: any) => {
                clients[player.getId()].emit({
                    key: action.key,
                    value: this.getRoundPayload(player);
                });
            })
        }
    }

    private handleAction(action: GameAction, clients: any) {
        Object.values(clients).forEach( (client: any) => {
            client.emit(action);
        });
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