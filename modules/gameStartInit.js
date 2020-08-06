import DOMElems from './DOMElems.js';
import { humanPlay, aiPlay } from './playAlgorithms.js';

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
    playerSettingsPanel,
    gamePlayDiv,
    firstPlayerAvatarPlaceholder,
    opponentAvatarPlaceholder,
    firstPlayerNamePlaceholder,
    opponentNamePlaceholder,
    firstPlayerScorePlaceholder,
    opponentScorePlaceholder,
} = DOMElems;
const player1 = {};
const opponent = {};
// eslint-disable-next-line import/no-mutable-exports
let currentPlayer = null;

const gameStart = () => {
    const someEmpty = [...playerInputs].some((v) => !v.value);
    if (someEmpty) {
        [...playerInputs].map((elem) => !elem.value && setStyle(elem, 'border', '1px solid red'));
        return false;
    }

    player1.name = firstPlayerNameInput.value;
    player1.score = 0;
    player1.avatar = firstPlayerAvatar.textContent;

    opponent.name = opponentNameInput.value;
    opponent.score = 0;
    opponent.avatar = opponentAvatar.textContent;

    currentPlayer = [player1, opponent].find((v) => v.avatar === select('.first-move').textContent);

    setStyle(playerSettingsPanel, 'display', 'none');
    setStyle(gamePlayDiv, 'display', 'block');

    for (const obj of [player1, opponent]) {
        if (obj.name === 'AI Player') {
            obj.play = aiPlay;
        } else {
            obj.play = humanPlay;
        }
    }

    [
        firstPlayerNamePlaceholder.textContent,
        firstPlayerAvatarPlaceholder.textContent,
        firstPlayerScorePlaceholder.textContent,
        opponentNamePlaceholder.textContent,
        opponentAvatarPlaceholder.textContent,
        opponentScorePlaceholder.textContent,
    ] = [
        player1.name,
        player1.avatar,
        player1.score,
        opponent.name,
        opponent.avatar,
        opponent.score,
    ];
    return true;
};

const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer === player1 ? opponent : player1;
};

export {
    gameStart,
    player1,
    opponent,
    currentPlayer,
    switchCurrentPlayer,
};
