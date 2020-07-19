<template lang="pug">
  v-app(id="inspire")
    v-overlay(:value="overlay")
      v-progress-circular(indeterminate size="64")
    v-navigation-drawer(v-model="drawer" app)
      sb-side(:charactors="charactors",@change="chooseCharactor")
    sb-title-bar(:charactor="selectedCharactor" @icon-click="drawer = !drawer" @clip-click="updateDialogVisible = true")
    v-dialog(v-if="spellDialogVisible" v-model="spellDialogVisible",transition="dialog-bottom-transition")
      sb-spell(:charactor="selectedCharactor" :spells="spells" @close="spellDialogVisible = false")
    v-dialog(v-model="createDialogVisible" persistent v-if="createDialogVisible")
      sb-unit(
        @save="resetData",
        @close="createDialogVisible = false"
        :title="`新建`" 
        :clsList="clsList")
    v-dialog(v-model="updateDialogVisible" persistent v-if="updateDialogVisible")
      sb-unit(
        @save="resetData" 
        @close="updateDialogVisible = false" 
        @delete="deleteCharactor"
        :charactor="selectedCharactor" 
        :title="`修改`" 
        :clsList="clsList")
    v-content
      sb-book(
        :charactor="selectedCharactor" 
        :spells="spells" 
        @scribe="spellDialogVisible = true"
      )
    v-footer(color="primary",dark app)
      sb-button(@scribe="spellDialogVisible = true")    
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
    this.retrieveClasses();
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
    spellDialogVisible: false,
    drawer: false,
    createDialogVisible: false,
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
    updateDialogVisible: false
  }),
  computed: {
    ...mapGetters('homepage', ['overlay', 'selectedCharactor', 'charactors', 'spells', 'clsList']),
  },
  methods: {
    ...mapMutations('homepage', ['putLoading']),
    ...mapActions('homepage', ['retrieveClasses', 'retrieveCharactorById', 'retrieveCharactors', 'createCharactor', 'updateCharactor', 'deleteCharactor']),
    resetData: function(charactor) {
      if(charactor._id) {
        this.updateCharactor(charactor);
      } else{
        this.createCharactor(charactor);
      }
      this.updateDialogVisible = false;
      this.createDialogVisible = false;
      this.charactor._id = undefined;
      this.reload();
    },
    chooseCharactor: function(charactor) {
      this.drawer = false;
      if (!charactor) {
        this.createDialogVisible = true;
        return;
      }
      this.modifyTheme(charactor.color);
      this.retrieveCharactorById(charactor.id);
    },
    modifyTheme(color) {
        this.$vuetify.theme.themes.light.primary = color;
        this.$vuetify.theme.themes.dark.primary = color;
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