<!--  -->
<template lang="pug">
    v-speed-dial(direction="top", v-model="fab",transition="slide-y-reverse-transition", absolute,bottom,right,)
      template(v-slot:activator)
        v-btn(v-model="fab",color="primary",dark,fab)
          v-icon(v-if="fab") mdi-emoticon-cool-outline
          v-icon(v-else) mdi-emoticon-outline
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(fab,dark,small,color="primary", @click="$emit('scribe')", v-on="on")
            v-icon mdi-script-text-outline
        span 准备法术
      v-tooltip(bottom)
        template(v-slot:activator="{on}")
          v-btn(fab,dark,small,color="primary",v-on="on")
            v-icon mdi-file-document-edit-outline
        span 挑选法术
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    scribe: Function
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      fab: false
    };
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>