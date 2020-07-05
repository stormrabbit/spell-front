const skills = [{
            cn_name: "运动",
            en_name: 'athletics'
        }, {
            cn_name: "体操",
            en_name: 'acrobatics'
        }, {
            cn_name: "巧手",
            en_name: 'sleight_of_Hand'
        }, {
            cn_name: "隐匿",
            en_name: 'stealth'
        }, {
            cn_name: "奥秘",
            en_name: 'arcana'
        }, {
            cn_name: "历史",
            en_name: 'history'
        }, {
            cn_name: "调查",
            en_name: 'investigation'
        }, {
            cn_name: "自然",
            en_name: 'nature'
        }, {
            cn_name: "宗教",
            en_name: 'religion'
        }, {
            cn_name: "驯兽",
            en_name: 'anima_handling'
        }, {
            cn_name: "洞悉",
            en_name: 'insight'
        }, {
            cn_name: "医药",
            en_name: 'medicine'
        }, {
            cn_name: "察觉",
            en_name: 'perception'
        }, {
            cn_name: "求生",
            en_name: 'survival'
        }, {
            cn_name: "欺瞒",
            en_name: 'deception'
        }, {
            cn_name: "威吓",
            en_name: 'intimidation'
        }, {
            cn_name: "表演",
            en_name: 'performance'
        }, {
            cn_name: "游说",
            en_name: 'persuasion'
        }];
const skillsCN = skills.map(skill => skill.cn_name);
const skillsEN = skills.map(skill => skill.en_name);
const  locateSkillByEN =(en) => skills.find( skill => skill.en_name === en)
export {
    skills,
    skillsCN,
    skillsEN,
    locateSkillByEN
}