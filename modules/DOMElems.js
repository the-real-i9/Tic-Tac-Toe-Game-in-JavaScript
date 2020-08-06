import { select, selectAll } from './manipFuncs.js';
const DOMElems = {
    onePlayerBtn: select('#one-player'),
    twoPlayersBtn: select('#two-players'),
    frontPage: select('.frontpage'),
    playerSettingsPanel: select('.game-set'),
    playersCount: select('#players-count'),
    firstPlayerNameInput: select('#player-1-name-input'),
    opponentNameInput: select('#opponent-name-input'),
    playerInputs: selectAll('.players-input input'),
    playerAvatarsSet: selectAll('.sign'),
    firstPlayerAvatar: select('#player-1-sign-set'),
    opponentAvatar: select('#opponent-sign-set'),
    swapAvatarsBtn: select('.swap-sign'),
    playerMove: selectAll('.pM'),
    startGameBtn: select('.start-button'),
    playCells: selectAll('.cell'),
    gamePlayDiv: select('.game-play-div'),
    firstPlayerAvatarPlaceholder: select('#player-1-avatar'),
    opponentAvatarPlaceholder: select('#opponent-avatar'),
    firstPlayerNamePlaceholder: select('#player-1-name'),
    opponentNamePlaceholder: select('#opponent-name'),
    firstPlayerScorePlaceholder: select('#player-1-score'),
    opponentScorePlaceholder: select('#opponent-score'),
};

export default DOMElems;
