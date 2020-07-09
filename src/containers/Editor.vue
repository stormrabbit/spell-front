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
      v-stepper-step(:complete="step > 3" step="3") {{attributesTips}}
      v-stepper-content(step="3")
        attributes-card(
          :extraPoints="extraPoints"
          @modify-attributes="modifyAttributes"   
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
      v-stepper-step(:complete="step > 7" step="7") {{featTips}}
      v-stepper-content(step="7")
        feats-card(
          @modify-feat="modifyFeat"
          @cancel="() => {step = 6}"
          @confirm="() => {step = 7}")
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
import featsCard from '../components/editor/FeatsCard';
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
    skillsCard,
    featsCard
  },
  data () {
      return {
          attributesTips:'请选择属性',
          pickedRace: {},
          toBePickedSubRace: [],
          pickedSubRace : {},
          pickedClass: {},
          pickedAlignment: '请选择阵营',
          pickedBackground: '请选择背景',
          pickedSkill: [],
          pickedFeat: [],
          step: 3,
          alignments: ["守序善良","中立善良","混乱善良","守序中立","绝对中立","混乱中立","守序邪恶","中立邪恶","混乱邪恶"],
      }
  },
  mounted() {
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
      const {
        cn_name
      }  = this.pickedBackground;
      return cn_name;
    },
    skillTips() {
      return (this.pickedSkill&& this.pickedSkill.length) ? this.pickedSkill.map(skill=> skill.cn_name).join(','): '请选择技能';
    },
    featTips() {
      return  (this.pickedFeat && this.pickedFeat.length)? this.pickedFeat.map(feat => feat.cn_name).join(','): '请选择专长';
    }
  },
  methods: {
    modifyAttributes(val ) {
      this.attributesTips = val && val.length ? val.map(vl => vl.tips).join('\t||\t') : '';
    },
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
    },
    modifyFeat(feat) {
      this.pickedFeat  = feat;
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