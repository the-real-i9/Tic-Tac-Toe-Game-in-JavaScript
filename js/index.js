import DOMElems from '../modules/DOMElems.js';
import { event } from '../modules/manipFuncs.js';
import playersSelected from '../modules/playerSelect.js';

const { onePlayerBtn, twoPlayersBtn } = DOMElems;

event(onePlayerBtn, 'click', playersSelected);
event(twoPlayersBtn, 'click', playersSelected);
