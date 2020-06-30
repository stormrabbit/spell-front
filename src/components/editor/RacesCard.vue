<template  lang="pug">
  v-card(class="mb-12" color="grey lighten-3")
    v-card-text
      grid-radio(:text="races.map(race => race.cn_name)" :value="races.map(race => race.en_name)" :onchange="onPickRace")
      grid-radio(:text="toBePickedSubRace.map(race => race.cn_name)" :value="toBePickedSubRace.map(race => race.en_name)" :onchange="onPickSubRace")
    v-card-actions
      v-btn(text @click="step = 2" ) 确认
</template>

<script>
    export default {
        name: "RacesCard.vue",
        props: {
            races: {
                type: Array,
                default() {
                  return []
                }
            }
        },
        data:() =>({
            pickedRace: '',
            toBePickedSubRace: [],
        }),
        methods: {
          onPickRace(val) {
            this.pickedRace = val;
            const pickedSubRace = this.races.find(race => race.en_name === val).sub;
            this.toBePickedSubRace = pickedSubRace ? pickedSubRace : [];
            this.pickedSubRace = pickedSubRace && pickedSubRace.length? pickedSubRace[0].en_name: '';
          },
          onPickSubRace(val) {
            this.pickedSubRace = val;
          },
        }
    }
</script>

<style scoped>

</style>