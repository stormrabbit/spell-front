<!--  -->
<template lang="pug">
    v-card
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
                        v-select(label="职业", :items="toBePickedClasses", v-model="clazz", @change="onChangeCallBack")
                    v-col(cols="12", sm="6", md="4")
                        v-text-field(label="等级", required, v-model="lvl", :rules="lvlrules")
                    v-col(cols="12", sm="6", md="4", type="number")
                        v-select(label="子职", required, v-model="school", :items="toBePickedSub")
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
export default {
  props: {
    closeCallBack: Function,
    title: String,
    charactor: Object,
    clsList: {
      type: Array,
      default: ()=>[]
    }
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
      school: this.charactor ? this.charactor.school : "",
      clazz: this.charactor ? this.charactor.cls : "",
      keyword: "",
      race: this.charactor ? this.charactor.race : "",
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
    thisToBePickedSub: function() {
      return this.toBePickedSub;
    },
    toBePickedClasses: function() {
      return this.clsList && this.clsList.length
        ? this.clsList.map(cls => cls.nickname)
        : [];
    },
    thisKeyword: function() {
      return this.keyword;
    }
    
  },
  //监控data中的数据变化
  watch: {
    clsList: {
       handler: function(newVal, oldVal) {
         if(oldVal && oldVal.length) {
           return ;
         }
         if(this.clazz) {
           const selectedClz = newVal.find(val => val.nickname === this.clazz);
           if(selectedClz) {
             this.toBePickedSub = selectedClz.sub;
           }
         }
      },
      deep: true,
      immediate: true
    }
  },
  //方法集合
  methods: {
    onChangeCallBack: function(val) {
      const filterClass = this.clsList.find(itm => itm.nickname === val) || {};
      this.toBePickedSub = filterClass.sub || [];
      if(this.toBePickedSub.length) {
        this.school = this.toBePickedSub[0];
        this.keyword = filterClass.keyword;
      }
   
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
      if (this.id) {
        this.$emit('delete', this.id);
      }
      this.$emit('close');
    },
    save: function() {
      this.$emit('save', {
          _id: this.id,
          name: this.name,
          cls: this.clazz,
          value: `${this.value} ${this.thisKeyword}`,
          school: this.school,
          race: this.race,
          lvl: this.lvl
        });
    },
    
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>