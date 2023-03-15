import { game } from "./gameLoop";

export const UI = {
  loadGrids: function () {
    const mainContainer = document.querySelector(".mainContainer");
    const userGrid = document.createElement("div");
    const aiGrid = document.createElement("div");
    userGrid.classList.add("grid");
    aiGrid.classList.add("grid");
    userGrid.classList.add("userGrid");
    aiGrid.classList.add("aiGrid");

    for (let i = 0; i < 100; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("userSquare");
      square.classList.add(`userSquare${i}`);
      userGrid.appendChild(square);

      const aiSquare = document.createElement("div");
      aiSquare.classList.add("square");
      aiSquare.classList.add("aiSquare");
      aiSquare.classList.add(`aiSquare${i}`);
      aiGrid.appendChild(aiSquare);
    }
    mainContainer.appendChild(userGrid);
    mainContainer.appendChild(aiGrid);
  },

  initShipInput: function () {
    const squares = document.getElementsByClassName("userSquare");
    for (let i = 0; i < squares.length; i++) {
      squares.item(i).addEventListener("click", (e) => {
        let coord;
        e.target.classList[2][11]
          ? (coord = parseInt(e.target.classList[2][10] + e.target.classList[2][11]))
          : (coord = parseInt(e.target.classList[2][10]));
        game.user.placeShip(coord)
        this.addUserShipToGrid()
      });
    }
  },

  addUserShipToGrid: function () {
    const coords = game.user.gameboard.placedShips[game.user.gameboard.placedShips.length - 1].position;
    // loop through coords and add ship to the squares in that position
  },

  initAiSquareEventListener: function () {
    //
  },
};
