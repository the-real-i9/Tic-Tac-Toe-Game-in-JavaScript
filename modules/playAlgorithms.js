import DOMElems from './DOMElems.js';
import {
    select,
} from './manipFuncs.js';
import winCombos from './winCombos.js';

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

function humanPlay(ev) {
    const cellsEmpty = [...playCells].every((cell) => cell.textContent === '');
    if (cellsEmpty) {
        firstToPlay = this;
    }
    const played = playInCell(this.avatar, ev.target.id.slice(-1));
    if (played) return true;
    return false;
}

// beatable AI
function beatableAIPlay() {
    const cellsEmpty = [...playCells].every((cell) => cell.textContent === '');
    const otherEmpty = [...playCells].filter((cell) => cell.textContent === '');
    const indexesOfOtherEmpty = otherEmpty.map((cell) => cell.id.slice(-1));
    if (cellsEmpty) {
        firstToPlay = this;

        // If cells are empty play in any cell
        playInCell(this.avatar, Math.trunc(Math.random() * 9));
        return true;
    }

    playInCell(this.avatar, indexesOfOtherEmpty[Math.trunc(Math.random() * indexesOfOtherEmpty.length)]);

    return true;
}

// unbeatable AI
function unbeatableAIPlay() {
    // The real deal
    const cellsEmpty = [...playCells].every((cell) => cell.textContent === '');
    const containsOne = [...playCells].filter((cell) => cell.textContent !== '').length === 1;
    const otherEmpty = [...playCells].filter((cell) => cell.textContent === '');
    const indexesOfOtherEmpty = otherEmpty.map((cell) => cell.id.slice(-1));
    if (cellsEmpty) {
        firstToPlay = this;

        // If cells are empty play in any cell
        playInCell(this.avatar, Math.trunc(Math.random() * 9));
        return true;
    }

    if (containsOne) {
        // if the opponent played first
        playInCell(this.avatar, indexesOfOtherEmpty[Math.trunc(Math.random() * indexesOfOtherEmpty.length)]);
        return true;
    }

    const checkMatch = (target, cases) => {
        const [case1, case2, case3] = cases;
        if (case1[0] === target[0] && case1[1] === target[1] && case1[2] === target[2]) {
            return true;
        } if (case2[0] === target[0] && case2[1] === target[1] && case2[2] === target[2]) {
            return true;
        } if (case3[0] === target[0] && case3[1] === target[1] && case3[2] === target[2]) {
            return true;
        }
        return false;
    };

    const winComboAIHasPlayedTwice = () => {
        for (const winCombo of winCombos) {
            const mapToAvatars = winCombo.map((cellIndex) => select(`#cell-${cellIndex}`).textContent);
            const hasPlayedTwiceMatches = [
                [this.avatar, this.avatar, ''],
                [this.avatar, '', this.avatar],
                ['', this.avatar, this.avatar],
            ];
            if (checkMatch(mapToAvatars, hasPlayedTwiceMatches)) {
                const emptyIndex = mapToAvatars.indexOf('');
                const playIndex = winCombo[emptyIndex];
                return String(playIndex);
            }
        }
        return false;
    };

    const cellToPlayIn = winComboAIHasPlayedTwice();
    if (cellToPlayIn) {
        playInCell(this.avatar, cellToPlayIn);
        return true;
    }

    // check the winCombo in which opponent has played twice
    const winComboOpponentHasPlayedTwice = () => {
        for (const winCombo of winCombos) {
            const mapToAvatars = winCombo.map((cellIndex) => select(`#cell-${cellIndex}`).textContent);
            const oppAvatar = this.avatar === 'X' ? 'O' : 'X';
            const hasPlayedTwiceMatches = [
                [oppAvatar, oppAvatar, ''],
                [oppAvatar, '', oppAvatar],
                ['', oppAvatar, oppAvatar],
            ];
            if (checkMatch(mapToAvatars, hasPlayedTwiceMatches)) {
                const emptyIndex = mapToAvatars.indexOf('');
                const playIndex = winCombo[emptyIndex];
                return String(playIndex);
            }
        }
        return false;
    };

    const cellToBlock = winComboOpponentHasPlayedTwice();
    if (cellToBlock) {
        playInCell(this.avatar, cellToBlock);
        return true;
    }

    const winComboAIHasPlayedOnce = () => {
        for (const winCombo of winCombos) {
            const mapToAvatars = winCombo.map((cellIndex) => select(`#cell-${cellIndex}`).textContent);
            const hasPlayedOnceMatches = [
                [this.avatar, '', ''],
                ['', '', this.avatar],
                ['', this.avatar, ''],
            ];
            if (checkMatch(mapToAvatars, hasPlayedOnceMatches)) {
                const emptyIndex = mapToAvatars.indexOf('');
                const playIndex = winCombo[emptyIndex];
                return String(playIndex);
            }
        }
        return false;
    };

    const cellToPlayInToCont = winComboAIHasPlayedOnce();
    if (cellToPlayInToCont) {
        playInCell(this.avatar, cellToPlayInToCont);
        return true;
    }

    playInCell(this.avatar, indexesOfOtherEmpty[0]);

    return true;
}

export {
    humanPlay,
    unbeatableAIPlay,
    firstToPlay,
    beatableAIPlay,
};
