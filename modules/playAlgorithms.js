import DOMElems from './DOMElems.js';
import {
    select,
} from './manipFuncs.js';
const {
    playCells,
} = DOMElems;
const playInCell = (avatar, cellIndex) => {
    if (select(`#cell-${cellIndex}`).textContent) return false;
    select(`#cell-${cellIndex}`).textContent = avatar;
    return true;
};

// eslint-disable-next-line import/no-mutable-exports
let firstToPlay = null;
// eslint-disable-next-line import/no-mutable-exports
// let aiHasPlayed = false;

// const makeFalse = () => {
//     aiHasPlayed = false;
// };
const cellsEmpty = [...playCells].every((cell) => cell.textContent === '');

function humanPlay(ev) {
    if (cellsEmpty) {
        firstToPlay = this;
        // console.log({ firstToPlay });
    }
    const played = playInCell(this.avatar, ev.target.id.slice(-1));
    if (played) return true;
    return false;
}

function aiPlay() {
    // The real deal
    if (cellsEmpty) {
        firstToPlay = this;
        // aiHasPlayed = true;
        // console.log({ firstToPlay });
        // If cells are empty play in any cell
        playInCell(this.avatar, Math.trunc(Math.random() * 9));
    }

    // if the opponent played first
    const containsOne = [...playCells].filter((cell) => cell.textContent !== '').length === 1;
    if (containsOne) {
        const otherEmpty = [...playCells].filter((cell) => cell.textContent === '');
        const indexesOfOtherEmpty = otherEmpty.map((cell) => cell.id.slice(-1));
        playInCell(this.avatar, indexesOfOtherEmpty[Math.trunc(Math.random() * indexesOfOtherEmpty.length)]);
    }

    

    return true;
}

export {
    humanPlay,
    aiPlay,
    firstToPlay,
    // makeFalse,
};
