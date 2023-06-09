export class Ship {
  constructor(length, position = []) {
    this.length = length;
    this.position = position;
    this.hitCount = 0;
  }

  getLength() {
    return this.length;
  }
  hit() {
    this.hitCount++
  }
  isSunk() {
    if (this.hitCount >= this.length) {
        return true;
    }
    return false;
  }
  updatePosition(pos) {
    this.position.push(pos);
  }
}
