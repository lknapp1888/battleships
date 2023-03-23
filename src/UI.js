import { game } from "./gameLoop";
import { Player } from "./player";

export const UI = {
  loadGrids: function () {
    const mainContainer = document.querySelector(".mainContainer");
    const infoContainer = document.querySelector('.userInfoContainer')
    while (mainContainer.lastChild) {
      mainContainer.removeChild(mainContainer.lastChild)
    }
    while (infoContainer.lastChild) {
      infoContainer.removeChild(infoContainer.lastChild)
    }
    const leftContainer = document.createElement('div')
    const rightContainer = document.createElement('div')
    leftContainer.classList.add('leftContainer')
    rightContainer.classList.add('rightContainer')
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
    const resetBtn = document.createElement('button')
    const userHeading = document.createElement('h2')
    const aiHeading = document.createElement('h2')
    userHeading.innerText = 'user'
    aiHeading.innerText = 'computer'
    const userInfo = document.createElement('p')
    axisBtn.classList.add('axisBtn')
    axisBtn.innerText = 'y';
    resetBtn.classList.add('resetBtn')
    resetBtn.innerText = 'reset'
    userInfo.classList.add('userInfo')
    userInfo.innerText = 'Place your aircraft carrier (5) on the grid'
    mainContainer.appendChild(leftContainer)
    mainContainer.appendChild(rightContainer)
    leftContainer.appendChild(userHeading)
    leftContainer.appendChild(userGrid)
    leftContainer.appendChild(axisBtn)
    infoContainer.appendChild(userInfo)
    rightContainer.appendChild(aiHeading)
    rightContainer.appendChild(aiGrid);
    rightContainer.appendChild(resetBtn);
    this.initAxisBtn()
    this.initResetBtn()
  },

  initShipInput: function () {
    const squares = document.getElementsByClassName("userSquare");
    for (let i = 0; i < squares.length; i++) {
      squares.item(i).addEventListener("click", (e) => {
        let coord;
        e.target.classList[2][11]
          ? (coord = parseInt(e.target.classList[2][10] + e.target.classList[2][11]))
          : (coord = parseInt(e.target.classList[2][10]));
          const potentialCoords = game.user.gameboard.getPotentialCoords(coord, game.user.shipList[0].size, this.currAxis)
          if (typeof potentialCoords !== 'object') {return}
          game.user.placeShip(coord, this.currAxis)
        this.addUserShipToGrid()
      });
    }
  },

  addUserShipToGrid: function () {
    const coords = game.user.gameboard.placedShips[game.user.gameboard.placedShips.length - 1].position;
    const userInfo = document.querySelector('.userInfo')
    for (let i = 0; i < coords.length; i++) {
      const square = document.querySelector(`.userSquare${coords[i]}`)
      square.classList.add('shipSquare')
    }
    if (game.user.shipList[0]) {
    userInfo.innerText = `Place your ${game.user.shipList[0].ship} (${game.user.shipList[0].size}) on the grid`
    return
  }
    userInfo.innerText = `${game.user.name} goes first! Fire on the enemy grid`
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
        axisBtn.innerText = 'x'
        return
      }
      this.currAxis ='horizontal'
      axisBtn.innerText = 'y'
    })
  },

  initResetBtn: function () {
    const resetBtn = document.querySelector('.resetBtn')
    resetBtn.addEventListener('click', ()=> {
    game.user = new Player('Human Player')
    game.ai = new Player('computer')
    game.winner = null;
    this.loadGrids()
    this.initShipInput()
    this.initSquareHover()
    game.ai.placeShipsRandomly()
    this.initAiSquareEventListener()
    this.currAxis = 'horizontal'
      console.log('received')
    })

  },

  initAiSquareEventListener: function () {
    const squares = document.getElementsByClassName('aiSquare')
    const userInfo = document.querySelector('.userInfo')
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', () => {
        if (squares[i].classList[3]) {return}
        if (game.user.shipList[0]) {return}
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
        userInfo.innerText = `You fire! and miss... ${game.ai.name} is lining up it's shot...`
        if (game.ai.gameboard.board[coord].hasShip) {
          squares[i].classList.remove('squareHit')
          squares[i].classList.add('successfulHit')
          userInfo.innerText = `You hit ${game.ai.name}'s ship! How will ${game.ai.name} respond?`
        }
        game.checkWinner()
      })
      
    }
  },

  userSquareReceiveHit(coord) {
    const square = document.querySelector(`.userSquare${coord}`)
    const userInfo = document.querySelector('.userInfo')
    square.innerText = 'x'
    if (game.user.gameboard.board[coord].hit) {
      square.classList.add('squareHit')
      userInfo.innerText = `${game.ai.name} fires and misses. Take your shot.`
    }
    if (game.user.gameboard.board[coord].hasShip) {
      square.classList.add('successfulHit')
      userInfo.innerText = `${game.ai.name} fires and hit's your ship! Return fire.`
    }
    game.checkWinner()
  },

  gameWonMessage() {
    const userInfo = document.querySelector('.userInfo')
    userInfo.innerText = `${game.winner.name} wins!`
  },

  currAxis: 'horizontal',
};
