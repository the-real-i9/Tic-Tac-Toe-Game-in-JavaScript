import {
    event,
    setStyle,
    setProp,
    classAction,
} from './manipFuncs.js';
import DOMElems from './DOMElems.js';
const {
    frontPage,
    playerSettingsPanel,
    swapAvatarsBtn,
    playerAvatarsSet,
    playerMove,
    playerInputs,
} = DOMElems;

const general = () => {
    // display the player setting modal
    setStyle(frontPage, 'display', 'none');
    setStyle(playerSettingsPanel, 'display', 'block');

    for (const input of [...playerInputs]) {
        event(input, 'focus', () => {
            [...playerInputs].map((inputs) => setStyle(inputs, 'border', 'none'));
        });
    }

    // swap player avatars if swapped
    event(swapAvatarsBtn, 'click', () => {
        for (const elem of [...playerAvatarsSet]) {
            if (elem.textContent === 'X') {
                setProp(elem, 'textContent', 'O');
            } else {
                setProp(elem, 'textContent', 'X');
            }
        }
    });

    // change current player
    for (const elem of [...playerMove]) {
        event(elem, 'click', () => {
            [...playerMove].map((elems) => classAction(elems, 'remove', 'first-move'));
            classAction(elem, 'add', 'first-move');
        });
    }
};

export default general;
