import {
    player1,
    opponent,
    currentPlayer,
    switchCurrentPlayer as switchPlayer,
} from './gameStartInit.js';
import { event } from './manipFuncs.js';
import DOMElems from './DOMElems.js';
import {
    declareWinner,
    checkWin,
    checkDraw,
    declareDraw,
    updateScore,
} from './gameFunctions.js';

const { playCells } = DOMElems;

const twoPlayersGamePlay = () => {
    const play = (ev) => {
        const huPlayed = currentPlayer.play(ev);
        if (huPlayed) {
            const win = checkWin(currentPlayer);
            if (win) {
                // game Over
                declareWinner(currentPlayer, win);
                updateScore(currentPlayer);
                return;
            }
            const draw = checkDraw();
            if (draw) {
                // game Over
                declareDraw();
                return;
            }
            switchPlayer();
        } else {
            return;
        }
    };

    [...playCells].map((elem) => event(elem, 'click', play));
};

export default twoPlayersGamePlay;
