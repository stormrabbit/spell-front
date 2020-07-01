export {
    classes,
    classEn2Cn,
    locateClassByEn
}
const classEn2Cn  = (classEn) => locateClassByEn(classEn).cn_name;
const locateClassByEn  = (classEn) => classes.find(clz => clz.en_name === classEn)
const classes = [
    {
        cn_name:"野蛮人", 
        en_name: 'barbarian',
    },{
        cn_name:"吟游诗人", 
        en_name: 'bard',
        
    },{
        cn_name:"牧师", 
        en_name: 'cleric',
        
    },{
        cn_name:"德鲁伊", 
        en_name: 'druid',
    },{
        cn_name:"战士", 
        en_name: 'warrior',
    },{
        cn_name:"武僧", 
        en_name: 'monk',
        
    },{
        cn_name:"圣武士", 
        en_name: 'paladin',
    },{
        cn_name:"游侠", 
        en_name: 'ranger',
    },{
        cn_name:"游荡者", 
        en_name: 'rouge',
    },{
        cn_name:"邪术师", 
        en_name: 'warlock',
    },{
        cn_name:"法师", 
        en_name: 'wizard',
    }
];