import DOMElems from '../modules/DOMElems.js';
import { event } from '../modules/manipFuncs.js';
import playersSelected from '../modules/playerSelect.js';
import { gameStart } from '../modules/gameStartInit.js';

const { onePlayerBtn, twoPlayersBtn, startGameBtn } = DOMElems;

event(onePlayerBtn, 'click', playersSelected);
event(twoPlayersBtn, 'click', playersSelected);

event(startGameBtn, 'click', () => {
    gameStart();
});
