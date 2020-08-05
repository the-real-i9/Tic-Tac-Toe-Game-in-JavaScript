import {
setProp,
} from './manipFuncs.js';
import DOMElems from './DOMElems.js';
import generalSettings from './generalSettings.js';
const {
    playersCount,
} = DOMElems;
const twoPlayers = () => {
    // set players count text to two players
    setProp(playersCount, 'textContent', 'Two Players');

    generalSettings();
};

export default twoPlayers;
