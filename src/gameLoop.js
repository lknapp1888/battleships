import { Player } from "./player";

const game = {
    user: null,
    ai: new Player('computer'),
    winner: null,
    setUser: function(name) {
        this.user = new Player(name)
    },

    playerFire: function(coord) {
            this.user.fire(coord, this.ai.gameboard)
            if (this.ai.gameboard.fleetSunk()) {
                this.setWinner(this.user)
        }
    },
    
    compFire: function(coord) {
        this.user.fire(coord, this.user.gameboard)
        if (this.user.gameboard.fleetSunk()) {
            this.setWinner(this.ai)
        }
    },
    setWinner: function (user) {
        this.winner = user;
    }
}