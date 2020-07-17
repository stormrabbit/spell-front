<!--  -->
<template lang="pug">
    v-card
        span {{charactor}}
        v-snackbar(v-model="snackbar" :timeout="timeout") {{ logTips }}
          span test
        v-card-title
            span(class="headline") {{title}}
        v-card-text
            v-container
                v-form(ref="form", v-model="valid")
                  v-row
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="姓名", v-model="name", :rules="namerules")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="种族", :items="['人类', '精灵', '矮人', '半精灵', '提夫林', '半兽人']", v-model="race")
                    v-col(cols="12", sm="6", md="4")
                        v-select(label="职业", :items="clses", v-model="clazz", @change="onChangeCallBack")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required, v-model="lvl", :rules="lvlrules")
                    v-col(cols="12", sm="6", md="4", type="number")
                        v-select(label="子职", required, v-model="school", :items="thisToBePickedSub")
                    v-col(cols="12", sm="6", md="4", type="number")
                        v-text-field(:label="thisKeyword", required, v-model="value", :rules="rules")
        v-card-actions
            v-spacer
            v-btn(v-if="title === `修改`",color="primary", text, @click="removeCharactor") 删除角色
            v-btn(color="primary", text, @click="close") 关闭
            v-btn(color="primary", text, @click="save", :disabled="!valid") 保存
            
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from "qs";
import { mapActions, mapGetters } from 'vuex';
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
      valid:true,
      namerules: [
         value => !!value || '请输入名字',
      ],
      rules: [
        value => !!value || '请输入主属性',
        value => {
          const pattern = /^[0-9]*$/
          return pattern.test(value) || '请输入数字'
        },
      ],
      lvlrules: [
        value => !!value || '请输入等级',
        value => {
          const pattern = /^[0-9]*$/
          return pattern.test(value) || '请输入数字'
        },
      ],
      logTips: "",
      timeout: 2000,
      snackbar: false,
      id: this.charactor ? this.charactor._id : "",
      name: this.charactor ? this.charactor.name : "",
      toBePickedSub: [],
      school: this.charactor ? this.charactor.sub : "",
      clazz: this.charactor ? this.charactor.cls : "法师",
      keyword: "",
      race: this.charactor ? this.charactor.race : "人类",
      lvl: this.charactor ? this.charactor.lvl : 1,
      value: this.charactor
        ? parseInt(
            this.charactor.value
              .replace("智力", "")
              .replace("魅力", "")
              .replace("感知", "")
          )
        : 10
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters('homepage', ['clsList']),
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
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapActions('homepage',['retrieveClasses']),
    onChangeCallBack: function(val) {
      const filterClass = this.clsList.filter(itm => itm.nickname === val)[0];
      this.toBePickedSub = filterClass.sub;
      this.school = this.toBePickedSub[0];
      this.keyword = filterClass.keyword;
    },
    close: function() {
      this.reset();
      this.$emit('close');
    },
    reset: function() {
        (this.id = this.charactor ? this.charactor._id : ""),
        (this.name = this.charactor ? this.charactor.name : ""),
        (this.school = this.charactor ? this.charactor.school : ""),
        (this.clazz = this.charactor ? this.charactor.cls : "法师"),
        (this.race = this.charactor ? this.charactor.race : "人类"),
        (this.lvl = this.charactor ? this.charactor.lvl : 1),
        (this.value = this.charactor
          ? parseInt(
              this.charactor.value
                .replace("智力", "")
                .replace("魅力", "")
                .replace("感知", "")
            )
          : 10);
    },
    removeCharactor: function() {
      const _self = this;
      if (this.id) {
        this.$axios
          .delete(`http://angrykitty.link:38080/app/mock/16/charactor/${this.id}`)
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
    save: function() {
      if (this.id) {
        this.saveCharactor({
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
          value: `${this.value} ${this.thisKeyword}`,
          school: this.school,
          race: this.race,
          lvl: this.lvl
        });
      }
      this.$emit('save');
    },
    saveCharactor: function(charactor) {
      const _self = this;
      this.$axios
        .put(
          `http://angrykitty.link:38080/app/mock/16/charactor/save/${charactor._id}`,
          qs.stringify(charactor)
        )
        .then(res => {
          _self.snackbar = true;
          _self.logTips = res;
          this.reset();
          if (_self.doneCallBack) {
            _self.doneCallBack();
          }
        });
    },
    createCharactor: function(charactor) {
      const _self = this;
      this.$axios
        .post(`http://angrykitty.link:38080/app/mock/16/charactor/create`, qs.stringify(charactor))
        .then(res => {
          this.reset();
          _self.snackbar = true;
          _self.charactor  = {};
          _self.logTips = res;
          if (_self.doneCallBack) {
            _self.doneCallBack();
          }
        });
    },
    loadClasses: function() {
      this.retrieveClasses();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.loadClasses();
    this.reset();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforesave() {}, //生命周期 - 更新之前
  saved() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>