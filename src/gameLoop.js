import { Player } from "./player";
import { UI } from "./UI";
import { gameHelpers } from "./gameHelpers";

export const game = {
    user: new Player('Human player'),
    ai: new Player('computer'),
    winner: null,
    setUser: function(name) {
        this.user = new Player(name)
    },

    playerFire: function(coord) {
            this.user.fire(coord, this.ai.gameboard)

            gameHelpers.delay(2000).then(() => game.compFire());
    },
    
    compFire: function() {
        if (this.winner !== null) {return}
        this.user.fireAtRandom(this.user.gameboard)

    },

    checkWinner() {
        if (this.ai.gameboard.fleetSunk()) {
            this.winner = this.user;
            UI.gameWonMessage()
            return;
         }
         if (this.user.gameboard.fleetSunk()) {
            this.winner = this.ai;
            UI.gameWonMessage()
        }
    }
}