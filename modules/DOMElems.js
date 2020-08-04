const [select, selectAll] = [(elem) => document.querySelector(elem), (elem) => document.querySelectorAll(elem)];
const DOMElems = {
    onePlayerBtn: select('#one-player'),
    twoPlayersBtn: select('#two-players'),
};

export default DOMElems;
