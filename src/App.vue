<template lang="pug">
  v-app(id="inspire")
    v-overlay(:value="overlay")
      v-progress-circular(indeterminate size="64")
    v-navigation-drawer(v-model="drawer", app)
      ClassesSideList(:classeslist="cClassesList",:oncallback="chooseClass")
    ClassesTitleBar(:charactor="charactorVal", :onCallBack="() => {drawer = !drawer}", :resetClass="() => {this.updateValue = true}")
    v-dialog(v-if="sheet" v-model="sheet", scrollable, fullscreen, hide-overlay, transition="dialog-bottom-transition")
      SepllsPage(:charactor="charactorVal" :spells="sps", :onBack="() => {sheet = !sheet}")
    v-dialog(v-model="dialog", persistent, v-if="dialog")
      NewUnitForm(:clsList="cClassesList", :doneCallBack="() => this.createCharactor()",:closeCallBack="() => {this.dialog = false}", :title="`新建`")
    v-dialog(v-model="updateValue", persistent, v-if="updateValue")
      NewUnitForm(:clsList="cClassesList", :charactor="charactorVal",:doneCallBack="() => this.updateCharactor()", :closeCallBack="() => {this.updateValue = false}", :title="`修改`")
    v-content
      HomePage(:charactor="charactorVal" :scribe="() => {sheet = !sheet}")
    v-footer(color="primary",dark, app)
      SpellFunctionBotton(:scribe="() => {sheet = !sheet}")    
      span(class="white--text") &copy; stormrabbit
</template>


<script>
import ClassesSideList from "./components/ClassesSideList";
import ClassesTitleBar from "./components/ClassTitleBar";
import HomePage from "./containers/HomePage";
import SepllsPage from "./containers/SpellsPage";
import SpellFunctionBotton from "./components/SpellFunctionBotton";
import NewUnitForm from "./components/NewUnitForm";
import { mapGetters, mapMutations } from 'vuex';
export default {
  props: {
    source: String
  },
  components: {
    ClassesSideList,
    ClassesTitleBar,
    HomePage,
    SpellFunctionBotton,
    SepllsPage,
    NewUnitForm
  },
  mounted: function() {
    this.reload();
  },
  watch:{
    overlay(val) {
      val && setTimeout(() => {
          this.putLoading(false);
        }, 3000)
    }
  },
  data: () => ({
    fab: false,
    spellsCanBePick: [],
    sheet: false,
    drawer: false,
    dialog: false,
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
    classesList: [],
    updateValue: false
  }),
  computed: {
    ...mapGetters('homepage', ['overlay']),
    cClassesList: function() {
      return this.classesList;
    },
    cTitle: function() {
      return this.chosenOne.nickname;
    },
    sps: function() {
      return this.spellsCanBePick;
    },
    charactorVal: function() {
      return this.charactor;
    }
  },
  methods: {
    ...mapMutations('homepage', ['putLoading']),
    createCharactor: function() {
      this.dialog = false;
      this.charactor._id = undefined;
      this.reload();
    },
    updateCharactor: function() {
      this.updateValue = false;
      this.reload();
    },
    chooseClass: function(clsObj) {
      this.drawer = false;
      if (!clsObj) {
        this.dialog = true;
        return;
      }
      this.chosenOne = clsObj;
      this.loadSpells(this.chosenOne.name ? this.chosenOne.name:this.parseCls( this.chosenOne.clsName));
      // Light theme
      this.$vuetify.theme.themes.light.primary = this.chosenOne.color;
      // Dark theme
      this.$vuetify.theme.themes.dark.primary = this.chosenOne.color;
      this.loadCharactors();
    },
    loadCharactors: function() {
      const _self = this;
      this.$axios
        .get(`http://localhost:3000/charactor/${_self.chosenOne.id}`)
        .then(res => {
          _self.charactor = res.data;
        });
    },
    loadSpells: function(cls) {
      this.spellsCanBePick = [];
      const _self = this;
      this.$axios.get(`http://localhost:3000/spells?cls=${cls}`).then(res => {
        _self.spellsCanBePick = res.data;
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
      this.classesList = [];
      const _self = this;
      this.$axios
        .get("http://localhost:3000/charactor/list")
        .then(res => {
          if (res) {
            _self.classesList = res.data;
            const temps =  _self.classesList.filter(cl => cl.id === _self.charactor._id);  
            _self.chooseClass(temps.length ? temps[0]: _self.classesList[0]);
          }
        })
        .catch(() => (_self.classesList = []));
    }
  }
};
</script>