<!--  -->
<template>
    <div style="padding-top: .9375rem;margin-left: .75rem;margin-right: .75rem;text-align: left;" class="card-main" >
       <header style="display: flex;" class="weibo-top m-box m-avatar-box">
           <img class="m-img-box" src="https://p-bandai.com/img/hk/p/m/N2505896001002_001.jpg"/>
            <div class="m-box-col m-box-dir m-box-center">
                <div style="margin-left: .75rem;" class="m-text-box">
                    <h3 class="m-text-cut" style="color: #ff8200">
                        欧阳夏昱
                    </h3>
                    <h4 class="m-text-cut">
                        <span class="time">11 小时前</span>
                        <span class="from">来自 小米8周年旗舰手机</span>
                    </h4>
                </div>
            </div>
       </header>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data:() => ({}),
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
    methods: {},
}
</script>
<style lang='css' scoped>
.card .card-wrap {
    margin-left: .75rem;
    margin-right: .75rem;
    height: 100%;
}
.m-text-cut {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.m-text-box h4 {
    font-size: .75rem;
    color: #636363;
    line-height: 1.5;
}
.m-text-box h4:last-child {
    color: #939393;
}
.card9 .weibo-top .m-text-box h4 {
    color: #939393;
}
.card .card-wrap .card-main {
    box-sizing: border-box;
    margin-left: -.75rem;
    margin-right: -.75rem;
    height: 100%;
}
.card .card-wrap .card-main>.m-box{
    height: 100%;
}
.card9 .weibo-top {
    padding: 0 .75rem;
}
.m-img-box{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    position: relative;
}
.m-box-dir {
    -ms-flex-direction: column;
    flex-direction: column;
}
.m-box-center {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
}
.m-box-col {
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    display: block;
    min-width: 0;
}
.card9 .weibo-top .m-text-box {
    margin-left: .75rem;
}
.card9.weibo-member .weibo-top .m-text-box h3 {
    color: #F46200;
}
.card9 .weibo-top .m-text-box h3 {
    font-size: .9375rem;
    margin: 0;
}
.m-text-box h3 {
    font-size: 1rem;
    color: #333;
    line-height: 1.4;
}
.m-text-cut {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
