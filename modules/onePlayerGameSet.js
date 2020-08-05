import {
 setProp,
} from './manipFuncs.js';
import DOMElems from './DOMElems.js';
import generalSettings from './generalSettings.js';
const {
    opponentNameInput,
    playersCount,
} = DOMElems;

const onePlayer = () => {
    // set players count text to one player
    setProp(playersCount, 'textContent', 'One Player');

    // set second player input to AI player and disable it
    setProp(opponentNameInput, 'value', 'AI Player');
    opponentNameInput.setAttribute('disabled', '');

    generalSettings();
};

export default onePlayer;
