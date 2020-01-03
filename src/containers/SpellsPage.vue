<!--  -->
<template lang="pug">
    div 
      v-toolbar(dense)
        v-btn(icon, @click="onBack")
          v-icon mdi-cancel
        v-toolbar-title 可选法术列表
        v-spacer
        v-btn(icon)
          v-icon mdi-magnify
      v-list(two-line,subheader)
        v-list-item(v-for="spell in spells", :key="spell._id", link)
          v-list-item-avatar
            v-avatar(color="primary", size="48")
              span(class="white--text headline") {{spell.school.substring(0,1)}}
          v-list-item-content
            v-list-item-title {{ spell.nickname +'\t'}}
              //- span(style="font-size: 12px") {{`${spell.school}\t${spell.time}\t${spell.range}`}}
            v-list-item-subtitle {{`${spell.school}\t${spell.time}\t${spell.range}`}}
          v-list-item-action
            v-btn(icon)
              v-icon(color="grey lighten-1") mdi-script-text
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

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
      isActive: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    
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