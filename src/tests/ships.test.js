import { Ship } from "../ships"

test('test ship function', ()=> {
    expect(Ship(4).length).toBe(4)
})