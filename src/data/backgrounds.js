const backgrounds = [{
    cn_name: "侍僧",
    en_name: 'acolyte'
}, {
    cn_name: "骗子",
    en_name: 'charlatan'
}, {
    cn_name: "罪犯",
    en_name: 'criminal'
}, {
    cn_name: "艺人",
    en_name: 'entertainer'
}, {
    cn_name: "平民英雄",
    en_name: 'folk_hero'
}, {
    cn_name: "公会工匠",
    en_name: 'guild_artisan'
}, {
    cn_name: "隐士",
    en_name: 'hermit'
}, {
    cn_name: "贵族",
    en_name: 'noble'
}, {
    cn_name: "化外之民",
    en_name: 'outlander'
}, {
    cn_name: "智者",
    en_name: 'sage'
}, {
    cn_name: "水手",
    en_name: 'sailor'
}, {
    cn_name: "士兵",
    en_name: 'soldier'
}, {
    cn_name: "流浪儿",
    en_name: 'urchin'
}];
const backgroundsCN = backgrounds.map(bg => bg.cn_name);
const backgroundsEN = backgrounds.map(bg => bg.en_name);
export {
    backgrounds,
    backgroundsCN,
    backgroundsEN
}