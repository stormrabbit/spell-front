<!--  -->
<template lang="pug">
v-card(color="grey lighten-3" class="mb-12")
    v-card-title 27 购点法剩余点数：{{points}}
    v-card-text
        v-row(align="baseline")
            v-col(cols="6" v-for="(key, index) in Object.keys(attributes)" :key="index")
                div(style="display: flex;align-items: center;")
                    span {{`${keyAttrEn2Cn(key)}基础值：`}}
                    span {{attributes[key]< 10 ? `0${attributes[key]}` : attributes[key]}}
                    span +
                    span {{`种族加值：`}}
                    span {{computedRaceBonus(key)}}
                    span {{`=`}}
                    span {{computedSumByAttribute(key)}}
                    v-spacer
                    v-btn(class="ma-2" text icon color="blue lighten-2" @click="modifyValue(key)")
                        v-icon mdi-thumb-up
                    span /
                    v-btn(class="ma-2" text icon color="red lighten-2" @click="modifyValue(key, false)")
                        v-icon(dark) mdi-thumb-down
                    v-spacer
                    span 调整值：
                    v-icon(:color="parseValue2Bonus(key) < 0 ? 'red':'green'" :style="(parseValue2Bonus(key) === 0)?{visibility: 'hidden'} :{}") {{parseValue2Bonus(key) < 0 ? 'mdi-minus':'mdi-plus'}}
                    v-chip(class="ma-2"  style="width: 32px;height: 32px;" :color="parseColor(parseValue2Bonus(key))" text-color="white") {{Math.abs (parseValue2Bonus(key))}}
                    v-spacer
        div(class="title" style="width: 100%;text-align: left;") 可自由支配点数：{{freePoints}}
        v-row
            v-col(cols="2" v-for="(key, index) in Object.keys(attributes)" :key="index")
                v-checkbox(:disabled="disabledExtra && !extra[key]" :label="`${keyAttrEn2Cn(key)} + 1`" v-model="extra[key]")
        v-row
            v-col(cols="2" v-for="(key, index) in Object.keys(attributes)" :key="index")
                v-checkbox(  disabled :label="`${keyAttrEn2Cn(key)} + 2`" v-model="extraTwo[key]")
    v-card-actions
        v-btn(text @click="$emit('confirm')" ) 确认
        v-btn(text @click="$emit('cancel')") 返回
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {attributes, keyAttrEn2Cn, parseValue2Bonus, parseColor} from './../../data/attributes';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        // freePoints: {
        //     type: Number,
        //     default: 0
        // },
        extraPoints: {
            type: Object,
            default: () => ({})
        }
    },
    data:() => ({
        points: 27,
        attributes,
        extra: {
      
        },
        extraTwo: {

        }
    }),
    //监听属性 类似于data概念
    computed: {
        disabledExtra() {
            return !this.freePoints;
        },
        freePoints() {
            const {
                free = 0 
            } = this.extraPoints;
            const cost = Object.keys( this.extra).reduce((pre, cur) => (pre +(  this.extra[cur]? 1:0)), 0);
            return free - cost;
        }
    },
    //监控data中的数据变化
    watch: {
        extraPoints:{
        handler(newVal){
            const extra = {...this.extra};
            const highExtra = (point = 1) => Object.keys({...extra, ...newVal}).reduce( (pre, cur) => {
                if (newVal[cur] === point){
                    pre[cur] =  newVal[cur];
                }
                return pre;
            }, {});
            this.extra = highExtra(1);
            this.extraTwo = highExtra(2);
        },
        deep: true,
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    //created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    //mounted() {},
    //beforeCreate() {}, //生命周期 - 创建之前
    //beforeMount() {}, //生命周期 - 挂载之前
    //beforeUpdate() {}, //生命周期 - 更新之前
    //updated() {}, //生命周期 - 更新之后
    //beforeDestroy() {}, //生命周期 - 销毁之前
    //destroyed() {}, //生命周期 - 销毁完成
    //activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    //方法集合
    methods: {
        keyAttrEn2Cn(key) {
            return keyAttrEn2Cn(key);
        },
        modifyValue(attr, plus = true) {
        const temp = this.attributes[attr];

        if( temp === 8 && !plus) {
          return;
        } 
        if(temp === 15 && plus) {
          return;
        }
        const cost = plus ? (temp <13 ? -1:-2) : (temp > 13 ? 2:1);
        if((this.points + cost < 0) || (this.points + cost >27)) {
          return;
        }
        this.points = this.points + cost;
        if((!plus && this.points === 0) || (plus && this.points === 27)) {
          return ;
        }
        this.attributes[attr] =  this.attributes[attr] + (plus ? 1 : -1);
      },
      parseValue2Bonus(key) {
        return  parseValue2Bonus(this.computedSumByAttribute(key));
      },
      computedSumByAttribute(key) {
          return this.attributes[key] + this.computedRaceBonus(key);
      },
      computedRaceBonus(key) {
         return  (this.extra[key] ? 1: 0)+ (this.extraTwo[key] ? 2: 0);
      },
      parseColor(color) {
          return parseColor(color);
      }
    },
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.content {
    background: #fff
}
</style>
