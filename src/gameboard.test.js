import { Gameboard } from "./gameboard";

describe('gameboard', () => {
    let board;
    beforeEach(() => {
        board = new Gameboard()
    })
    test('board should equal object', () => {
        expect(typeof board.board).toBe('object')
    })
    test('board should be have 100 key value pairs for each coordinate', () => {
        expect(board.board.length).toBe(100)
    })
    test('any given coordinate should have false hit property and null ship value', () => {
        expect(board.board[5].hit).toBeFalsy()
    })

    describe('placing ship tests', () => {
        test("defines placeShip()", () => {
            expect(typeof board.placeShip).toBe("function");
          });
    
        test('placeShip() should result in the relevant board array coodinate being occupied with the ship object', () => {
            board.placeShip(5, 4)
            expect(board.board[5].hasShip).toBeTruthy()
            expect(board.board[6].hasShip).toBeTruthy()
            expect(board.board[7].hasShip).toBeTruthy()
            expect(board.board[8].hasShip).toBeTruthy()
            expect(board.board[9].hasShip).toBeFalsy()
    
            expect(board.board[8].ship).not.toBeNull()
        })

        test('placeShip() should add the ship object to the ship list', ()=> {
            board.placeShip(5, 4)
            expect(typeof board.placedShips[0]).toBe('object')
        })

        test('placeShip() with vertical parameter should add vertical coordinates', ()=> {
            board.placeShip(5, 4, 'vertical')
            expect(board.board[5].hasShip).toBeTruthy()
            expect(board.board[15].hasShip).toBeTruthy()
            expect(board.board[25].hasShip).toBeTruthy()
            expect(board.board[35].hasShip).toBeTruthy()
            expect(board.board[45].hasShip).toBeFalsy()
        })
        test('placeShip() should not allow any positions that go beyond the grid', ()=> {
            expect(board.placeShip(7, 4, 'horizontal')).toBe('coordinates off grid')
            expect(board.placeShip(75, 4, 'vertical')).toBe('coordinates off grid')
        })

        test('placeShip() to prevent positioning if ship already placed on any coord', () => {
            board.placeShip(5, 4) // 5,6,7,8 are occupied
            expect(board.placeShip(7, 4, 'vertical')).toBe('space occupied')
            expect(board.placeShip(3, 4)).toBe('space occupied')
        })
    })

    test('defines receiveHit()', () => {
        expect(typeof board.receiveHit).toBe('function')
    })

    test('receiveHit() should log the hit on correct grid array', () => {
        board.receiveHit(74)
        expect(board.board[74].hit).toBeTruthy()
    })
})