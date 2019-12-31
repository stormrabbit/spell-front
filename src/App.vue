<template lang="pug">
  v-app(id="inspire")

    v-navigation-drawer(v-model="drawer", app)
      ClassesSideList(:classeslist="cClassesList",:oncallback="chooseClass")
    ClassesTitleBar(:title="cTitle", :list="sps",:onCallBack="() => {drawer = !drawer}")
    v-content
      HomePage
      FabButton
    v-footer(color="primary",dark, app)    
      span(class="white--text") &copy; stormrabbit
      //- FabButton
</template>


<script>
import ClassesSideList from "./components/ClassesSideList";
import ClassesTitleBar from "./components/ClassTitleBar";
import HomePage from "./containers/HomePage";
import FabButton from "./components/FabButton";
export default {
  props: {
    source: String
  },
  components: {
    ClassesSideList,
    ClassesTitleBar,
    HomePage,
    FabButton
  },
  mounted: function() {
    this.reload();
  },
  data: () => ({
    fab: false,
    spellsCanBePick: [],
    sheet: false,
    drawer: false,
    chosenOne: {
      nickname: "待选择"
    },
    classesList: []
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
    }
  },
  methods: {
    chooseClass: function(clsObj) {
      this.chosenOne = clsObj;
      this.drawer = false;
      this.loadSpells(this.chosenOne.name);
      // Light theme
      this.$vuetify.theme.themes.light.primary = this.chosenOne.color;

      // Dark theme
      this.$vuetify.theme.themes.dark.primary = this.chosenOne.color;
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
        .get("http://localhost:3000/classes")
        .then(res => {
          if (res) {
            _self.classesList = res.data;
            _self.chooseClass(
              _self.classesList.filter(cl => cl.name === "wizard")[0]
            );
          }
        })
        .catch(() => (_self.classesList = []));
    }
  }
};
</script>