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


const {
    playCells,
} = DOMElems;
const onePlayerGamePlay = () => {
    if (currentPlayer.name === 'AI Player') {
        currentPlayer.play();
        switchPlayer();
    }
    const play = (ev) => {
        currentPlayer.play(ev);
        switchPlayer();
        currentPlayer.play();
        switchPlayer();
    };

    [...playCells].map((elem) => event(elem, 'click', play));
};

export default onePlayerGamePlay;
