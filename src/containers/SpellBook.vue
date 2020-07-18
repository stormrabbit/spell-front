<template lang="pug">
  v-app(id="inspire")
    v-overlay(:value="overlay")
      v-progress-circular(indeterminate size="64")
    v-navigation-drawer(v-model="drawer" app)
      sb-side(:charactors="charactors",@change="chooseCharactor")
    sb-title-bar(:charactor="selectedCharactor" @icon-click="drawer = !drawer" @clip-click="unitStatus = true")
    v-dialog(v-if="spellsDialogStatus" v-model="spellsDialogStatus",transition="dialog-bottom-transition")
      sb-spell(:charactor="selectedCharactor" @close="spellsDialogStatus = false")
    v-dialog(v-model="newStatus" persistent v-if="newStatus")
      sb-unit(@save="resetData",@close="newStatus = false" :title="`新建`")
    v-dialog(v-model="unitStatus" persistent v-if="unitStatus")
      sb-unit(@save="resetData" @close="unitStatus = false" :charactor="selectedCharactor" :title="`修改`")
    v-content
      sb-book(:charactor="selectedCharactor" @scribe="spellsDialogStatus = true")
    v-footer(color="primary",dark app)
      sb-button(@scribe="spellsDialogStatus = true")    
      span(class="white--text") &copy; 龙骑将杨影枫
</template>


<script>
import sbSide from "@components/spellbook/sbSide";
import sbTitleBar from "@components/spellbook/sbTitleBar";
import sbBook from "@components/spellbook/sbBook";
import sbSpell from "@components/spellbook/sbSpell";
import sbButton from "@components/spellbook/sbButton";
import sbUnit from "@components/spellbook/sbUnit";
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    sbSide,
    sbTitleBar,
    sbBook,
    sbButton,
    sbSpell,
    sbUnit
  },
  mounted() {
    this.reload();
  },
  watch:{
    charactors: {
      handler: function(val, oldVal) {
        if(val&& val.length && !oldVal.length) {
          this.modifyTheme(val[0].color);
        }
      },
      deep: true
    },
    overlay(val) {
      val && setTimeout(() => {
          this.putLoading(false);
        }, 3000)
    }
  },
  data: () => ({
    spellsCanBePick: [],
    spellsDialogStatus: false,
    drawer: false,
    newStatus: false,
    chosenOne: {
      nickname: "待选择"
    },
    charactor: {
      name: "",
      lvl: "",
      race: "",
      value: "",
      school: "",
      cls: ""
    },
    unitStatus: false
  }),
  computed: {
    ...mapGetters('homepage', ['overlay', 'selectedCharactor', 'charactors']),
  },
  methods: {
    ...mapMutations('homepage', ['putLoading']),
    ...mapActions('homepage', ['retrieveCharactorById', 'retrieveCharactors']),
    resetData: function() {
      this.newStatus = false;
      this.charactor._id = undefined;
      this.reload();
    },
    updateCharactor: function() {
      this.unitStatus = false;
      this.reload();
    },
    chooseCharactor: function(charactor) {
      this.drawer = false;
      if (!charactor) {
        this.newStatus = true;
        return;
      }
      this.modifyTheme(charactor.color);
      this.loadSpells(this.parseCls(charactor.clsName));
      this.retrieveCharactorById(charactor.id);
    },
    modifyTheme(color) {
        this.$vuetify.theme.themes.light.primary = color;
        this.$vuetify.theme.themes.dark.primary = color;
    },
    loadSpells: function(cls) {
      this.spellsCanBePick = [];
      const _self = this;
      this.$axios.get(`http://angrykitty.link:38080/app/mock/16/spells?cls=${cls}`).then(res => {
        _self.spellsCanBePick = res.data.data;
      });
    },
    parseCls(cls) {
      switch(cls){
        case '邪术师':
          return 'warlock';
        case '法师':
          return 'wizard';
        case '牧师':
          return 'cleric';
        case '圣骑士':
          return 'paladin';
        case '游侠':
          return 'ranger';
        case '吟游诗人':
          return 'band';
        case '德鲁伊':
          return 'druid';
        default:
          return 'sorcerer';
      }
    },
    reload: function() {
      this.retrieveCharactors();
    }
  }
};
</script>