<!--  -->
<template lang="pug">
    div(style="padding: 12px;")
        //- v-card 
        //-     v-card-title(v-text="`基本`")
        //-     v-card-text
        //-         v-data-table(v-model="select" item-key="name" show-select :headers="headers" :items="items" hide-default-footer)
        //- v-row
        //-     v-col(cols="3")
        //-         v-card
        //-             v-card-title(v-text="`基本数值`")
        //-             v-card-text
        //-                 v-data-table(:headers="baseHeaders" :items="baseItems" hide-default-footer)
        //-     v-col(cols="9")
        //-         v-card
        //-             v-card-title(v-text="`职业`")
        v-row(align="center")
            v-col(cols="3")
                v-card
                    v-card-title(v-text="`攻防`")
                    v-card-text
                        v-data-table(hide-default-header item-key="attr" :headers="saveHeaders" :items="baseItems" hide-default-footer)
            v-col(cols="9")
                v-card
                    v-card-title(v-text="`职业`")
                    v-card-text
                        v-data-table(hide-default-header item-key="attr" :headers="skillHeaders" :items="skillItems1" hide-default-footer)
        v-row(align="center")
            v-col(cols="3")
                v-card
                    v-card-title(v-text="`豁免 & 鉴定`")
                    v-card-text
                        v-row
                            v-col(cols="12")
                                v-data-table(item-key="attr" :headers="saveHeaders" :items="baseItems" hide-default-footer)
            v-col(cols="9")
                v-card
                    v-card-title(v-text="`技能鉴定 & 对抗`")
                    v-card-text
                        v-row
                            v-col(cols="4")
                                v-data-table(item-key="attr" :headers="skillHeaders" :items="skillItems1" hide-default-footer)
                            v-col(cols="4")
                                v-data-table(item-key="attr" :headers="skillHeaders" :items="skillItems2" hide-default-footer)
                            v-col(cols="4")
                                v-data-table(item-key="attr" :headers="skillHeaders" :items="skillItems3" hide-default-footer)
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
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {skills, keyAttrEn2Cn} from './../data/const';
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    baseHeaders : [{
        text: '属性',
        value: 'attr',
        sortable: false,
    }, {
        sortable: false,
        text: '值',
        value: 'value',
    }, {
        sortable: false,
        text: '加值',
        value: 'bonus'
    }],
    innerBaseItems: {
        str: 10,
        dex: 15,
        con: 13,
        int: 15,
        wis: 10,
        cha: 8
    },
    saveHeaders: [
        {
            text: '属性',
            value: 'attr',
            sortable: false,
        },{
            sortable: false,
            text: '加权值',
            value: 'bonus'
        }
    ],
    skillHeaders: [
        {
            text: '技能',
            value: 'attr',
            sortable: false,
        },
        // {
        //     width: 70,
        //     sortable: false,
        //     text: '额外',
        //     value: 'extra'
        // },
        {
            sortable: false,
            text: '值',
            value: 'bonus'
        },
    ]
};
},
//监听属性 类似于data概念
computed: {
    baseItems () {
        return Object.keys( this.innerBaseItems).map(key => ({attr: key, value: this.innerBaseItems[key],bonus: (Math.floor((this.innerBaseItems[key] - 10)/2) > 0 ? '+':'') +  Math.floor((this.innerBaseItems[key] - 10)/2)  }))
    },
    skillItems () {
        return  skills.map(key => ({attr: `${keyAttrEn2Cn(key.key_attr)}(${key.name_cn})` , extra:'', bonus: ''}));
    },
    skillItems1 () {
        return this.skillItems.filter((_, index) => index < 6);
    },
    skillItems2() {
        return this.skillItems.filter((_, index) => index >= 6 && index < 12);
    },
    skillItems3() {
        return this.skillItems.filter((_, index) => index >= 12 && index <18);
    }

},
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