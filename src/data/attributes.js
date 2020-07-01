const attributes= {
    str: 8,
    dex: 8,
    con: 8,
    wis: 8,
    int: 8,
    cha: 8
  };
const keyAttrEn2Cn = (en) => {
    switch (en) {
        case 'str':
            return '力量';
        case 'dex':
            return '敏捷';
        case 'con':
            return '体质';
        case 'int':
            return '智力';
        case 'wis':
            return '感知';
        case 'cha':
            return '魅力';
        default:
            return en;
    }
}
const parseValue2Bonus = (val) => Math.floor( (parseInt(val) - 10) /2);
const parseColor = (color) => parseInt(color) > 0 ? 'green' : parseInt(color) === 0 ? 'grey':'red';
export {
    attributes,
    keyAttrEn2Cn,
    parseValue2Bonus,
    parseColor
}