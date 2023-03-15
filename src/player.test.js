import { Player } from "./player";

describe('Player class', () => {
    let playerOne;
    let playerTwo;
    beforeEach(() => {
        playerOne = new Player('Lewis')
        playerTwo = new Player('Fraser')
    })
    afterEach(() => {
        // restore replaced property
        jest.restoreAllMocks();
      });
    test('name initialised when Player class called', () => {
        expect(playerOne.name).toBe('Lewis')
    })
    test('defines fire()', () => {
        expect(typeof playerOne.fire).toBe('function')
    })
    test('expect hit to be received when fire() called for one player, with another players gameboard passed in as parameter', ()=> {
        playerOne.fire(71, playerTwo.gameboard)
        expect(playerTwo.gameboard.board[71].hit).toBeTruthy()
    })
    test('expect player target coords to be array of 0-99 coords', () => {
        expect(typeof playerOne.targetCoords).toBe('object')
        expect(playerOne.targetCoords.length).toBe(100)
        expect(playerOne.targetCoords[8]).toBe(8)
    })
    test('expect fireAtRandom() to reduce targetCoord list by size 1', ()=> {
        playerOne.fireAtRandom(playerTwo.gameboard)
        expect(playerOne.targetCoords.length).toBe(99)
    })
    test('expect fireAtRandom() to call fire with int coord and opposition player param', () => {
        const mockFire = jest.spyOn(playerOne, 'fire')
        playerOne.fireAtRandom(playerTwo.gameboard)
        expect(mockFire).toHaveBeenCalled();
        expect(mockFire.mock.calls[mockFire.mock.calls.length - 1][1]).toBe(playerTwo.gameboard);
    })

    describe('player placeship function', () => {
        test('defines placeShip()', ()=> {
            expect(typeof playerOne.placeShip).toBe('function')
        })
        test('expect placeShip to reduce targetCoord list by size 1', () => {
            playerOne.placeShip(5)
            expect(playerOne.shipList.length).toBe(4)
            playerOne.placeShip(45)
            expect(playerOne.shipList.length).toBe(3)
        })
        test('expect placeShip() to place ships on player gameboard', () => {
            playerOne.placeShip(5)
            playerOne.placeShip(54)
            playerOne.placeShip(84)
            expect(playerOne.gameboard.placedShips[0].length).toBe(5)
            expect(playerOne.gameboard.placedShips[1].length).toBe(4)
            expect(playerOne.gameboard.placedShips[2].length).toBe(3)
        })
        test('expect placeShip() to return undefined if player ship list empty', () => {
            playerOne.shipList = []
            expect(playerOne.placeShip(4)).toBe('ship list empty')
        })
    })
})