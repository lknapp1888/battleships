export const gameHelpers = {
    generateCoordArr() {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(i);
        }
        return this.shuffleArr(arr);
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      },
    getRandomAxis() {
        const num = this.getRandomInt(2)
        if (num === 0) {return 'horizontal'}
        return 'vertical'
    },

    shuffleArr(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
}