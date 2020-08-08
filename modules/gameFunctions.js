import winCombos from './winCombos.js';
import {
    select,
    insertHtml,
    setProp,
    setStyle,
} from './manipFuncs.js';
import DOMElems from './DOMElems.js';
const {
    gameBoard,
    alertBox,
    alertMessage,
    playersCount,
    playCells,
    playerNames,
    gamePlayDiv,
    frontPage,
} = DOMElems;

const resetGameBoard = () => {
    for (const cell of [...playCells]) {
        setProp(cell, 'textContent', '');
    }
    setProp(select('.stroke'), 'outerHTML', '');
};

const checkWin = (currentPlayer) => {
    for (const winCombo of winCombos) {
        const winPlay = winCombo.map((v) => select(`#cell-${v}`).textContent);
        const playerWins = winPlay.every((v) => v === currentPlayer.avatar);
        if (playerWins) {
            return winCombo.join('');
        }
    }
    return false;
};


const declareWinner = (currentPlayer, winCombo) => {
    insertHtml(gameBoard, 'afterend', `<div class="stroke" id="stroke-${winCombo}"></div>`);
    if (playersCount.textContent === 'One Player') {
        if (currentPlayer.name === 'AI Player') {
            setProp(alertMessage, 'textContent', 'You Lose!');
        } else {
            setProp(alertMessage, 'textContent', 'You Win!');
        }
    } else {
        setProp(alertMessage, 'textContent', `${currentPlayer.name} Wins!`);
    }
    setStyle(alertBox, 'display', 'flex');
};

const updateScore = (currentPlayer) => {
    currentPlayer.score++;
    const playerScoreElem = [...playerNames].find((el) => el.textContent === currentPlayer.name).nextElementSibling;
    setProp(playerScoreElem, 'textContent', currentPlayer.score);
};

const checkDraw = () => {
    const cellsFilled = [...playCells].every((cell) => cell.textContent !== '');
    if (cellsFilled) {
        return true;
    }
    return false;
};

const declareDraw = () => {
    setProp(alertMessage, 'textContent', 'You Draw!');
    setStyle(alertBox, 'display', 'flex');
};


const restartGame = () => {
    resetGameBoard();
};

const continueGame = () => {
    resetGameBoard();
    setStyle(alertBox, 'display', 'none');
};

const quitGame = () => {
    resetGameBoard();
    setStyle(gamePlayDiv, 'display', 'none');
    setStyle(frontPage, 'display', 'flex');
};

export {
    checkWin,
    declareWinner,
    declareDraw,
    checkDraw,
    updateScore,
    quitGame,
    continueGame,
    restartGame,
};
