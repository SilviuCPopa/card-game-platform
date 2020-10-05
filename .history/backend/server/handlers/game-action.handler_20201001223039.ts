import { Player } from "../../src/game/components/player";
import { GameAction } from "../../src/game/interfaces/game-data.interfaces";
import { START_ROUND } from "../../src/game/properties/game.observables.properties";


export class GameActionHandler {

    handle(action: GameAction, clients: any) {
        switch (action.key) {
            case START_ROUND: this.handleRoundAction(action, clients)
        }
    }

    private handleRoundAction(action: GameAction, clients: any) {
        const players = action.value?.players;
        if (players) {
            Object.values(players).forEach( (player: any) => {
                clients[player.getId()].emit({
                    player: player,
                    oponent: {
                        handLength: this.getOponent(players, player.getId()).getHand().getHandSize()
                    }
                });
            })
        }
    }

    private getOponent(players: any, player: Player): Player {
        return <Player>Object.values(players).
            filter( (item: any) => item.getId() !== player.getId())[0];
    }
}