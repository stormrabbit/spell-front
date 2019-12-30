<template lang="pug">
  v-app(id="inspire")
    v-navigation-drawer(v-model="drawer", app)
      ClassesSideList(:classeslist="cClassesList",:oncallback="chooseClass")
    ClassesTitleBar(:title="cTitle", :list="sps",:onCallBack="() => {drawer = !drawer}")
    v-content
      HomePage
    v-footer(color="indigo", app)    
      span(class="white--text") &copy; stormrabbit
</template>


<script>
import ClassesSideList from "./components/ClassesSideList";
import ClassesTitleBar from "./components/ClassTitleBar";
import HomePage from "./containers/HomePage";
export default {
  props: {
    source: String
  },
  components: {
    ClassesSideList,
    ClassesTitleBar,
    HomePage
  },
  mounted: function() {
    this.reload();
    this.loadSpells();
  },
  data: () => ({
    spellsCanBePick: [],
    sheet: false,
    drawer: false,
    chosenOne: {
      nickname: "待选择"
    },
    classesList: [],
    items: [
      {
        text: "全部"
      },
      {
        text: "一环"
      },
      {
        text: "二环"
      },
      {
        text: "三环"
      }
    ]
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
    },
    loadSpells: function() {
      this.spellsCanBePick = [];
      const _self = this;
      this.$axios.get("http://localhost:3000/spells?cls=wizard").then(res => {
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
            _self.chosenOne = _self.classesList[0];
          }
        })
        .catch(() => (_self.classesList = []));
    }
  }
};
</script>