import {
    setProp,
    insertHtml,
    event,
    select,
} from './manipFuncs.js';
import DOMElems from './DOMElems.js';
import generalSettings from './generalSettings.js';
const {
    opponentNameInput,
    playersCount,
    firstMoveDiv,
} = DOMElems;

const onePlayer = () => {
    const modeHtml = '<div class="b-o-ub">Level: <span class="ai-type">Normal</span><i class="fas fa-sync changeAI"></i></div>';
    // set players count text to one player
    setProp(playersCount, 'textContent', 'One Player');

    // set second player input to AI player and disable it
    setProp(opponentNameInput, 'value', 'AI Player');
    opponentNameInput.setAttribute('disabled', '');

    insertHtml(firstMoveDiv, 'beforebegin', modeHtml);

    event(select('.changeAI'), 'click', () => {
        const aiType = select('.ai-type');
        setProp(aiType, 'textContent', aiType.textContent === 'Easy' ? 'Normal' : aiType.textContent === 'Normal' ? 'Unbeatable AI' : 'Easy');
    });

    generalSettings();
};

export default onePlayer;
