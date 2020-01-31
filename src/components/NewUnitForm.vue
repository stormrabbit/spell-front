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
                        v-text-field(label="姓名", required, v-model="mycharactor.name")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="种族", :items="['人类', '精灵', '矮人', '半精灵', '提夫林', '半兽人']", v-model="mycharactor.race")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="职业", :items="clses", v-model="mycharactor.cls")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required, v-model="mycharactor.lvl")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="学派", required, v-model="mycharactor.school")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="主属性", required, v-model="mycharactor.value")
        v-card-actions
            v-spacer
            v-btn(v-if="title === `修改`",color="primary", text, @click="removeCharactor") 删除角色
            v-btn(color="primary", text, @click="closeCallBack") 关闭
            v-btn(color="primary", text, @click="update") 保存
            
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from "qs";
export default {
  props: {
    closeCallBack: Function,
    doneCallBack: Function,
    title: String,
    charactor: Object
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      clsList: [],
      dialog: true,
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
    },
    mycharactor: function() {
      return this.charactor ? this.charactor : {};
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    removeCharactor: function() {
      const _self = this;
      if (_self.doneCallBack) {
        _self.doneCallBack();
      }
      if (_self.mycharactor && _self.mycharactor._id) {
        this.$axios
          .delete(`http://localhost:3000/charactor/${_self.mycharactor._id}`)
          .then(res => {
            const { ok = 1, deletedCount = 0 } = res.data;
            if (ok === 1 && deletedCount !== 0) {
              `输出成功`;
            }
          });
      }
    },
    update: function() {
      const _self = this;
      if (_self.doneCallBack) {
        _self.doneCallBack();
      }
      if (_self.mycharactor && _self.mycharactor._id) {
        _self.updateCharactor();
      } else {
        _self.createCharactor();
      }
    },
    updateCharactor: function() {
      const _self = this;
      this.$axios
        .put(
          `http://localhost:3000/charactor/update/${_self.mycharactor._id}`,
          qs.stringify(_self.mycharactor)
        )
        .then(res => {
          _self.snackbar = true;
          this.logTips = res;
        });
    },
    createCharactor: function() {
      const _self = this;
      this.$axios
        .post(
          `http://localhost:3000/charactor/create`,
          qs.stringify(_self.mycharactor)
        )
        .then(res => {
          _self.snackbar = true;
          _self.mycharactor = {};
          this.logTips = res;
        });
    },
    loadClasses: function() {
      this.$axios.get(`http://localhost:3000/classes`).then(res => {
        this.clsList = res.data;
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.loadClasses();
  },
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