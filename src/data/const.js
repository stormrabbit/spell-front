const skills = [{
    name_en: 'athletics',
    name_cn: '运动',
    key_attr: 'str'
}, {
    name_en: 'acrobatics',
    name_cn: '体操',
    key_attr: 'dex'
}, {
    name_en: 'sleight_of_hand',
    name_cn: '巧手',
    key_attr: 'dex'
}, {
    name_en: 'stealth',
    name_cn: '隐匿',
    key_attr: 'dex'
}, {
    name_en: 'arcana',
    name_cn: '奥秘',
    key_attr: 'int'
}, {
    name_en: 'history',
    name_cn: '历史',
    key_attr: 'int'
}, {
    name_en: 'investigation',
    name_cn: '调查',
    key_attr: 'int'
}, {
    name_en: 'nature',
    name_cn: '自然',
    key_attr: 'int'
}, {
    name_en: 'religion',
    name_cn: '宗教',
    key_attr: 'int'
}, {
    name_en: 'animal_handling',
    name_cn: '驯兽',
    key_attr: 'wis'
}, {
    name_en: 'insight',
    name_cn: '洞悉',
    key_attr: 'wis'
}, {
    name_en: 'medicine',
    name_cn: '医疗',
    key_attr: 'wis'
}, {
    name_en: 'perception',
    name_cn: '察觉',
    key_attr: 'wis'
}, {
    name_en: 'survival',
    name_cn: '求生',
    key_attr: 'wis'
}, {
    name_en: 'deception',
    name_cn: '欺骗',
    key_attr: 'cha'
}, {
    name_en: 'intimidation',
    name_cn: '威吓',
    key_attr: 'cha'
}, {
    name_en: 'performance',
    name_cn: '表演',
    key_attr: 'cha'
}, {
    name_en: 'persuasion',
    name_cn: '游说',
    key_attr: 'int'
}];

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
export {
    skills,
    keyAttrEn2Cn
}