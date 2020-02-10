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
                        v-text-field(label="姓名", v-model="name")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="种族", :items="['人类', '精灵', '矮人', '半精灵', '提夫林', '半兽人']", v-model="race")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="职业", :items="clses", v-model="clazz", @change="onChangeCallBack")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required, v-model="lvl")
                    v-col(cols="12", sm="6", md="4", type="number")
                         v-select(label="子职", required, v-model="school", :items="thisToBePickedSub")
                    v-col(cols="12", sm="6", md="4", type="number")
                        v-text-field(:label="thisKeyword", required, v-model="value")
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
      logTips: '',
      timeout: 2000,
      snackbar: false,
      id: this.charactor ? this.charactor._id: '',
      name: this.charactor ? this.charactor.name : '',
      toBePickedSub: [],
      school: this.charactor ? this.charactor.sub : '',
      clazz: this.charactor ? this.charactor.cls : '法师',
      keyword: '',
      race: this.charactor ? this.charactor.race : '人类',
      lvl: this.charactor ? this.charactor.lvl : 1,
      value: this.charactor
        ? parseInt(
            this.charactor.value
              .replace('智力', '')
              .replace('魅力', '')
              .replace('感知', '')
          )
        : 10
    };
  },
  //监听属性 类似于data概念
  computed: {
    thisToBePickedSub: function() {
      return this.toBePickedSub;
    },
    thisKeyword: function() {
      return this.keyword;
    },
    clses: function() {
      return this.clsList && this.clsList.length
        ? this.clsList.map(cls => cls.nickname)
        : [];
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
      const filterClass = this.clsList.filter(itm => itm.nickname === val)[0];
      this.toBePickedSub = filterClass.sub;
      this.school = this.toBePickedSub[0];
      this.keyword = filterClass.keyword;
    },
    cancelFunction: function() {
      if (this.closeCallBack) {
        this.closeCallBack();
      }
      this.reset();
    },
    reset: function() {
      this.id = this.charactor ? this.charactor._id: '',
      this.name =  this.charactor ? this.charactor.name : '',   
      this.school = this.charactor ? this.charactor.school : '',
      this.clazz = this.charactor ? this.charactor.cls : '法师',
      this.race = this.charactor ? this.charactor.race : '人类',
      this.lvl = this.charactor ? this.charactor.lvl : 1,
      this.value = this.charactor
        ? parseInt(
            this.charactor.value
              .replace('智力', '')
              .replace('魅力', '')
              .replace('感知', '')
          )
        : 10
    },
    removeCharactor: function() {
      const _self = this;
      if (this.id) {
        this.$axios
          .delete(`http://localhost:3000/charactor/${this.id}`)
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
      // const _self = this;
      if (this.doneCallBack) {
        this.doneCallBack();
      }
      if (this.id) {
        this.updateCharactor({
          _id: this.id,
          name: this.name,
          cls: this.clazz,
          value: `${this.value} ${this.thisKeyword}`,
          school: this.school,
          race: this.race,
          lvl: this.lvl
        });
      } else {
        this.createCharactor({
          name: this.name,
          cls: this.clazz,
          value: this.value,
          school: this.school,
          race: this.race,
          lvl: this.lvl
        });
      }
    },
    updateCharactor: function(charactor) {
      const _self = this;
      this.$axios
        .put(
          `http://localhost:3000/charactor/update/${charactor._id}`,
          qs.stringify(charactor)
        )
        .then(res => {
          _self.snackbar = true;
          this.logTips = res;
        });
    },
    createCharactor: function(charactor) {
      const _self = this;
      this.$axios
        .post(`http://localhost:3000/charactor/create`, qs.stringify(charactor))
        .then(res => {
          _self.snackbar = true;
          _self.mycharactor = {};
          this.logTips = res;
        });
    },
    loadClasses: function() {
      this.$axios.get(`http://localhost:3000/classes`).then(res => {
        this.clsList = res.data;

        const temp = this.clsList.filter(itm => itm.nickname === this.clazz)[0];
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