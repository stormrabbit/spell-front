<!--  -->
<template lang="pug">
    v-app-bar(app,color="primary",dark)
      v-app-bar-nav-icon(@click="onCallBack") 
      v-toolbar-title {{title}}
      template(v-slot:extension)
        v-dialog(v-model="sheet", scrollable, fullscreen, hide-overlay, transition="dialog-bottom-transition")
          template(v-slot:activator="{ on }")
            v-btn(fab,color="primary",bottom,right,absolute, dark, v-on="on")
              v-icon mdi-plus 
          v-sheet(class="text-center")
            //- v-btn(class="mt-6", text,color="red", @click="sheet = !sheet") close
            SpellsCanBePick(:list = "list", :onBack="() => {sheet = !sheet}")
            //- div The basic usage of v-bottom-sheet. Almost any content can be placed inside this component
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import SpellsCanBePick from "./SpellsCanBePick";
export default {
  props: {
    title: String,
    list: Array,
    onCallBack: Function
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
    SpellsCanBePick
  },
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
  methods: {},
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