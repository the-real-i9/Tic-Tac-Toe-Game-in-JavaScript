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
const oppAvatar = this.avatar === 'X' ? 'O' : 'X';

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
function easyLevelDifficulty() {
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

function normalLevelDifficulty() {
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
                const emptyIndex = [mapToAvatars.indexOf(''), mapToAvatars.lastIndexOf('')][Math.trunc(Math.random() * 2)];
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

let whereAIWillPlay = null;
let whereAIFirstPlayed = null;
let whereHumanFirstPlayed = null;
let whereHumanWillPlay = null;

function unbeatableAIPlay() {
    const evenCells = [0, 2, 6, 8, 4];
    const upperEven = [0, 2];
    const lowerEven = [6, 8];
    const middleEven = [4];
    const otherEmpty = [...playCells].filter((cell) => cell.textContent === '');
    const indexesOfOtherEmpty = otherEmpty.map((cell) => cell.id.slice(-1));
    const containsOne = [...playCells].filter((cell) => cell.textContent !== '').length === 1;
    const cellsEmpty = [...playCells].every((cell) => cell.textContent === '');
    const indexIfCellsAreEmpty = evenCells[Math.trunc(Math.random() * evenCells.length)];

    if (cellsEmpty) {
        firstToPlay = this;

        playInCell(this.avatar, String(indexIfCellsAreEmpty));
        return true;
    }

    if (containsOne) {
        playInCell(this.avatar, String(...middleEven));
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

    const containsThree = [...playCells].filter((c) => c.textContent !== '').length === 3;
    const getIndexToBlockTwoWayWin = () => {
        const cellsIndexWithHuman = [...playCells].filter((c) => c.textContent === oppAvatar).map((c) => Number(c.id.slice(-1)));
        const cellsIndexWithAI = [...playCells].filter((c) => c.textContent === this.avatar).map((c) => Number(c.id.slice(-1)));
        if (cellsIndexWithHuman.length === 2 && cellsIndexWithHuman.every((v) => v % 2) && cellsIndexWithAI.length === 1 && cellsIndexWithAI.includes(4)) {
            if (cellsIndexWithHuman.includes(3) && cellsIndexWithHuman.includes(5)) {
                const cellIndexToBlock = cellsIndexWithAI[0] * 2;
                return String(cellIndexToBlock);
            }
            const humanIndexSum = cellsIndexWithHuman.reduce((a, v) => a + v);
            const cellIndexToBlock = humanIndexSum - cellsIndexWithAI[0];
            return String(cellIndexToBlock);
        }
        return false;
    };

    const indexToBlockTwoWayWin = getIndexToBlockTwoWayWin();
    if (containsThree && indexToBlockTwoWayWin) {
        playInCell(this.avatar, indexToBlockTwoWayWin);
        return true;
    }


    const checkBeenPlayedOnceInCombo = (combo) => {
        const check = combo.map((c) => select(`#cell-${c}`).textContent);
        if (check.filter((v) => v !== '').length === 1) {
            return true;
        }
        return false;
    };

    const checkLastIndexEmpty = (combo) => {
        const check = combo.map((c) => select(`#cell-${c}`).textContent);
        if (!check[2]) {
            return true;
        }
        return false;
    };

    const checkFirstIndexEmpty = (combo) => {
        const check = combo.map((c) => select(`#cell-${c}`).textContent);
        if (!check[0]) {
            return true;
        }
        return false;
    };


    const theCellToMakePlayInToMakeHumanPlayInOdd = () => {
        const filterWhereAIPlayed = [...playCells].filter((cell) => cell.textContent === this.avatar);
        const filterWhereHumanPlayed = [...playCells].filter((cell) => cell.textContent === oppAvatar);
        if (filterWhereAIPlayed.length === 1 && filterWhereHumanPlayed === 1) {
            const getTheCellIndex = Number(filterWhereAIPlayed[0].id.slice(-1));
            const getTheHumanCellIndex = Number(filterWhereHumanPlayed[0].id.slice(-1));
            const combosThatContainsTheIndex = winCombos.filter((combo) => combo.includes(getTheCellIndex));
            const combosThatAreNotAllEven = combosThatContainsTheIndex.filter((combo) => !combo.every((c) => c % 2 === 0));
            const combosThatHaveOnlyBeenPlayedOnce = combosThatAreNotAllEven.filter((combo) => checkBeenPlayedOnceInCombo(combo));
            if (upperEven.includes(getTheCellIndex)) {
                if (combosThatHaveOnlyBeenPlayedOnce.length > 1) {
                    const finalRemCombosLastIndexEmpty = combosThatHaveOnlyBeenPlayedOnce.filter((combo) => checkLastIndexEmpty(combo));
                    if (finalRemCombosLastIndexEmpty.length > 1) {
                        const finalCell = finalRemCombosLastIndexEmpty[Math.trunc(Math.random() * finalRemCombosLastIndexEmpty.length)][2];
                        return [String(finalCell), getTheCellIndex, getTheHumanCellIndex];
                    }
                    const finalCell = finalRemCombosLastIndexEmpty[0][2];
                    return [String(finalCell), getTheCellIndex, getTheHumanCellIndex];
                }
            } else if (lowerEven.includes(getTheCellIndex)) {
                if (combosThatHaveOnlyBeenPlayedOnce.length > 1) {
                    const finalRemCombosFirstIndexEmpty = combosThatHaveOnlyBeenPlayedOnce.filter((combo) => checkFirstIndexEmpty(combo));
                    if (finalRemCombosFirstIndexEmpty.length > 1) {
                        const finalCell = finalRemCombosFirstIndexEmpty[Math.trunc(Math.random() * finalRemCombosFirstIndexEmpty.length)][2];
                        return [String(finalCell), getTheCellIndex, getTheHumanCellIndex];
                    }
                    const finalCell = finalRemCombosFirstIndexEmpty[0][2];
                    return [String(finalCell), getTheCellIndex, getTheHumanCellIndex];
                }
            } else if (middleEven.includes(getTheCellIndex)) {
                if (combosThatHaveOnlyBeenPlayedOnce.length > 1) {
                    const finalRemCombosFirstOrLastIndexEmpty = combosThatHaveOnlyBeenPlayedOnce.filter((combo) => checkFirstIndexEmpty(combo) && checkLastIndexEmpty(combo));
                    const either = [0, 2];
                    const eitherRand = either[Math.trunc(Math.random() * either.length)];
                    if (finalRemCombosFirstOrLastIndexEmpty.length > 1) {
                        const finalCombo = finalRemCombosFirstOrLastIndexEmpty[Math.trunc(Math.random() * finalRemCombosFirstOrLastIndexEmpty.length)];
                        const finalCell = finalCombo[eitherRand];
                        if (getTheHumanCellIndex % 2) {
                            const whereHumanWillBlock = eitherRand === 0 ? finalCombo[2] : finalCombo[0];
                            return [String(finalCell), getTheCellIndex, getTheHumanCellIndex, whereHumanWillBlock];
                        }
                        return [String(finalCell), getTheCellIndex, getTheHumanCellIndex];
                    }
                    const finalCombo = finalRemCombosFirstOrLastIndexEmpty[0];
                    const finalCell = finalCombo[eitherRand];
                    if (getTheHumanCellIndex % 2) {
                        const whereHumanWillBlock = eitherRand === 0 ? finalCombo[2] : finalCombo[0];
                        return [String(finalCell), getTheCellIndex, getTheHumanCellIndex, whereHumanWillBlock];
                    }
                    return [String(finalCell), getTheCellIndex, getTheHumanCellIndex];
                }
            }
        }
        return false;
    };

    const indexToPlayToMakeHumanPlayInOdd = theCellToMakePlayInToMakeHumanPlayInOdd();

    if (indexToPlayToMakeHumanPlayInOdd) {
        [whereAIWillPlay, whereAIFirstPlayed, whereHumanFirstPlayed, whereHumanWillPlay] = indexToPlayToMakeHumanPlayInOdd;
        playInCell(this.avatar, indexToPlayToMakeHumanPlayInOdd[0]);
        return true;
    }

    const getIndexToFormTwoWayWin = () => {
        if (upperEven.includes(whereAIFirstPlayed)) {
            if (whereHumanFirstPlayed === 7) {
                const theComboToPlayIn = winCombos.filter((combo) => combo[2] === whereAIWillPlay && combo.includes(4))[0];
                const theCellIndexToPlayIn = theComboToPlayIn[0];
                return String(theCellIndexToPlayIn);
            }
            const theComboToPlayIn = winCombos.filter((combo) => combo[0] === whereAIFirstPlayed && combo.includes(4))[0];
            const theCellIndexToPlayIn = theComboToPlayIn[2];
            return String(theCellIndexToPlayIn);
        }
        if (lowerEven.includes(whereAIFirstPlayed)) {
            if (whereAIFirstPlayed === 6 && whereHumanFirstPlayed === 0) {
                const theComboToPlayIn = winCombos.filter((combo) => combo[2] === whereAIFirstPlayed && combo.includes(4))[0];
                const theCellIndexToPlayIn = theComboToPlayIn[0];
                return String(theCellIndexToPlayIn);
            }
            if (whereHumanFirstPlayed === 7) {
                const theComboToPlayIn = winCombos.filter((combo) => combo[2] === whereAIFirstPlayed && combo.includes(4))[0];
                const theCellIndexToPlayIn = theComboToPlayIn[0];
                return String(theCellIndexToPlayIn);
            }
            const theComboToPlayIn = winCombos.filter((combo) => combo[0] === whereAIWillPlay && combo.includes(4))[0];
            const theCellIndexToPlayIn = theComboToPlayIn[2];
            return String(theCellIndexToPlayIn);
        }
        if (middleEven.includes(whereAIFirstPlayed)) {
            if (whereHumanWillPlay !== undefined && whereHumanWillPlay !== null) {
                const theCellIndexToPlayIn = (whereHumanWillPlay + whereHumanFirstPlayed) - whereAIFirstPlayed;
                return String(theCellIndexToPlayIn);
            }
        }
        return false;
    };

    if ([...playCells].filter((c) => select(`cell-${c}`).textContent !== '').length === 4) {
        const indexToFormTwoWayWin = getIndexToFormTwoWayWin();
        if (indexToFormTwoWayWin) {
            playInCell(this.avatar, indexToFormTwoWayWin);
            return true;
        }
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
                const emptyIndex = [mapToAvatars.indexOf(''), mapToAvatars.lastIndexOf('')][Math.trunc(Math.random() * 2)];
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
    easyLevelDifficulty,
    normalLevelDifficulty,
};
