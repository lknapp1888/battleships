import { Player } from "./player";
import { UI } from "./UI";

export const game = {
    user: new Player('Lewis'),
    ai: new Player('computer'),
    winner: null,
    setUser: function(name) {
        this.user = new Player(name)
    },

    playerFire: function(coord) {
            this.user.fire(coord, this.ai.gameboard)
            if (this.ai.gameboard.fleetSunk()) {
                this.setWinner(this.user)
                return;
        }
        this.compFire()
    },
    
    compFire: function() {
        this.user.fireAtRandom(this.user.gameboard)
        if (this.user.gameboard.fleetSunk()) {
            this.setWinner(this.ai)
        }
    },
    setWinner: function (user) {
        this.winner = user;
    }
}