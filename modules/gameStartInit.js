import DOMElems from './DOMElems.js';
import {
    setStyle,
    select,
} from './manipFuncs.js';
const {
    opponentNameInput,
    firstPlayerNameInput,
    firstPlayerAvatar,
    opponentAvatar,
    playerInputs,
} = DOMElems;
const player1 = {};
const opponent = {};
// eslint-disable-next-line import/no-mutable-exports
let currentPlayer = null;

const gameStart = () => {
    const someEmpty = [...playerInputs].some((v) => !v.value);
    if (someEmpty) {
        [...playerInputs].map((elem) => !elem.value && setStyle(elem, 'border', '1px solid red'));
        return;
    }

    player1.name = firstPlayerNameInput.value;
    player1.score = 0;
    player1.avatar = firstPlayerAvatar.textContent;

    opponent.name = opponentNameInput.value;
    opponent.score = 0;
    opponent.avatar = opponentAvatar.textContent;

    currentPlayer = [player1, opponent].find((v) => v.avatar === select('.first-move').textContent);

    console.log({
        player1,
        opponent,
        currentPlayer,
    });
};

export {
    gameStart,
    player1,
    opponent,
    currentPlayer,
};
