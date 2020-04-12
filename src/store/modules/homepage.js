export default {
    namespaced: true,
    state: {
        spells: []
    },
    getters: {
        spells: state => {
            return state.spells
        },
    },
    mutations: {
        putSpells(state, spells) {
            state.spells = [
                ...spells,
            ]
        }
    },
    actions: {
        retrevePersonalSpells({
            commit
        }) {
            const mock = [{
                "_id": "5e109414b8fca22e64283c5d",
                "lvl": "0",
                "nickname": "酸液飞溅",
                "name": "acid_splash",
                "school": "咒法",
                "time": "1个动作",
                "range": "60尺",
                "material": "",
                "describe": "你掷出一颗酸液球。选择射程内的一个生物或两个相距不超过５尺的生物。目标必须通过一次敏捷豁免否则受到１ｄ６点强酸伤害。",
                "upgrade": "此法术的伤害在你５级时为２ｄ６，１１级时为３ｄ６，１７级时为４ｄ６。"
            }, {
                "_id": "5e109414b8fca22e64283c7f",
                "lvl": "0",
                "nickname": "剑刃防护",
                "name": "blade_ward",
                "school": "防护",
                "time": "1个动作",
                "range": "自身",
                "material": "",
                "describe": "你伸出手在空气中勾勒出一个防护的印记。直到你的下回合结束，你对武器造成的钝击，穿刺和挥砍伤害具有抗力。",
                "upgrade": ""
            }, {
                "_id": "5e109414b8fca22e64283c87",
                "lvl": "0",
                "nickname": "寒冷之触",
                "name": "chill_touch",
                "school": "死灵",
                "time": "1个动作",
                "range": "120尺",
                "material": "",
                "describe": "你在射程内一个生物的格子里召唤一个骷髅鬼手。作远程法术攻击，让那个生物感受墓穴的寒冷。命中后，鬼手抓在目标身上，目标受1d8暗蚀伤害，在你下一回合开始前无法回复生命值。    \n如果你击中一个不死生物，它对你的攻击受劣势直到你的下回合结束。",
                "upgrade": "5级2d8，11级3d8，17级4d8"
            }, {
                "_id": "5e109414b8fca22e64283cae",
                "lvl": "0",
                "nickname": "舞光术",
                "name": "dancing_lights",
                "school": "塑能",
                "time": "1个动作",
                "range": "120尺",
                "material": "",
                "describe": "创造四个火炬大小，看起来像火把、灯笼或发光球体的光源，使其盘旋于空中。你也可以将四处光源合为一个中型类人生物的模糊光影。无论选择哪种方式，每处光源提供半径10英尺的昏暗照明。\n在你的回合用一个附赠动作，可以在施法距离内将这些光源移动至多60英尺。这个法术创造的两处光源之间保持20英尺的距离。如果当一处光源超出了施法距离就会熄灭。",
                "upgrade": ""
            }, {
                "_id": "5e109414b8fca22e64283cc9",
                "lvl": "0",
                "nickname": "德鲁伊伎俩",
                "name": "druidcraft",
                "school": "变化",
                "time": "1个动作",
                "range": "30尺",
                "material": "",
                "describe": "自然的精魂在低语，产生以下效果之一：\n你创造小而无害的感官效果，可以预测你所在地点接下来24小时的天气情况。这个效果可以是一个代表晴空的金球，一朵代表雨天的云彩，代表雪日而飘飞的雪花等等。这个效果持续1个回合。\n你可以立即让一朵鲜花绽放，一颗种子破壳，一片叶蕾发芽。\n你创造一个小而无害的即时感官效果，如落叶、微风、小动物的动静或者臭鼬的微弱气味。这个效果在5英尺立方的空间内起效。\n你可以立即点亮或熄灭一根蜡烛、一把火炬或是一处小篝火。",
                "upgrade": ""
            }, {
                "_id": "5e109414b8fca22e64283cca",
                "lvl": "0",
                "nickname": "魔能爆",
                "name": "eldritch_blast",
                "school": "塑能",
                "time": "1个动作",
                "range": "120尺",
                "material": "",
                "describe": "一束爆发着能量的光线射向生物。通过一个远程法术攻击检定，命中则目标受到1d10力场伤害。\n当你达到更高的等级，这个法术可以创造更多的射线：5级两条，11级三条，17级四条。你可以决定这些射线是攻击同一个目标还是不同的目标，每条射线都单独作攻击检定。\n",
                "upgrade": ""
            }, {
                "_id": "5e109414b8fca22e64283ce4",
                "lvl": "0",
                "nickname": "火焰箭",
                "name": "fire_bolt",
                "school": "塑能",
                "time": "1个动作",
                "range": "120尺",
                "material": "",
                "describe": "你向射程内的一个生物或物体掷出一小团火焰。对目标进行一次远程法术攻击检定，命中造成1d10火焰伤害。被击中的没有被穿戴或携带的可燃物被点燃。\n你到达5级时，该法术的伤害增加1d10（变为2d10），11级时再加1d10（变为3d10），17级时再加1d10（变为4d10）。",
                "upgrade": ""
            }, {
                "_id": "5e109414b8fca22e64283cf2",
                "lvl": "0",
                "nickname": "友善术",
                "name": "friends",
                "school": "附魔",
                "time": "1个动作",
                "range": "自身",
                "material": "一点脸上的化妆",
                "describe": "在法术持续时间内，你在所有对你指定的非敌对生物的魅力检定上有优势。当法术终止时，目标意识到你使用了魔法来影响它的情绪并且敌视你。有暴力倾向的生物可能会攻击你。另一些生物基于你与它互动的性质可能会用其他方式报复（按DM的判断）。",
                "upgrade": ""
            }];
            commit('putSpells', mock);
        }
    }
}