import DOMElems from './DOMElems.js';
import { select } from './manipFuncs.js';
// const {  } = DOMElems;
const playInCell = (avatar, cellIndex) => {
    if (select(`#cell-${cellIndex}`).textContent) return false;
    select(`#cell-${cellIndex}`).textContent = avatar;
    return true;
};


function humanPlay(ev) {
    const played = playInCell(this.avatar, ev.target.id.slice(-1));
    if (played) return true;
    return false;
}

function aiPlay() {
    console.log(Math.random() * 9, this.name);
    return true;
}

export { humanPlay, aiPlay };
