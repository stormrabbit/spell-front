<!--  -->
<template lang="pug">
    v-app-bar(app,color="primary",dark)
      v-app-bar-nav-icon(@click="iconClick") 
      v-toolbar-title {{` ${charactor.name}`}}
      v-spacer
      v-btn(icon)
        v-icon 
      template(v-slot:extension)
        span   
          v-chip(outlined, @click="clipClick") {{`${charactor.lvl} 级`}}
          v-chip(outlined, @click="clipClick")  {{charactor.race}}
          v-chip(outlined, @click="clipClick") {{`${charactor.school}${charactor.cls}`}}
          v-chip(outlined, @click="clipClick") {{`${charactor.value}`}}      
        //- v-btn(icon, style="margin: 8px", @click="resetClass")
        //-   v-icon mdi-cached
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  props: {
    title: String,
    list: Array,
    resetClass: Function,
    charactor: {
      type: Object,
      default: () => ({name: '查内姆', lvl: '', race: '种族', school: '子职', cls: '职业', value: '关键属性'
      })
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      sheet: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    iconClick: function() {
      this.$emit('icon-click');
    },
    clipClick: function() {
      this.$emit('clip-click');
    }
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>