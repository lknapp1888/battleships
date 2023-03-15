import { Gameboard } from "./gameboard";
import { gameHelpers } from "./gameHelpers";

export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.targetCoords = gameHelpers.generateCoordArr();
    this.shipList = [
      { ship: "Carrier", size: 5 },
      { ship: "Battleship", size: 4 },
      { ship: 'Destroyer', size: 3},
      { ship: 'Submarine', size: 3},
      { ship: 'Patrol Boat', size: 2}
    ];
  }

  fire(coord, oppGameboard) {
    oppGameboard.receiveHit(coord);
  }

  fireAtRandom(oppGameboard) {
    // generate random index number from targetCoords array
    const num = gameHelpers.getRandomInt(this.targetCoords.length - 1);
    this.targetCoords.splice(num, 1);
    this.fire(num, oppGameboard);
  }

  placeShip(coord) {
    if (!this.shipList[0]) {return 'ship list empty'}
    this.gameboard.placeShip(coord, this.shipList[0].size)
    this.shipList.shift();
  }
}
