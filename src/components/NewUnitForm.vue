<!--  -->
<template lang="pug">
    v-card
        v-snackbar(v-model="snackbar", :timeout="timeout") {{ logTips }}
        v-card-title
            span(class="headline") {{title}}
        v-card-text
            v-container
                v-row
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="姓名", required, v-model="cls.name")
                    v-col(cols="12", sm="6", md="4", v-model="cls.name")
                        v-select(label="种族", :items="['人类', '精灵', '矮人', '半精灵', '提夫林', '半兽人']", v-model="cls.race")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="职业", :items="clses", v-model="cls.cls")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required, v-model="cls.lvl")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="学派", required, v-model="cls.school")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="主属性", required, v-model="cls.value")
        v-card-actions
            v-spacer
            v-btn(color="primary", text, @click="closeCallBack") Close
            v-btn(color="primary", text, @click="update") Save
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from "qs";
export default {
  props: {
    clsList: Array,
    closeCallBack: Function,
    title: String,
    charactor: Object
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      dialog: true,
      cls: this.charactor ? this.charactor : {},
      logTips: "",
      timeout: 2000,
      snackbar: false
    };
  },
  //监听属性 类似于data概念
  computed: {
    clses: function() {
      return this.clsList && this.clsList.length
        ? this.clsList.map(cls => cls.nickname)
        : [];
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    update: function() {
      const _self = this;
      if (_self.closeCallBack) {
        _self.closeCallBack();
      }
      if (_self.cls && _self.cls._id) {
        _self.updateCharactor();
      } else {
        _self.createCharactor();
      }
    },
    updateCharactor: function() {
      const _self = this;
      this.$axios
        .put(
          `http://localhost:3000/charactor/update/${_self.cls._id}`,
          qs.stringify(_self.cls)
        )
        .then(res => {
          _self.snackbar = true;
          this.logTips = res;
        });
    },
    createCharactor: function() {
      const _self = this;
      this.$axios
        .post(`http://localhost:3000/charactor/create`, qs.stringify(_self.cls))
        .then(res => {
          _self.snackbar = true;
          _self.cls = {};
          this.logTips = res;
        });
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