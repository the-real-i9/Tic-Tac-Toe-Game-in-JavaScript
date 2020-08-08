const [select, selectAll] = [(elem) => document.querySelector(elem), (elem) => document.querySelectorAll(elem)];
const setProp = (elem, prop, value) => {
    if (!elem) return;
    elem[prop] = value;
};

const setStyle = (elem, prop, value) => {
    if (!elem) return;
    if (!Array.isArray(elem)) {
        elem.style[prop] = value;
    } else {
        for (const el of elem) {
            el.style[prop] = value;
        }
    }
};

const classAction = (elem, action, ...classes) => {
    if (!elem) return;
    elem.classList[action](...classes);
};

const insertHtml = (elem, where, html) => {
    if (!elem) return;
    elem.insertAdjacentHTML(where, html);
};

const event = (elem, type, callback) => {
    elem.addEventListener(type, callback);
};

export {
    select,
    selectAll,
    setProp,
    setStyle,
    classAction,
    insertHtml,
    event,
};
