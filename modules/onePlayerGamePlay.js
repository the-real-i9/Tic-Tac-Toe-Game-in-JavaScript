import {
    player1,
    opponent,
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
                // gameOver();
                return;
            }
            const draw = checkDraw();
            if (draw) {
                // game Over
                declareDraw();
                // gameOver();
                return;
            }
            switchPlayer();
        } else {
            return;
        }

        const aiPlayed = currentPlayer.play();
        if (aiPlayed) {
            const win = checkWin(currentPlayer);
            if (win) {
                declareWinner(currentPlayer);
                updateScore(currentPlayer);
                // gameOver();
                return;
            }
            const draw = checkDraw();
            if (draw) {
                declareDraw();
                // gameOver();
                return;
            }
            switchPlayer();
        }
    };

    [...playCells].map((elem) => event(elem, 'click', play));
};

export default onePlayerGamePlay;
