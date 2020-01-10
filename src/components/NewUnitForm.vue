<!--  -->
<template lang="pug">
    v-card
        v-card-title
            span(class="headline") 新建人物
        v-card-text
            v-container
                v-row
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="姓名", required)
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="种族", :items="['人类', '精灵', '矮人', '半精灵', '提夫林', '半兽人']")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="职业", required)
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required)
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="学派", required)
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="主属性", required)
        v-card-actions
            v-spacer
            v-btn(color="primary", text, @click="dialog = false") Close
            v-btn(color="primary", text, @click="dialog = false") Save
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
      dialog: true
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