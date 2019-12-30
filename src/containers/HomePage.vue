<!-- -->
<template lang="pug">
    div 
        //- v-tabs(background-color="deep-purple accent-4",center-active,dark, v-for="(item, index) in items",:key="index" )
        //-   v-tab {{item.text}}
        v-container( class="fill-height",fluid)

        v-row(align="center", justify="center")
            v-col(class="text-center")
            v-btn(color="primary") reload
            v-col(class="text-center")
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
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
        },
        {
          text: "四环"
        },
        {
          text: "五环"
        },
        {
          text: "六环"
        },
        {
          text: "七环"
        },
        {
          text: "八环"
        },
        {
          text: "九环"
        }
      ]
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