<template lang="pug">
  v-app(id="inspire")
    v-stepper(v-model="step" vertical)
      v-stepper-step(:complete="step > 1" step="1") {{raceTips}}
      v-stepper-content(step="1")
        race-card(
          @confirm="() => {step = 2}" 
          @modify-race="modifyRace" 
          @modify-subrace="modifySubrace")
      v-stepper-step(:complete="step > 2" step="2") {{classTips}}
      v-stepper-content(step="2")
        classes-card(
          @cancel="() => {step = 1}"
          @confirm="() => {step = 3}"
          @modify-classes="modifyClasses")
      v-stepper-step(:complete="step > 3" step="3") 属性值
      v-stepper-content(step="3")
        attributes-card(
          :extraPoints="extraPoints"   
          @cancel="() => {step = 2}"
          @confirm="() => {step = 4}")
      v-stepper-step(:complete="step > 4" step="4") {{alignmentTips}}
      v-stepper-content(step="4")
        alignments-card(
          :alignments="alignments"
          @modify-alignments="modifyAlignments"
          @cancel="() => {step = 3}"
          @confirm="() => {step = 5}")
      v-stepper-step(:complete="step > 5" step="5") {{backgroundTips}}
      v-stepper-content(step="5")
        backgrounds-card(
          @modify-background="modifyBackground"
          @cancel="() => {step = 4}"
          @confirm="() => {step = 6}")
      v-stepper-step(:complete="step > 6" step="6") {{skillTips}}
      v-stepper-content(step="6")
        skills-card(
          @modify-skill="modifySkill"
          @cancel="() => {step = 5}"
          @confirm="() => {step = 7}")
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
import raceCard from './../components/editor/RacesCard';
import classesCard from '../components/editor/ClassesCard';
import attributesCard from '../components/editor/AttributesCard';
import alignmentsCard from '../components/editor/AlignmentsCard';
import backgroundsCard from '../components/editor/BackgroundsCard';
import skillsCard from '../components/editor/SkillsCard';
// eslint-disable-next-line no-unused-vars
import { locateRaceByEN, locateSubRaceByRaceAndEn } from '../data/races';
export default {
  components: {
    'grid-radio': GridRadio,
    'grid-checkbox' :GridCheckbox,
    raceCard,
    classesCard,
    attributesCard,
    backgroundsCard,
    alignmentsCard,
    skillsCard
  },
  data () {
      return {
          pickedRace: {},
          toBePickedSubRace: [],
          pickedSubRace : {},
          pickedClass: {},
          pickedAlignment: '请选择阵营',
          pickedBackground: '请选择背景',
          pickedSkill: {},
          step: 6,
          alignments: ["守序善良","中立善良","混乱善良","守序中立","绝对中立","混乱中立","守序邪恶","中立邪恶","混乱邪恶"],
          feats: ["警觉","运动员","演员","冲锋手","强弩专家","防御式决斗","双持客","地城探索者","耐性","元素导师","擒抱者","巨武器大师","医疗师","重甲运用","重甲大师","领袖之证","敏锐心灵","轻甲运用","语言学家","幸运","巫师杀手","魔法学徒","战技专家","中甲大师","灵活移动","中甲运用","骑乘战斗","观察力","长柄武器大师","强健身心","仪式施法者","凶蛮打手","哨兵"]
      }
  },
  mounted() {
    this.pickedRace = locateRaceByEN('half_elf');
    // this.pickedSubRace = locateSubRaceByRaceAndEn('dwarf','mountain_dwarf' );
  },
  computed: {
    raceTips() {
      const {
        cn_name:name
      } = (this.pickedRace || {});
      const {
        cn_name:subName
      } = (this.pickedSubRace || {})
      return  `${name ? name:'请选择种族'} ${subName ? subName:''  }`;
    },
    extraPoints() {
      const {
        extra = {}
      } = this.pickedRace || {};
      const {
        extra:extraSub = {}
      } = this.pickedSubRace || {};
      return {...extra, ...extraSub};
    },

    classTips() {
      const {
        cn_name
      } = (this.pickedClass || {});
      return cn_name ? cn_name : '请选择职业';
    }, 
    alignmentTips() {
      return this.pickedAlignment;
    },
    backgroundTips() {
      return this.pickedBackground;
    },
    skillTips() {
      const {
        cn_name
      } = this.pickedSkill;
      return cn_name ? cn_name: '请选择技能';
    }
  },
  methods: {
    modifyRace(race) {
      this.pickedRace = race;
      this.pickedSubRace = {};
    },
    modifySubrace(subrace) {
      this.pickedSubRace = subrace;
    },
    modifyClasses(clazz) {
      this.pickedClass = clazz;
    },
    modifyAlignments(alignment) {
      this.pickedAlignment = alignment;
    },
    modifyBackground(background) {
      this.pickedBackground = background;
    },
    modifySkill(skill) {
      this.pickedSkill = skill;
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