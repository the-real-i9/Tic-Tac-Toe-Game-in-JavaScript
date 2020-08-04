import onePlayerSetting from './onePlayerGameSet.js';
import twoPlayersSetting from './twoPlayersGameSet.js';

const playersSelected = (ev) => {
    if (ev.target.id === 'one-player') {
        onePlayerSetting();
    } else {
        twoPlayersSetting();
    }
};

export default playersSelected;
