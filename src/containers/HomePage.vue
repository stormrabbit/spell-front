<!-- -->
<template lang="pug">
  v-card(class="fill-height",fluid)
    v-card-title 
      v-btn(color="primary" @click="resetSpell" v-if="spells.length") 休息
        v-icon mdi-cached
      v-btn(v-if="!spells.length" color="primary" @click="scribe") {{`准备${parsedSpellType}`}}
        v-icon mdi-script-text-outline
    v-card-text
      v-list(v-if="spells.length")
        v-list-item(v-for="(spell, index) in curSpells", :key="index" v-if="spell.length")
          v-row(dense)
            v-col(cols="12")
              v-card(color="primary")
                v-card-title(class="headline") 
                  span(style="color: white;") {{`${index}环法术\t/\t剩余${getCircle(index)}`}}
                v-card-text 
                  v-row
                    v-col(:cols="thisCol" v-for="(sp, idx) in spell" :key="idx")
                      v-btn(block style="margin-right: 8px;" dark :disabled="getCircle(index) === 0" color="primary" @click="() => castSpell(index)") {{sp.nickname}}
      
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mapGetters, mapActions} from 'vuex';
export default {
  props: {
    // test: Function,
    charactor: Object,
    scribe: Function,
  },
  //import引入的组件需要注入到对象中才能使用
  components: {  },
  data() {
    //这里存放数据
    return {
      cols: 0,
      circle0: 0,
      circle1: 0,
      circle2: 0,
      circle3: 0,
      circle4: 0,
      circle5: 0,
      circle6: 0,
      circle7: 0,
      circle8: 0,
      circle9: 0,
      act:true,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters('homepage', ['spells']),
    thisCol() {
      return this.cols;
    },
    parsedSpellType: function() {
      const dividers = ['吟游诗人', '牧师', '游侠', '德鲁伊', '圣骑士'];
      const spells = ['术士','法师'];
      const cls = this.charactor.cls;
      if(dividers.findIndex( dv => dv ===cls) !== -1) {
        return '神术';
      } else if(spells.findIndex(sl => sl === cls) !== -1) {
        return '法术';
      } else {
        return '邪术';
      }
      
    },
    curSpells: function(){
      return this.spells.reduce( (pre, cur) => {
        const lvl = cur.lvl;
        pre[lvl].push(cur);
        return pre;
      }, [[], [], [] , [] , [], [] , [] , [] , [] , []]);
    },
    usedSpells: function() {
      return this.spells.length;
    },
    parseValue: function() {
      const temp = this.charactor.value? `${parseInt(this.charactor.value) - 10 }`:'0';
      return Math.floor(parseInt(temp.replace('感知', '').replace('魅力', '').replace('智力',''))/2);
    },
    finalCircle0: function() {
      return this.circle0 + this.parseValue;
    },
    finalCircle1: function() {
      return this.circle1 + this.parseValue;
    },
    finalCircle2: function() {
      return this.circle2 + this.parseValue;
    },
    finalCircle3: function() {
      return this.circle3 + this.parseValue;
    },
    finalCircle4: function() {
      return this.circle4 + this.parseValue;
    },
    finalCircle5: function() {
      return this.circle5 + this.parseValue;
    },
    finalCircle6: function() {
      return this.circle6 + this.parseValue;
    },
    finalCircle7: function() {
      return this.circle7 + this.parseValue;
    },
    finalCircle8: function() {
      return this.circle8 + this.parseValue;
    },
    finalCircle9: function() {
      return this.circle9 + this.parseValue;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapActions('homepage', ['retrevePersonalSpells']),
    isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    resetSpell() {
      let index = 0;
      for(; index< 10 ;index++) {
        this[`circle${index}`] = 0;
      }
    },
    getCircle(index) {
      return this[`finalCircle${index}`];
    },
    castSpell: function(index) {
       this[`circle${index}`] = this[`circle${index}`] - 1;
    },
    onClick: function(index) {
      const temps =  this.spells.map( (spl, idx) =>  {
        if(idx === index) {
          spl.status = parseInt( spl.status) ? '0':'1';
        }
        return spl;
      })
      this.spells = [...temps];
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.retrevePersonalSpells({cls: this.charactor.cls});
    if(this.isMobile()) {
      this.cols = 6;
    }else {
      this.cols = 2;
    }
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