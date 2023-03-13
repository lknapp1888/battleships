import { Gameboard } from "./gameboard";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }

    fire(coord, oppGameboard) {
        oppGameboard.receiveHit(coord)
    }
}