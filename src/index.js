import './style.css';
import { UI } from './UI';
import { game } from './gameLoop';

UI.loadGrids()
UI.initShipInput()
UI.initSquareHover()
game.ai.placeShipsRandomly()
UI.initAiSquareEventListener()