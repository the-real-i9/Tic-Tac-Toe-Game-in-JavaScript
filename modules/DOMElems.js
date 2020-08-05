const [select, selectAll] = [(elem) => document.querySelector(elem), (elem) => document.querySelectorAll(elem)];
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
};

export default DOMElems;
