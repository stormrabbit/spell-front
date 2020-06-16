<template lang="pug">
  v-app(id="inspire")
    v-stepper(v-model="step" vertical)
      v-stepper-step(:complete="step > 1" step="1") 选择种族
      v-stepper-content(step="1")
        v-card(class="mb-12" color="grey lighten-3")
          v-card-text
            v-radio-group(row)
              v-row(align="center" )
                v-col(cols="2" v-for="(race, index) in races" :key="index" style="text-align: center;")
                  v-radio(:label="race" )
          v-card-actions
            v-btn(text @click="step = 2" ) 确认
      v-stepper-step(:complete="step > 2" step="2") 选择职业
      v-stepper-content(step="2")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            v-radio-group(row)
              v-row(align="center" )
                v-col(cols="2" v-for="(clazz, index) in classes" :key="index" style="text-align: center;")
                  v-radio( :label="clazz")
          v-card-actions
            v-btn(text @click="step = 3") 确认
            v-btn(text @click="step = 1") 返回
      v-stepper-step(:complete="step > 3" step="3") 属性值
      v-stepper-content(step="3")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-title 剩余点数：27
          v-card-text
            v-row
              v-col(cols="2")
                v-text-field(label="力量" v-model="abilities.str" outlined)
              v-col(cols="2")
              v-col(cols="2")
                v-chip(class="ma-2" color="red" text-color="white") -1
          v-card-actions
            v-btn(text @click="step = 4") 确认
            v-btn(text @click="step = 2") 返回
      v-stepper-step(:complete="step > 4" step="4") 选择阵营
      v-stepper-content(step="4")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            v-radio-group(row)
              v-radio(v-for="(alignment, index) in alignments" :label="alignment" :key="index")
          v-card-actions
            v-btn(text @click="step = 5") 确认
            v-btn(text @click="step = 3") 返回
      v-stepper-step(:complete="step > 5" step="5") 选择背景
      v-stepper-content(step="5")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            v-radio-group(row)
              v-radio(v-for="(background, index) in backgrounds" :label="background" :key="index")
          v-card-actions
            v-btn(text @click="step = 6") 确认
            v-btn(text @click="step = 4") 返回
      v-stepper-step(:complete="step > 6" step="6") 选择技能
      v-stepper-content(step="6")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            div(style="display: flex;align-items: center;")
              v-checkbox(v-for="(skill, index) in skills" :label="skill" :key="index")
          v-card-actions
            v-btn(text @click="step = 7") 确认
            v-btn(text @click="step = 5") 返回
      v-stepper-step(:complete="step > 7" step="7") 选择专长
      v-stepper-content(step="7")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            div(style="display: flex;align-items: center;")
              v-checkbox(v-for="(feat, index) in feats" :label="feat" :key="index")
          v-card-actions
            v-btn(text @click="step = 8") 确认
            v-btn(text @click="step = 6") 返回    
</template>

<script>
    export default {
        data () {
            return {
                step: 3,
                abilities: {
                  str: 8,
                  dex: 8,
                  con: 8,
                  wis: 8,
                  int: 8,
                  cha: 8
                },
                races:["矮人","精灵","半身人","人类","龙裔","侏儒","半精灵","半兽人","提夫林"],
                classes: ["野蛮人","吟游诗人","牧师","德鲁伊","战士","武僧","圣武士","游侠","游荡者","邪术师","法师"],
                alignments: ["守序善良","中立善良","混乱善良","守序中立","绝对中立","混乱中立","守序邪恶","中立邪恶","混乱邪恶"],
                backgrounds: ["侍僧","骗子","罪犯","艺人","平民英雄","公会工匠","隐士","贵族","化外之民","智者","水手","士兵","流浪儿"],
                skills: ["运动","体操","巧手","隐匿","奥秘","历史","调查","自然","宗教","驯兽","洞悉","医药","察觉","求生","欺瞒","威吓","表演","游说"],
                feats: ["警觉","运动员","演员","冲锋手","强弩专家","防御式决斗","双持客","地城探索者","耐性","元素导师","擒抱者","巨武器大师","医疗师","重甲运用","重甲大师","领袖之证","敏锐心灵","轻甲运用","语言学家","幸运","巫师杀手","魔法学徒","战技专家","中甲大师","灵活移动","中甲运用","骑乘战斗","观察力","长柄武器大师","强健身心","仪式施法者","凶蛮打手","哨兵"]
            }
        },
    }
</script>

<style scoped>
/deep/ .v-input--selection-controls .v-input__control {
  width: 100%;
}
</style>>