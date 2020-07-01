<template  lang="pug">
  v-card(class="mb-12" color="grey lighten-3")
    v-card-text
      grid-radio(:text="raceLabels" :value="raceValues" @on-change="onRaceChange")
      grid-radio(:text="subRaceLabels" :value="subRaceValues" @on-change="onSubRaceChange")
    v-card-actions
      v-btn(text @click="$emit('confirm')" ) 确认
</template>

<script>
import gridRadio from '../../components/GridRadio';
import {races, raceLabels, raceValues, locateRaceByEN, locateSubRaceByRaceAndEn} from './../../data/races';
export default {
    name: "RacesCard.vue",
    components: {
      gridRadio
    },
    data:() =>({
        races,
        raceLabels,
        raceValues,
        pickedRace: '',
    }),
    computed: {
      subRaces() {
        return (this.pickedRace && this.pickedRace.sub ) ? this.pickedRace.sub : [];
      },
      subRaceLabels () {
        return this.subRaces.map(subRace => subRace.cn_name);
      },
      subRaceValues () {
        return this.subRaces.map(subRace => subRace.en_name);
      },
    },
    methods: {
      onRaceChange(enName) {
        this.pickedRace =locateRaceByEN(enName);
        this.$emit('modify-race',  this.pickedRace);
      },
      onSubRaceChange(enName) {
        this.pickedSubRace = locateSubRaceByRaceAndEn(this.pickedRace.en_name,  enName);
        this.$emit('modify-subrace', this.pickedSubRace);
      },
    }
}
</script>

<style scoped>

</style>