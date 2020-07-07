<!--  -->
<template lang="pug">
    v-card(color="grey lighten-3" class="mb-12")
        v-card-text
            grid-checkbox(:text="skillsCN" :value="skillsEN" @on-change="onSkillsChange")
        v-card-actions
            v-btn(text @click="$emit('confirm')" ) 确认
            v-btn(text @click="$emit('cancel')") 返回
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {skillsCN, skillsEN, locateSkillByEN} from '../../data/skills';
import gridCheckbox from '../../components/GridCheckbox';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        gridCheckbox
    },
    data:() => ({
        skillsCN,
        skillsEN
    }),
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
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
        onSkillsChange(vals) {
            this.$emit('modify-skill',vals.map(val => locateSkillByEN(val)))
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
