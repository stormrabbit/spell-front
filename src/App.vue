<template lang="pug">
  v-app(id="inspire")
    v-navigation-drawer(v-model="drawer", app)
      ClassesSideList(:classeslist="cClassesList",:oncallback="chooseClass")
    ClassesTitleBar(:charactor="charactorVal", :onCallBack="() => {drawer = !drawer}", :resetClass="() => {this.updateValue = true}")
    v-dialog(v-model="sheet", scrollable, fullscreen, hide-overlay, transition="dialog-bottom-transition")
      SepllsPage(:spells="sps", :onBack="() => {sheet = !sheet}")
    v-dialog(v-model="dialog", persistent, v-if="dialog")
      NewUnitForm(:clsList="cClassesList", :doneCallBack="() => this.createCharactor()",:closeCallBack="() => {this.dialog = false}", :title="`新建`")
    v-dialog(v-model="updateValue", persistent, v-if="updateValue")
      NewUnitForm(:clsList="cClassesList", :charactor="charactorVal",:doneCallBack="() => this.updateCharactor()", :closeCallBack="() => {this.updateValue = false}", :title="`修改`")
    v-content
      HomePage(:charactor="charactorVal")
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
      this.loadSpells(this.chosenOne.name);
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