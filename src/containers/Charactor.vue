<!--  -->
<template lang="pug">
    div(style="padding: 12px;") 
        v-card
            v-card-title(v-text="`角色`")
            v-card-text
                v-row
                    v-col(cols="2")
                        v-btn(label block outlined disabled) 角色名稱：测试
                    v-col(cols="2")
                        v-btn(label block outlined) 等级：7
                    v-col(cols="2")
                        v-btn(label block outlined) 种族：半精灵
                    v-col(cols="2")
                        v-btn(label block outlined) 性别：男
                    v-col(cols="2")
                        v-btn(label block outlined) 阵营：中立善良
                    v-col(cols="2")
                        v-btn(label block outlined) 信仰诸神：梅凯丽
                    v-col(cols="2")
                        v-btn(label block outlined) 体型：中体型
                    v-col(cols="2")
                        v-btn(label block outlined) 发色：黑色
                    v-col(cols="2")
                        v-btn(label block outlined) 眼睛：黑色
                    v-col(cols="2")
                        v-btn(label block outlined) 身高：5.9 ft
                    v-col(cols="2")
                        v-btn(label block outlined) 体重：150 lb
                    v-col(cols="2")
                        v-btn(label block outlined) 背景：士兵
        v-row
            v-col(cols="3")
                v-card
                    v-card-title(v-text="`基本数值`")
            v-col(cols="3")
                v-card
                    v-card-title(v-text="`豁免`")
            v-col(cols="6")
                v-card
                    v-card-title(v-text="`职业`")
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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