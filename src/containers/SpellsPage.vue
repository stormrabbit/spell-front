<!--  -->
<template lang="pug">
    div 
      v-snackbar(v-model="snackbar", :timeout="timeout") {{ logTips }}
      v-toolbar(dense)
        v-text-field(hide-details,single-line, v-model="keyword", :loading="isLoading", :label="`请输入法术名或法术环数`", persistent-hint)
        v-btn(icon, @click="onBack")
          v-icon mdi-cancel
      v-list(two-line,subheader)
        v-list-item(v-for="(spell, index) in computedSpells", :key="index", link)
          v-list-item-avatar
            v-avatar(color="primary", size="48")
              span(class="white--text headline") {{spell.lvl}}
          v-list-item-content
            v-list-item-title {{ spell.nickname +'\t'}}
            v-list-item-subtitle {{`${spell.school}\t${spell.time}\t${spell.range}`}}
          v-list-item-action
            v-btn(icon)
              v-icon(color="grey lighten-1", @click="pickSpell(spell)") mdi-script-text
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// const blues = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0'];
export default {
  props: {
    spells: Array,
    onBack: Function
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      isActive: true,
      keyword: "",
      isLoading: false,
      search: null,
      snackbar: false,
      text: "测试啦",
      timeout: 2000,
      tips: '',
    };
  },
  //监听属性 类似于data概念
  computed: {
    logTips: function() {
      return this.tips;
    },
    computedSpells: function() {
      const _self = this;
      if (this.keyword) {
        if (isNaN(parseInt(this.keyword))) {
          const top = _self.spells.filter(
            sp => sp.nickname.indexOf(_self.keyword) !== -1
          );
          const bottom = _self.spells.filter(
            sp => sp.nickname.indexOf(_self.keyword) === -1
          );
          return [...top, ...bottom];
        } else {
          if (parseInt(this.keyword) > 9) {
            return this.spells;
          }
          return _self.spells.filter( sp => (parseInt(sp.lvl) === parseInt(_self.keyword)) );
        }
      }
      return this.spells;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    enableSearch: function() {
      this.snackbar = true;
    },
    pickSpell: function(spell) {
      this.snackbar = true;
      this.tips = `已准备 ${spell.lvl} 环法术 ${ spell.nickname}`;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>