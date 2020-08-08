import {
    player1,
    opponent,
    currentPlayer,
    switchCurrentPlayer as switchPlayer,
} from './gameStartInit.js';
import { event } from './manipFuncs.js';
import DOMElems from './DOMElems.js';

const { playCells } = DOMElems;

const twoPlayersGamePlay = () => {
    const play = (ev) => {
        currentPlayer.play(ev);
        switchPlayer();
    };

    [...playCells].map((elem) => event(elem, 'click', play));
};

export default twoPlayersGamePlay;
