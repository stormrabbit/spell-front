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
                        v-text-field(label="姓名", required, v-model="thisName")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="种族", :items="['人类', '精灵', '矮人', '半精灵', '提夫林', '半兽人']", v-model="thisRace")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="职业", :items="clses", v-model="thisClazz", @change="onChangeCallBack")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required, v-model="thisLvl")
                    v-col(cols="12", sm="6", md="4", type="number")
                         v-select(label="子职", required, v-model="thisSchool", :items="thisToBePickedSub")
                    v-col(cols="12", sm="6", md="4", type="number")
                        v-text-field(:label="thisKeyword", required, v-model="thisVal")
        v-card-actions
            v-spacer
            v-btn(v-if="title === `修改`",color="primary", text, @click="removeCharactor") 删除角色
            v-btn(color="primary", text, @click="cancelFunction") 关闭
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
      snackbar: false,
      name: this.charactor ? this.charactor.name : "",
      toBePickedSub: [],
      school: '',
      clazz: this.charactor ? this.charactor.cls : '法师',
      keyword: '',
      race: this.charactor ? this.charactor.race : '人类',
      lvl: this.charactor? this.charactor.lvl: 1,
      value: this.charactor ? this.charactor.value: 10,
    };
  },
  //监听属性 类似于data概念
  computed: {
    thisLvl: function() {
      return this.lvl;
    },
    thisName: function() {
      return this.name;
    },
    thisToBePickedSub: function() {
      return this.toBePickedSub;
    },
    thisSchool: function() {
      const temp = this.school;
      return temp;
    },
    thisKeyword: function() {
      return this.keyword;
    },
    thisRace: function() {
      return this.race;
    },
    thisClazz: function() {
      return this.clazz;
    },
    thisVal :function() {
      return this.value;
    },
    clses: function() {
      return this.clsList && this.clsList.length
        ? this.clsList.map(cls => cls.nickname)
        : [];
    },
    clsesSub: function() {
      const _self = this;
      const temp = _self.clsList.filter(
        itm => itm.nickname === _self.mycharactor.cls
      );
      return !!temp && temp.length ? temp[0].sub : [];
    },
    mycharactor: function() {
      return this.charactor ? Object.assign({}, this.charactor) : {};
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onChangeCallBack: function(val) {
      const filterClass = this.clsList.filter(
        itm => itm.nickname === val
      )[0];
      this.toBePickedSub = filterClass.sub;
      this.school = this.toBePickedSub[0];
      this.keyword = filterClass.keyword;
    },
    cancelFunction: function() {
      if (this.closeCallBack) {
        this.closeCallBack();
      }
    },
    removeCharactor: function() {
      const _self = this;
      if (_self.mycharactor && _self.mycharactor._id) {
        this.$axios
          .delete(`http://localhost:3000/charactor/${_self.mycharactor._id}`)
          .then(res => {
            const { ok = 1, deletedCount = 0 } = res.data;
            if (ok === 1 && deletedCount !== 0) {
              `输出成功`;
              if (_self.doneCallBack) {
                _self.doneCallBack();
              }
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

        const temp = this.clsList.filter(itm =>
          itm.nickname === this.clazz 
        )[0];
        this.toBePickedSub = temp.sub;
        this.school = temp.sub[0];
        this.keyword = temp.keyword;
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