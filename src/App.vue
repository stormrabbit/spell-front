<template lang="pug">
  v-app(id="inspire")
    v-navigation-drawer(v-model="drawer", app)
      v-list(dense)
        v-list-item(link, v-for="cs in cClassesList", :key="cs._id", @click="chooseClass(cs)")
          v-list-item-action
            v-icon 
          v-list-item-content
            v-list-item-title {{cs.nickname}}
    v-app-bar(app,color="indigo",dark)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer") 
      v-toolbar-title {{cTitle}}
      template(v-slot:extension)
        v-btn(fab,color="primary",bottom,right,absolute, dark)
          v-icon mdi-plus 
    v-content
      div
          v-breadcrumbs(:items="items",divider="-")
      v-container( class="fill-height",fluid)

        v-row(align="center", justify="center")
          v-col(class="text-center")
            v-btn(color="primary", @click="reload") reload
          v-col(class="text-center")
    v-footer(color="indigo", app)    
      span(class="white--text") &copy; stormrabbit
  
</template>

<script>
export default {
  props: {
    source: String
  },
  mounted: function() {
    this.reload();
  },
  data: () => ({
    drawer: false,
    chosenOne: {
      nickname: "待选择"
    },
    classesList: [],
    items: [{
      text: '全部'
    }, {
      text: '一环'
    },{
      text: '二环'
    },{
      text: '三环'
    }]
  }),
  computed: {
    cClassesList: function() {
      return this.classesList;
    },
    cTitle: function() {
      return this.chosenOne.nickname;
    }
  },
  methods: {
    chooseClass: function(clsObj) {
      this.chosenOne = clsObj;
      this.drawer = false;
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