<template lang="pug">
.content
  p 被点击日期：{{ name }}
  v-row
    v-col(cols="6")
      v-btn(@click="change") 测试
      ve-chart(:data="chartData", :settings="chartSettings")
    v-col(cols="6")
      ve-pie(:data="chartData", :events="chartEvents")
    v-col(cols="6")
      ve-line(:data="chartData", :setting="chartSettings")
    v-col(cols="6")
      ve-histogram(:data="chartData")
    v-col(cols="6")
      ve-bar(:data="chartData")
    v-col(cols="6")
      ve-ring(:data="chartData")
    v-col(cols="6")
      ve-funnel(:data="chartData")
    v-col(cols="6")
      ve-radar(:data="chartData")
    v-col(cols="6")
      ve-map(:data="chartData")
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data: function() {
        const self = this;
        return {
            name: "",
            typeArr : ['line', 'histogram', 'pie'],
            index: 1,
            chartSettings: {
                metrics: ["访问用户", "下单用户"],
                dimension: ["日期"],
                stack: { 用户: ["访问用户", "下单用户"] },
                area: true,
                axisSite: { right: ["下单率"] },
                yAxisType: ["KMB", "percent"],
                yAxisName: ["数值", "比率"],
                type: this.chartType || 'line'
            },
            chartData: {
                columns: ["日期", "访问用户", "下单用户", "下单率"],
                rows: [
                    {
                        日期: "1/1",
                        访问用户: 1393,
                        下单用户: 1093,
                        下单率: 0.32,
                    },
                    {
                        日期: "1/2",
                        访问用户: 3530,
                        下单用户: 3230,
                        下单率: 0.26,
                    },
                    {
                        日期: "1/3",
                        访问用户: 2923,
                        下单用户: 2623,
                        下单率: 0.76,
                    },
                    {
                        日期: "1/4",
                        访问用户: 1723,
                        下单用户: 1423,
                        下单率: 0.49,
                    },
                    {
                        日期: "1/5",
                        访问用户: 3792,
                        下单用户: 3492,
                        下单率: 0.323,
                    },
                    {
                        日期: "1/6",
                        访问用户: 4593,
                        下单用户: 4293,
                        下单率: 0.78,
                    },
                ],
            },
            chartEvents: {
                click: function(e) {
                    self.name = e.name;
                    // eslint-disable-next-line no-console
                    console.log(e);
                },
            },
        };
    },
    //监听属性 类似于data概念
    computed: {
        chartType() {
            return this.typeArr[this.index];
        }
    },
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
        change() {
            this.index++
            if (this.index >= this.typeArr.length) { this.index = 0 }
                this.chartSettings = { type: this.typeArr[this.index] }
            }
    },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类

.content {
  background: #fff;
}
</style>
