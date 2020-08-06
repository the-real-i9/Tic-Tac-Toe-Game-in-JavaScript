import DOMElems from '../modules/DOMElems.js';
import { event } from '../modules/manipFuncs.js';
import playersSelected from '../modules/playerSelect.js';
import { gameStart } from '../modules/gameStartInit.js';
import onePlayerGamePlay from '../modules/onePlayerGamePlay.js';

const { onePlayerBtn, twoPlayersBtn, startGameBtn } = DOMElems;

event(onePlayerBtn, 'click', playersSelected);
event(twoPlayersBtn, 'click', playersSelected);

event(startGameBtn, 'click', (ev) => {
    if (ev.target.parentElement.children[0].textContent === 'One Player') {
        if (gameStart()) onePlayerGamePlay();
    }
});
