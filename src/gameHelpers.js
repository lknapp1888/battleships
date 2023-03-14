export const gameHelpers = {
    generateCoordArr() {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(i);
        }
        return arr;
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
}