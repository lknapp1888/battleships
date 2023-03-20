import { Gameboard } from "./gameboard";
import { gameHelpers } from "./gameHelpers";
import { UI } from "./UI";

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
    const num = this.targetCoords[0];
    this.targetCoords.shift();
    this.fire(num, oppGameboard);
    UI.userSquareReceiveHit(num)
  }

  placeShip(coord, axis) {
    if (!this.shipList[0]) {return 'ship list empty'}
    this.gameboard.placeShip(coord, this.shipList[0].size, axis)
    this.shipList.shift();
  }

  placeShipsRandomly() {
    while (this.shipList.length > 0) {
      const coord = gameHelpers.getRandomInt(100)
      const length = this.shipList[0].size
      if (typeof this.gameboard.placeShip(coord, length, gameHelpers.getRandomAxis()) === 'string') {continue}
      this.gameboard.placeShip(coord, length, gameHelpers.getRandomAxis())
      this.shipList.shift()
    }
  }

  getNextShip() {
    if (!this.shipList[0]) {return 'ship list empty'}
    return this.shipList[0];
  }
}
