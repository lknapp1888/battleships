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
})