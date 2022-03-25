<!--
 * @Author: Quarter
 * @Date: 2020-08-18 10:25:01
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 10:21:09
 * @Description: 简易的密码强度显示
-->
<template>
  <collapse-transition>
    <div class="simple-password-strength" v-show="visible">
      <div class="password-message" :style="{ color: color }">密码强度：{{ levelStr }}</div>
      <simple-bar
        :value="barWidth"
        :color="color"
        :height="6"
        background-color="#f5f5f5"
        style="width: 250px; margin-top: 5px"
      ></simple-bar>
    </div>
  </collapse-transition>
</template>

<script lang="ts">
import Vue from "vue";
import CollapseTransition from "./CollapseTransition.vue";
import SimpleBar from "./SimpleBar.vue";

export default Vue.extend({
  name: "SimplePasswordStrength",
  components: {
    CollapseTransition,
    SimpleBar,
  },
  props: {
    password: String, // 密码字符串
  },
  data() {
    return {
      levelStr: "无", // 强度等级
      barWidth: 0, // 柱状条的值
      color: "transparent", // 柱状条的颜色
    };
  },
  computed: {
    /**
     * @description: 是否显示组件
     * @author: Quarter
     * @return
     */
    visible(): boolean {
      if (typeof this.password === "string" && this.password !== "") {
        return true;
      }
      return false;
    },
  },
  watch: {
    /**
     * @description: 监听密码的变化
     * @author: Quarter
     * @param {String} newValue 变化的密码
     * @return
     */
    password: {
      immediate: true,
      handler(newValue: string): void {
        if (typeof newValue === "string") {
          let levelStr: string = "无";
          let barWidth: number = 0;
          let color: string = "transparent";
          if (newValue.length > 0) {
            levelStr = "弱";
            barWidth = 30;
            color = "#f5222d";
          }
          const passwordRegExp: RegExp = new RegExp(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          );
          const strongPasswordRegExp: RegExp = new RegExp(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
          );
          if (strongPasswordRegExp.test(newValue) === true) {
            levelStr = "强";
            barWidth = 100;
            color = "#52c41a";
          } else if (passwordRegExp.test(newValue) === true) {
            levelStr = "中";
            barWidth = 65;
            color = "#e6a23c";
          }
          this.levelStr = levelStr;
          this.barWidth = barWidth;
          this.color = color;
        }
      },
    },
  },
});
</script>

<style lang="scss">
.simple-password-strength {
  margin-top: 20px;

  .password-message {
    color: #666666;
    font-size: 14px;
  }
}
</style>