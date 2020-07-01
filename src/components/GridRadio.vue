<!--  -->
<template lang="pug">
    v-radio-group(row @change="modifyValue" v-model="radioGroup")
        v-row(align="center" )
            v-col(cols="2" v-for="(val, index) in text" :key="index" style="text-align: center;")
                v-radio(:label="val" v-model="value[index]" )
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
props: {
    text: {
        type: Array,
        default: () => []
    },
    value: {
        type: Array,
         default: () => []
    }
},
data() {
//这里存放数据
return {    
    radioGroup: '',
    tips: '',
};
},
//监听属性 类似于data概念
computed: {
},
//监控data中的数据变化
watch: {
    value:{
      handler(){
        this.radioGroup = '';
      },
      deep: true,
    }
},
//方法集合
methods: {
    modifyValue(val) {
       this.$emit('on-change', val);
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>