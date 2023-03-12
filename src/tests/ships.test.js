import { Ship } from "../ships"

describe('Ship class', ()=> {
   let fourLength;
    beforeEach(() => {
        fourLength = new Ship(4)
    })
   test("defines getLength()", () => {
    expect(typeof fourLength.getLength).toBe("function");
  });
    test('length should reflect initialised length', () => {
        expect(fourLength.getLength()).toBe(4)
    })
    test('defines hit()', () => {
        expect(typeof fourLength.hit).toBe("function");
    })
    test('hit() should register hits on the hitcount property', () => {
        fourLength.hit()
        fourLength.hit()
        expect(fourLength.hitCount).toBe(2)
    })
    test('defines isSunk()', () => {
        expect(typeof fourLength.isSunk).toBe("function");
    })
    test('expect hits equal or greater than length to sink ship', () => {
        fourLength.hit()
        fourLength.hit()
        expect(fourLength.isSunk()).toBeFalsy()
        fourLength.hit()
        fourLength.hit()
        expect(fourLength.isSunk()).toBeTruthy()
    })
})