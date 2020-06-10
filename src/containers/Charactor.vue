<!--  -->
<template lang="pug">
    div(style="padding: 12px;")
        v-snackbar(v-model="snackbar" top style="text-align:center")
            v-row
                v-col(cols="12")
                    span {{dice}}
        v-row(align="center")
            v-col(cols="2")
                v-card
                    v-card-title(v-text="`攻防`")
                    v-card-text
                        v-row
                            v-col(cols="12")
                                v-data-table(item-key="attr" :headers="baseHeaders" :items="czTest" hide-default-footer)
                                    template( v-slot:item.bonus="{ item }")
                                        span(v-if="isRoll(item.attr)") {{item.bonus}}
                                        v-btn(v-else text @click="rollDice(item.bonus, item.attr)") {{item.bonus}}
                                        
            v-col(cols="3")
                v-card
                    v-card-title(v-text="`豁免 & 鉴定`")
                    v-card-text
                        v-row
                            v-col(cols="12")
                                v-data-table(item-key="attr" :headers="saveHeaders" :items="baseItems" hide-default-footer)
                                    template( v-slot:item.attr="{ item }")
                                        span {{!isFirstSaving(item.attr) ? keyAttrEn2Cn(item.attr): ''}}
                                            strong {{isFirstSaving(item.attr) ? keyAttrEn2Cn(item.attr): ''}}
                                    template( v-slot:item.saving="{ item }")
                                        span {{`${isFirstSaving(item.attr) ? '':parseInt(item.bonus)}`}}
                                            strong {{ isFirstSaving(item.attr) ?  `${parseInt(item.bonus) + parseInt(prortry)}` :''}}
            v-col(cols="7")
                v-card
                    v-card-title(v-text="`技能鉴定 & 对抗`")
                    v-card-text
                        v-row
                            v-col(cols="4")
                                v-data-table(item-key="index" :headers="skillHeaders" :items="skillItems1" hide-default-footer)
                                    template( v-slot:item.attr="{ item }")
                                        span {{selectSkills.find(skill => skill === item.attr.name_en) ? '':`${item.attr.name_cn}(${keyAttrEn2Cn(item.attr.key_attr)})`}}
                                            strong {{selectSkills.find(skill => skill === item.attr.name_en) ?`${item.attr.name_cn}(${keyAttrEn2Cn(item.attr.key_attr)})`:''}}
                            v-col(cols="4")
                                v-data-table(item-key="index" :headers="skillHeaders" :items="skillItems2" hide-default-footer)
                                    template( v-slot:item.attr="{ item }")
                                        span {{selectSkills.find(skill => skill === item.attr.name_en) ? '':`${item.attr.name_cn}(${keyAttrEn2Cn(item.attr.key_attr)})`}}
                                            strong {{selectSkills.find(skill => skill === item.attr.name_en) ?`${item.attr.name_cn}(${keyAttrEn2Cn(item.attr.key_attr)})`:''}}
                            v-col(cols="4")
                                v-data-table(item-key="index" :headers="skillHeaders" :items="skillItems3" hide-default-footer)
                                    template( v-slot:item.attr="{ item }")
                                        span {{selectSkills.find(skill => skill === item.attr.name_en) ? '':`${item.attr.name_cn}(${keyAttrEn2Cn(item.attr.key_attr)})`}}
                                            strong {{selectSkills.find(skill => skill === item.attr.name_en) ?`${item.attr.name_cn}(${keyAttrEn2Cn(item.attr.key_attr)})`:''}}
            v-col(cols="3")
                v-card
                    v-card-title(v-text="`职业`")
                    v-card-text
                        v-data-table( item-key="attr" :headers="clazzHeader" :items="classInfoItems" hide-default-footer)
            v-col(cols="12")
                v-card
                    v-card-title(v-text="`专长`")
                    v-card-text
                        v-data-table( item-key="index" :headers="featsHeader" :items="featItems" hide-default-footer)
                            template(v-slot:header.feat_cn="{ header }") 
                                div(style="text-align: left;") {{ `${header.text}` }}
                            template(v-slot:header.source="{ header }") 
                                div(style="text-align: left;") {{ `${header.text}` }}
                            template(v-slot:header.description="{ header }") 
                                div(style="text-align: left;") {{ `${header.text}` }}
                            template( v-slot:item.feat_cn="{ item }")
                                div(style="text-align: left;") {{item.feat_cn}}
                            template( v-slot:item.source="{ item }")
                                div(style="text-align: left;") {{item.source}}
                            template( v-slot:item.description="{ item }")
                                div(style="text-align: left;") {{item.description}}
        v-row(align="center")
        //- span {{classInfoItems}}
        v-card
            v-card-title(v-text="`角色`")
            v-card-text
                v-row
                    v-col(cols="2")
                        v-btn(label block outlined disabled) 角色名稱：测试
                    v-col(cols="2")
                        v-btn(label block outlined) 等级：{{lvl}}
                    v-col(cols="2")
                        v-btn(label block outlined) 种族：半精灵
                    v-col(cols="2")
                        v-btn(label block outlined) 性别：男
                    v-col(cols="2")
                        v-btn(label block outlined) 阵营：中立善良
                    v-col(cols="2")
                        v-btn(label block outlined) 信仰诸神：梅凯丽
                    v-col(cols="2")
                        v-btn(label block outlined) 体型：中体型
                    v-col(cols="2")
                        v-btn(label block outlined) 发色：黑色
                    v-col(cols="2")
                        v-btn(label block outlined) 眼睛：黑色
                    v-col(cols="2")
                        v-btn(label block outlined) 身高：5.9 ft
                    v-col(cols="2")
                        v-btn(label block outlined) 体重：150 lb
                    v-col(cols="2")
                        v-btn(label block outlined) 背景：士兵
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {skills, keyAttrEn2Cn} from './../data/const';
import CHARACTORS from './../data/charactors';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    snackbar: false,
    dice: 0,
    featsHeader:[
             {
            text: '专长',
            value:'feat_cn',
            sortable: false,
            width: 150
        },
        {
            text: '来源',
            value:'source',
            sortable: false,
            width: 100
        },  {
            text: '描述',
            value:'description',
            sortable: false
        }
    ],
    clazzHeader :[
        {
            text: '等级',
            value:'lvl',
            sortable: false
   
        },
        {
            text: '职业',
            value: 'lvlTotal',
            sortable: false
        },
        // {
        //     text: '职业',
        //     value:'clazz',
        //     sortable: false
        // },
        // {
        //     text: '生命骰',
        //     value:'hd',
        //     sortable: false
        // }
    ],
    baseHeaders : [{
        text: '属性',
        value: 'attr',
        sortable: false,
        width: 100
    }, {
        sortable: false,
        text: '值',
        value: 'bonus'
    }],
    saveHeaders: [
        {
            text: '属性',
            value: 'attr',
            sortable: false,
        },{
            sortable: false,
            text: '值',
            value: 'value'
        },{
            sortable: false,
            text: '调整值',
            value: 'bonus'
        }, {
            sortable: false,
            text: '豁免值',
            value: 'saving'
        }
    ],
    skillHeaders: [
        {
            text: '技能',
            value: 'attr',
            sortable: false,
        },
        // {
        //     sortable: false,
        //     text: 'index',
        //     value: 'index'
        // },
        {
            sortable: false,
            text: '值',
            value: 'bonus'
        },
    ]
};
},
//监听属性 类似于data概念
computed: {
    featItems() {
        return this.charactor.featItems;
    },
    clazzItems() {
        return this.charactor.clazzItems;
    },
    classInfoItems() {
        /**
         * 处理思路：
         * 1. 原数组是 [1,2,2,2,2...] 的形式，转换为 [[1], [1,2], [1,2,2] ...] 的形式 => temp
         * 2. 写一个函数，循环遍历数组并统计每个元素出现的次数。使用对象作为结果值，对象属性为数组元素，属性值为元素个数（变种木桶排序）=> temp4
         * 3. 遍历 temp，将 temp 的每个元素从数组转换为对象 => temp3
         * 4. 遍历 temp3，将每个对象拆成需要的字符串 => temp6
         * 5. 把 temp6 格式化为需要的结果，输出 => 返回值
         */
        const temp = this.clazzItems.reduce( (pre, cur, index) => {
           
            const temp2 = (index === 0) ? []:[...pre[index - 1]];
            temp2.push(cur);
            pre.push(temp2);
            //  pre.push(`${index + 1}\t${cur.clazz}` );
             return pre;
        }, [])
        const temp4 = (arr) => {
            const temp5 = {};
            arr.map(ar => {
                if(temp5[ar.clazz]) {
                    temp5[ar.clazz] += 1;
                } else {
                    temp5[ar.clazz] = 1
                }
            })
            return temp5;
        }
        const temp3 = temp.map( tp => {
            return temp4(tp);
        });
        const temp6 = temp3.map( tp => {
            return Object.keys(tp).reduce( (pre, cur, index) => {
                return `${pre}${index === 0 ? '': '/'}${tp[cur]}  ${cur}`
            }, '')
        })
        return temp6.map((tp ,index)=> ({lvl:(index +1), lvlTotal: tp}));
    },
    preSaveItems() {
        return this.charactor.ability_scores;
    },
    selectSkills() {
        return this.charactor.selectSkills;
    },
    charactor() {
        return CHARACTORS.team[0];
    },
    defeace() {
        return 10 +  parseInt(this.baseItems[1].bonus);
    },
    betterSaving() {
        const clz = this.clazzItems[0].clazz;
        switch (clz) {
            case '战士':
                return ['con', 'str'];
            default: 
                return ['int'];
        }
     
    },
    czTest() {
        const _self = this;
        const cTest =  {
            血量: _self.hp,
            攻击: _self.attck,
            防御: _self.defeace,
            法术攻击: _self.spellAttack,
            法术豁免:_self.spellDC,
            先攻: _self.initiative
        }
        return this.parseObj2Arr(cTest);
    },
    hp() {
        const conExtra = parseInt(this.baseItems[2].bonus) * this.lvl;
        const clzHp = this.clazzItems.map( (clz, index) =>  index === 0 ? clz.hd : (clz.hd/2 + 1)*clz.lvl ).reduce( (pre, cur)=> (pre + cur), 0);
        return conExtra + clzHp;
    },
    lvl() {
        return this.clazzItems.map(clz => clz.lvl).reduce( (pre, cur)=> (pre + cur), 0);
    },
    prortry() { 
        const lvl = this.lvl;
        if(lvl < 5) {
            return 2;
        } else if(lvl < 9) {
            return 3;
        } else if(lvl < 13) {
            return 4;
        } else if(lvl < 17) {
            return 5;
        } else {
            return 6;
        }
      
    },
    baseItems () {
        const _baseItems = this.preSaveItems;
        return Object.keys( _baseItems).map(key => ({attr: key, value: _baseItems[key],bonus: (Math.floor((_baseItems[key] - 10)/2) > 0 ? '+':'') +  Math.floor((_baseItems[key] - 10)/2)  }))
    },
    skillItems () {
        const _self = this;
        return  skills.map((key, index) => {
            // `${key.name_cn}(${keyAttrEn2Cn(key.key_attr)})`
            const val = _self.baseItems.find( val => val.attr === key.key_attr);
            const isSelect = _self.selectSkills.find(val => val === key.name_en);
            return {index, attr: key , extra:'', bonus: ((isSelect ? _self.prortry:0) + parseInt( val.bonus))};
        });
    },
    skillItems1 () {
        return this.skillItems.filter((_, index) => index < 6);
    },
    skillItems2() {
        return this.skillItems.filter((_, index) => index >= 6 && index < 12);
    },
    skillItems3() {
        return this.skillItems.filter((_, index) => index >= 12 && index <18);
    },
    spellDC() {
        return 8 + parseInt( this.baseItems[3].bonus) + this.prortry;
    },
    spellAttack() {
        return this.spellDC - 8;
    },
    initiative() {
        return parseInt(this.baseItems[1].bonus);
    },
    attck() {
        return parseInt(this.baseItems[1].bonus ) + this.prortry; 
    }

},
//监控data中的数据变化
watch: {
    snackbar(newVal){
        newVal || this.close()
    }
},
//方法集合
methods: {
    isRoll(attr) {
        const disabled = ['血量', '防御', '法术豁免'];
        return disabled.find( dis => dis === attr);
    },  
    close() {
        this.snackbar = false;
    },
    rollDice(dice, attr) {
        const disabled = ['血量', '防御', '法术豁免'];
        if(!disabled.find( dis => dis === attr)){
            this.dice=`${attr}:${parseInt(dice) + (Math.floor( Math.random() * 20) +1)}` ;
            this.snackbar = true;
        }

    },
    isFirstSaving(saveAttr) {
        return this.betterSaving.find(save => save === saveAttr);
    },
    parseObj2Arr(obj ={}) {
        return Object.keys(obj).map(val => ({attr: val,bonus: obj[val]}));
    },
    keyAttrEn2Cn(val) {
        return keyAttrEn2Cn(val);
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>