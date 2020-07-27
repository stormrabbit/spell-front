export const getClickPath = (el) => {
    const path = [];
    while (el && el.nodeType === 1) {
        // eslint-disable-next-line no-console
        const node = el.hasAttribute('id') ? parseNodeWithId(el) : parseNodeWithSibling(el);
        path.unshift(node);
        if( el.hasAttribute('id') ) {
            break;
        }
        el = el.parentNode;
    }
    return path.join('|');
};
const parseNodeWithId = (el) => el.localName.toLowerCase() + '[@id="' + el.getAttribute('id') + '"]';
const parseNodeWithSibling = (el) => {
    let i = 1;
    let siblings = el.previousSibling;
    while (siblings) {
        if (siblings.localName === el.localName) {
            i++;
        }
        siblings = siblings.previousSibling;
    }
    let classNames = ''
    if (el.hasAttribute('class')) {
        classNames = el.getAttribute('class').replace(/ /g, ' .').replace(/^(.*)$/, '.$1')
    }
    return el.localName.toLowerCase() + '[' + i + '](' + classNames + ')';
}
