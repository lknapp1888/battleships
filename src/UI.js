import { game } from "./gameLoop";

export const UI = {
  loadGrids: function () {
    const mainContainer = document.querySelector(".mainContainer");
    const infoContainer = document.querySelector('.userInfoContainer')
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

    const axisBtn = document.createElement('button')
    axisBtn.classList.add('axisBtn')
    axisBtn.innerText = this.currAxis;
    infoContainer.appendChild(axisBtn)
    mainContainer.appendChild(userGrid);
    mainContainer.appendChild(aiGrid);
    this.initAxisBtn()
  },

  initShipInput: function () {
    const squares = document.getElementsByClassName("userSquare");
    for (let i = 0; i < squares.length; i++) {
      squares.item(i).addEventListener("click", (e) => {
        let coord;
        e.target.classList[2][11]
          ? (coord = parseInt(e.target.classList[2][10] + e.target.classList[2][11]))
          : (coord = parseInt(e.target.classList[2][10]));
        game.user.placeShip(coord, this.currAxis)
        this.addUserShipToGrid()
      });
    }
  },

  addUserShipToGrid: function () {
    const coords = game.user.gameboard.placedShips[game.user.gameboard.placedShips.length - 1].position;
    for (let i = 0; i < coords.length; i++) {
      const square = document.querySelector(`.userSquare${coords[i]}`)
      square.classList.add('shipSquare')
    }
  },

  addAiShipToGrid: function () {
    const coords = game.ai.gameboard.placedShips[game.ai.gameboard.placedShips.length - 1].position;
    for (let i = 0; i < coords.length; i++) {
      const square = document.querySelector(`.aiSquare${coords[i]}`)
      square.classList.add('shipSquare')
    }
  },

  initSquareHover: function () {
    const squares = document.getElementsByClassName('userSquare')
    for (let i = 0; i < squares.length; i++) {
      squares.item(i).addEventListener('mouseover', (e) => {
        if (typeof game.user.getNextShip() === 'string') {return}
        this.resetPotentialSquares()
        const size = game.user.getNextShip().size
        let startCoord;
        e.target.classList[2][11]
          ? (startCoord = parseInt(e.target.classList[2][10] + e.target.classList[2][11]))
          : (startCoord = parseInt(e.target.classList[2][10]));
        const coords = game.user.gameboard.getPotentialCoords(startCoord, size, this.currAxis)
        if (typeof coords !== 'object') {return}
        for (const j of coords) {
          const potentialSquare = document.querySelector(`.userSquare${j}`)
          potentialSquare.classList.add('potentialShip')
        }
      })
    }
  },

  resetPotentialSquares: function () {
    const squares = document.getElementsByClassName('userSquare')
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove('potentialShip')
      
    }
  },

  initAxisBtn: function () {
    const axisBtn = document.querySelector('.axisBtn')
    axisBtn.addEventListener('click', () => {
      if (this.currAxis === 'horizontal') {
        this.currAxis = 'vertical'
        axisBtn.innerText = 'horizontal'
        return
      }
      this.currAxis ='horizontal'
      axisBtn.innerText = 'vertical'
    })
  },

  initAiSquareEventListener: function () {
    const squares = document.getElementsByClassName('aiSquare')
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', () => {
        if (squares[i].classList[3]) {return}
        if (game.winner !== null) {
          console.log(game.winner)
            return}
        let coord;
        squares[i].classList[2][9] ? 
        coord = parseInt(squares[i].classList[2][8] + squares[i].classList[2][9]) :
        coord = parseInt(squares[i].classList[2][8]);
        squares[i].classList.add('squareHit')
        squares[i].innerText = 'x'
        game.playerFire(coord)
        if (game.ai.gameboard.board[coord].hasShip) {
          squares[i].classList.remove('squareHit')
          squares[i].classList.add('successfulHit')
        }
      })
    }
  },

  userSquareReceiveHit(coord) {
    const square = document.querySelector(`.userSquare${coord}`)
    if (game.user.gameboard.board[coord].hit) {
      square.classList.add('squareHit')
    }
    if (game.user.gameboard.board[coord].hasShip) {
      square.classList.add('successfulHit')
    }
  },

  currAxis: 'horizontal',
};
