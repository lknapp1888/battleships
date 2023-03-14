import { Gameboard } from "./gameboard";
import { gameHelpers } from "./gameHelpers";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.targetCoords = gameHelpers.generateCoordArr();
    }

    fire(coord, oppGameboard) {
        oppGameboard.receiveHit(coord)
    }

    fireAtRandom(oppGameboard) {
        // generate random index number from targetCoords array
        const num = gameHelpers.getRandomInt(this.targetCoords.length - 1)
        this.targetCoords.splice(num, 1)
        this.fire(num, oppGameboard)
    }
}