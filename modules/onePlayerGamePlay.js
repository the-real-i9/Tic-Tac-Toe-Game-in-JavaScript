import {
    currentPlayer,
    switchCurrentPlayer as switchPlayer,
} from './gameStartInit.js';
import {
    event,
} from './manipFuncs.js';
import DOMElems from './DOMElems.js';
import {
    declareWinner,
    checkWin,
    checkDraw,
    declareDraw,
    updateScore,
} from './gameFunctions.js';
import aiTurn from './aiTurn.js';

const {
    playCells,
} = DOMElems;


const onePlayerGamePlay = () => {
    if (currentPlayer.name === 'AI Player') {
        const aiPlayed = currentPlayer.play();
        if (aiPlayed) {
            switchPlayer();
        }
    }
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

        aiTurn(currentPlayer, checkDraw, checkWin, declareDraw, declareWinner, switchPlayer, updateScore);
    };

    [...playCells].map((elem) => event(elem, 'click', play));
};

export default onePlayerGamePlay;
