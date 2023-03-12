export class Ship {
  constructor(length) {
    this.length = length;
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
}
