import { Player } from "./player";

describe('Player class', () => {
    let playerOne;
    let playerTwo;
    beforeEach(() => {
        playerOne = new Player('Lewis')
        playerTwo = new Player('Fraser')
    })
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
        //use mock to see if fire() is called
        //use the same mock to see if param one is int
        //use the same mock to see if param two is player.gameboard...
        expect().toBe('failing now to act as reminder to test')
    })
})