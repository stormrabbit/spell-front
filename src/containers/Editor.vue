<template lang="pug">
  v-app(id="inspire")
    v-stepper(v-model="e6" vertical)
      v-stepper-step(:complete="e6 > 1" step="1") 选择种族
      v-stepper-content(step="1")
        v-card(class="mb-12" color="grey lighten-3"  style="background: #fff")
          v-card-text
            v-radio-group(row)
              v-radio(label="矮人")
              v-radio(label="精灵")
              v-radio(label="半身人")
              v-radio(label="人类")
              v-radio(label="龙裔")
              v-radio(label="侏儒")
              v-radio(label="半精灵")
              v-radio(label="半兽人")
              v-radio(label="提夫林")
          v-card-actions
            v-btn(text @click="e6 = 2" ) 确认
        //v-btn(text)
      v-stepper-step(:complete="e6 > 2" step="2") 选择职业
      v-stepper-content(step="2")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-text
            v-radio-group(row)
              v-radio(label="野蛮人")
              v-radio(label="吟游诗人")
              v-radio(label="牧师")
              v-radio(label="德鲁伊")
              v-radio(label="战士")
              v-radio(label="武僧")
              v-radio(label="圣武士")
              v-radio(label="游侠")
              v-radio(label="游荡者")
              v-radio(label="邪术师")
              v-radio(label="法师")
          v-card-actions
            v-btn(text @click="e6 = 3") 确认
            v-btn(text @click="e6 = 1") 返回
      v-stepper-step(:complete="e6 > 3" step="3") 属性值
      v-stepper-content(step="3")
        v-card(color="grey lighten-3" class="mb-12")
          v-card-title 剩余点数：27
          v-card-text
            div

          v-card-actions
            v-btn(text @click="e6 = 4") 确认
            v-btn(text @click="e6 = 2") 返回

</template>

<script>
    export default {
        data () {
            return {
                e6: 1,
            }
        },
    }
</script>