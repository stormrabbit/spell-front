<template lang="pug">
  v-app(id="inspire")
    v-stepper(v-model="step" vertical)
      v-stepper-step(:complete="step > 1" step="1") 选择种族
      v-stepper-content(step="1")
        v-card(class="mb-12" color="grey lighten-3")
          v-card-text
            grid-radio(:text="races.map(race => race.cn_name)" :value="races.map(race => race.en_name)" :onchange="onchange")  
            grid-radio(:text="pickedSubRace.map(race => race.cn_name)" :value="pickedSubRace.map(race => race.en_name)" :onchange="()=>{}")
          v-card-actions
            v-btn(text @click="step = 2" ) 确认
      v-stepper-step(:complete="step > 2" step="2") 选择职业
      v-stepper-content(step="2")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            grid-radio(:text="classes")
          v-card-actions
            v-btn(text @click="step = 3") 确认
            v-btn(text @click="step = 1") 返回
      v-stepper-step(:complete="step > 3" step="3") 属性值
      v-stepper-content(step="3")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-title 剩余点数：{{points}}
          v-card-text
            v-row(align="baseline")
              v-col(cols="6" v-for="(key, index) in Object.keys(abilities)" :key="index")
                div(style="display: flex;align-items: center;")
                  span {{`${thisKeyAttrEn2Cn(key)}基础值：`}}
                  span {{abilities[key]< 10 ? `0${abilities[key]}` : abilities[key]}}
                  v-spacer
                  span {{`种族加值：`}}
                  span {{extra[key] ? 1: 0 + '\t'}}
                  v-spacer
                  v-btn(class="ma-2" text icon color="blue lighten-2" @click="modifyValue(key)")
                    v-icon mdi-thumb-up
                  span /
                  v-btn(class="ma-2" text icon color="red lighten-2" @click="modifyValue(key, false)")
                    v-icon(dark) mdi-thumb-down
                  v-spacer
                  span 调整值：
                  v-icon(:color="parseValue2Bonus(abilities[key] + (extra[key] ? 1: 0)) < 0 ? 'red':'green'" :style="(parseValue2Bonus(abilities[key] + (extra[key] ? 1: 0)) === 0)?{visibility: 'hidden'} :{}") {{parseValue2Bonus(abilities[key] + (extra[key] ? 1: 0)) < 0 ? 'mdi-minus':'mdi-plus'}}
                  v-chip(class="ma-2"  style="width: 32px;height: 32px;" :color="parseColor(parseValue2Bonus(abilities[key] + (extra[key] ? 1: 0)))" text-color="white") {{Math.abs (parseValue2Bonus(abilities[key] + (extra[key] ? 1: 0)))}}
                  v-spacer
            div(class="title" style="width: 100%;text-align: left;") 种族点数：{{extraPoints}}
              v-row
                v-col(cols="2" v-for="(key, index) in Object.keys(abilities)" :key="index")
                  v-checkbox( :disabled="!extraPoints && !extra[key]" :label="`${thisKeyAttrEn2Cn(key)} + 1`" v-model="extra[key]")
              v-row
                v-col(cols="2" v-for="(key, index) in Object.keys(abilities)" :key="index")
                  v-checkbox( disabled :label="`${thisKeyAttrEn2Cn(key)} + 2`")
          v-card-actions
            v-btn(text @click="step = 4") 确认
            v-btn(text @click="step = 2") 返回
      v-stepper-step(:complete="step > 4" step="4") 选择阵营
      v-stepper-content(step="4")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            grid-radio(:text="alignments")
          v-card-actions
            v-btn(text @click="step = 5") 确认
            v-btn(text @click="step = 3") 返回
      v-stepper-step(:complete="step > 5" step="5") 选择背景
      v-stepper-content(step="5")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            grid-radio(:text="backgrounds")
          v-card-actions
            v-btn(text @click="step = 6") 确认
            v-btn(text @click="step = 4") 返回
      v-stepper-step(:complete="step > 6" step="6") 选择技能
      v-stepper-content(step="6")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            grid-checkbox(:text="skills")
          v-card-actions
            v-btn(text @click="step = 7") 确认
            v-btn(text @click="step = 5") 返回
      v-stepper-step(:complete="step > 7" step="7") 选择专长
      v-stepper-content(step="7")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            grid-checkbox(:text="feats")
          v-card-actions
            v-btn(text @click="step = 8") 确认
            v-btn(text @click="step = 6") 返回    
</template>

<script>
import GridRadio from './../components/GridRadio';
import GridCheckbox from './../components/GridCheckbox';
import {keyAttrEn2Cn} from './../data/const';
import {races} from './../data/races';
export default {
  components: {
    'grid-radio': GridRadio,
    'grid-checkbox' :GridCheckbox
  },
    data () {
        return {
          temp:'',
            pickedRace: {},
            pickedSubRace: [],
            points: 27,
            step: 1,
            extra: {
              str: 0,
              dex: 0,
              con: 0,
              wis: 0,
              int: 0,
              cha: 0
            },
            abilities: {
              str: 8,
              dex: 8,
              con: 8,
              wis: 8,
              int: 8,
              cha: 8
            },
            races,
            classes: ["野蛮人","吟游诗人","牧师","德鲁伊","战士","武僧","圣武士","游侠","游荡者","邪术师","法师"],
            alignments: ["守序善良","中立善良","混乱善良","守序中立","绝对中立","混乱中立","守序邪恶","中立邪恶","混乱邪恶"],
            backgrounds: ["侍僧","骗子","罪犯","艺人","平民英雄","公会工匠","隐士","贵族","化外之民","智者","水手","士兵","流浪儿"],
            skills: ["运动","体操","巧手","隐匿","奥秘","历史","调查","自然","宗教","驯兽","洞悉","医药","察觉","求生","欺瞒","威吓","表演","游说"],
            feats: ["警觉","运动员","演员","冲锋手","强弩专家","防御式决斗","双持客","地城探索者","耐性","元素导师","擒抱者","巨武器大师","医疗师","重甲运用","重甲大师","领袖之证","敏锐心灵","轻甲运用","语言学家","幸运","巫师杀手","魔法学徒","战技专家","中甲大师","灵活移动","中甲运用","骑乘战斗","观察力","长柄武器大师","强健身心","仪式施法者","凶蛮打手","哨兵"]
        }
    },
    computed: {
      extraPoints() {
        const _self = this;
        return 2 - Object.keys( _self.extra).reduce( (pre, cur ) =>  (_self.extra[cur] ? pre + 1: pre), 0)
      }
    },
    methods: {
      onchange(val) {
        this.pickedRace = val;
        const pickedSubRace = races.find(race => race.en_name === val).sub;
        this.pickedSubRace = pickedSubRace ? pickedSubRace : [];
      },
      parseColor(color) {
        return parseInt(color) > 0 ? 'green' : parseInt(color) === 0 ? 'grey':'red';
      },
      thisKeyAttrEn2Cn(key) {
        return keyAttrEn2Cn(key);
      },
      modifyValue(attr, plus = true) {
        const temp = this.abilities[attr];

        if( temp === 8 && !plus) {
          return;
        } 
        if(temp === 15 && plus) {
          return;
        }
        const cost = plus ? (temp <13 ? -1:-2) : (temp > 13 ? 2:1);
        if((this.points + cost < 0) || (this.points + cost >27)) {
          return;
        }
        this.points = this.points + cost;
        if((!plus && this.points === 0) || (plus && this.points === 27)) {
          return ;
        }
        this.abilities[attr] =  this.abilities[attr] + (plus ? 1 : -1);
      },
      parseValue2Bonus(val) {
        return  Math.floor( (parseInt(val) - 10) /2);
      }
    }
}
</script>

<style scoped>
/deep/ .v-input--selection-controls .v-input__control {
  width: 100%;
}
/deep/ .v-text-field__details {
  display: none;
}
/deep/ .v-input__slot {
  margin-bottom: 0px;
}
.title {
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}
</style>>