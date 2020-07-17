<!--  -->
<template lang="pug">
    v-list(dense)
        v-list-item(link, @click="onSelect()")
          v-list-item-action
            v-icon mdi-plus
          v-list-item-content
            v-list-item-title 新建
        v-list-item(link, v-for="(tp, index) in charactors", :key="index", @click="onSelect(tp)")
            v-list-item-action
                v-icon(:color="tp.color") mdi-account
            v-list-item-content
                v-list-item-title {{tp.nickname}}
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    charactors: {
      type: Array,
      default: () => [],
    },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onSelect: function(cls) {
      this.$emit('change', cls);
    }
  },
};
</script>