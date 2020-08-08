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
    const modeHtml = '<div class="b-o-ub">Mode: <span class="ai-type">Unbeatable AI</span><i class="fas fa-sync changeAI"></i></div>';
    // set players count text to one player
    setProp(playersCount, 'textContent', 'One Player');

    // set second player input to AI player and disable it
    setProp(opponentNameInput, 'value', 'AI Player');
    opponentNameInput.setAttribute('disabled', '');

    insertHtml(firstMoveDiv, 'beforebegin', modeHtml);

    event(select('.changeAI'), 'click', () => {
        const aiType = select('.ai-type');
        setProp(aiType, 'textContent', aiType.textContent === 'Unbeatable AI' ? 'Beatable AI' : 'Unbeatable AI');
    });

    generalSettings();
};

export default onePlayer;
