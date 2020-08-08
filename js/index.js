import DOMElems from '../modules/DOMElems.js';
import {
    event,
} from '../modules/manipFuncs.js';
import playersSelected from '../modules/playerSelect.js';
import {
    gameStart,
} from '../modules/gameStartInit.js';
import onePlayerGamePlay from '../modules/onePlayerGamePlay.js';
import twoPlayersGamePlay from '../modules/twoPlayersGamePlay.js';
import {
    quitGame,
    continueGame,
    restartGame,
} from '../modules/gameFunctions.js';

const {
    onePlayerBtn,
    twoPlayersBtn,
    startGameBtn,
    quitGameBtn,
    continueGameBtn,
    homeBtn,
    restartGameBtn,
    backToHome,
} = DOMElems;


event(onePlayerBtn, 'click', playersSelected);
event(twoPlayersBtn, 'click', playersSelected);

event(startGameBtn, 'click', (ev) => {
    if (gameStart()) {
        if (ev.target.parentElement.children[0].textContent === 'One Player') {
            onePlayerGamePlay();
        } else {
            twoPlayersGamePlay();
        }
    }
});

event(continueGameBtn, 'click', continueGame);
event(restartGameBtn, 'click', restartGame);
event(quitGameBtn, 'click', quitGame);
event(homeBtn, 'click', quitGame);
event(backToHome, 'click', quitGame);
