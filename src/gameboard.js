import { Ship } from "./ships";

export class Gameboard {
  constructor() {
    this.board = this.initBoard();
    this.placedShips = [];
  }
  initBoard() {
    let grid = [];
    for (let i = 0; i < 100; i++) {
      grid.push({ hit: false, hasShip: false, ship: null });
    }
    return grid;
  }
  placeShip(start, len, axis = "horizontal") {
    let coords = []
    if (axis === "horizontal") {
        if ((start % 10) + (len - 1) > 9) {return 'coordinates off grid'}
      for (let i = 0; i < len; i++) {
        if (this.board[start + i].hasShip === true) {return 'space occupied'}
        coords.push(start + i)
      }
    }
    if (axis === "vertical") {
        if ((start + ((len * 10) - 10)  > 99)) {return 'coordinates off grid'}
      for (let i = 0; i < len; i++) {
        if (this.board[start + i * 10].hasShip === true) {return 'space occupied'}
        coords.push(start + i * 10)
      }
    }
    const newShip = new Ship(len)
    while (coords.length > 0) {
        this.board[coords[0]].hasShip = true;
        this.board[coords[0]].ship = newShip;
        newShip.updatePosition(coords[0])
        coords.shift()
    }
    this.placedShips.push(newShip);
  }

  getPotentialCoords(start, len, axis = "horizontal") {
    let coords = []
    if (axis === "horizontal") {
      if ((start % 10) + (len - 1) > 9) {return 'coordinates off grid'}
    for (let i = 0; i < len; i++) {
      if (this.board[start + i].hasShip === true) {return 'space occupied'}
      coords.push(start + i)
    }
  }
  if (axis === "vertical") {
      if ((start + ((len * 10) - 10)  > 99)) {return 'coordinates off grid'}
    for (let i = 0; i < len; i++) {
      if (this.board[start + i * 10].hasShip === true) {return 'space occupied'}
      coords.push(start + i * 10)
    }
  }
  return coords;
  }

  receiveHit(coord) {
    this.board[coord].hit = true;
    if(this.board[coord].ship !== null){
      this.board[coord].ship.hit()
    }
  }

  fleetSunk() {
    for (let i = 0; i < this.placedShips.length; i++) {
      if (this.placedShips[i].isSunk()) {
        continue;
      }
      if (!this.placedShips[i].isSunk()) {
        return false;
      }
  }
  return true;
}
}
