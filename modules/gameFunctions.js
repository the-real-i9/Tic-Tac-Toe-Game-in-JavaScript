import winCombos from './winCombos.js';
import aiTurn from './aiTurn.js';
import { switchCurrentPlayer as switchPlayer, currentPlayer as currentPlayerChange, setFirstPlayer } from './gameStartInit.js';
import {
    select,
    insertHtml,
    setProp,
    setStyle,
    classAction,
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
    playerSettingsPanel,
    frontPage,
    firstPlayerNameInput,
    opponentNameInput,
    firstPlayerAvatar,
    opponentAvatar,
    playerMove,
    swapAvatarsBtn,
} = DOMElems;

const resetGameBoard = () => {
    for (const cell of [...playCells]) {
        setProp(cell, 'textContent', '');
    }
    setProp(select('.stroke'), 'outerHTML', '');
};

const resetGameSettings = () => {
    setProp(firstPlayerNameInput, 'value', '');
    setProp(opponentNameInput, 'value', '');
    opponentNameInput.removeAttribute('disabled');
    setProp(select('.b-o-ub'), 'outerHTML', '');
    setProp(select('.swap-sign'), 'outerHTML', '');
    setProp(firstPlayerAvatar, 'textContent', 'X');
    setProp(opponentAvatar, 'textContent', 'O');
    for (const elem of [...playerMove]) {
        classAction(elem, 'remove', 'first-move');
    }
    classAction([...playerMove][0], 'add', 'first-move');
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
    setProp(alertMessage, 'textContent', 'Tie Game!');
    setStyle(alertBox, 'display', 'flex');
};


const restartGame = () => {
    resetGameBoard();
    setFirstPlayer();
    if (currentPlayerChange.name === 'AI Player') {
        aiTurn(currentPlayerChange, checkDraw, checkWin, declareDraw, declareWinner, switchPlayer, updateScore);
    }
};

const continueGame = () => {
    resetGameBoard();
    setFirstPlayer();
    if (currentPlayerChange.name === 'AI Player') {
        aiTurn(currentPlayerChange, checkDraw, checkWin, declareDraw, declareWinner, switchPlayer, updateScore);
    }
    setStyle(alertBox, 'display', 'none');
};

const quitGame = () => {
    resetGameBoard();
    resetGameSettings();
    setStyle([gamePlayDiv, playerSettingsPanel, alertBox], 'display', 'none');
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
