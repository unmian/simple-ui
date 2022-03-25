<!--
 * @Author: Quarter
 * @Date: 2020-08-21 09:05:03
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 08:22:08
 * @Description: 简易的冷却按钮
-->
<template>
  <simple-button
    class="simple-cool-button"
    :type="type"
    :fill="fill"
    :outline="outline"
    :round="round"
    :disabled="cooling"
    :style="{ width: width }"
    @click.stop="clickButton"
  >
    <template v-if="cooling">{{ coolLabel }}</template>
    <template v-else>
      <slot></slot>
    </template>
  </simple-button>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleButtonType } from "../types";

export default Vue.extend({
  name: "SimpleCoolButton",
  props: {
    delay: { // 延迟的时间
      type: Number,
      default: 60,
    },
    width: String, // 宽度
    fill: { // 是否填充
      type: Boolean,
      default: false,
    },
    outline: { // 是否框线
      type: Boolean,
      default: false,
    },
    round: { // 是否圆角
      type: Boolean,
      default: false,
    },
    type: { // 按钮类型
      type: String,
      default: "normal",
    } as PropOptions<SimpleButtonType>,
  },
  data() {
    return {
      cooling: false, // 是否冷却
      coolStartTime: 0, // 开始冷却时间
      intervalIndex: null as null | ReturnType<typeof setInterval>, // 循环标记
      coolLabel: "", // 倒计时文本
    };
  },
  beforeDestroy(): void {
    if (typeof this.intervalIndex === "number" && this.intervalIndex !== -1) {
      clearInterval(this.intervalIndex);
    }
  },
  methods: {
    /**
     * @description: 点击按钮事件
     * @author: Quarter
     * @param {MouseEvent} event 鼠标事件
     * @return
     */
    clickButton(event: MouseEvent): void {
      if (this.cooling === false) {
        this.$emit("click", event);
        this.cooling = true;
        this.coolStartTime = Date.now();
        this.calcRelayTime();
        this.intervalIndex = setInterval(this.calcRelayTime, 200);
      }
    },
    /**
     * @description:
     * @param {type}
     * @return {type}
     */
    calcRelayTime(): void {
      const now: number = Date.now();
      const distance: number = Math.ceil((now - this.coolStartTime) / 1000);
      let delay: number = 60;
      if (typeof this.delay === "number" && this.delay > 0) {
        delay = this.delay;
      }
      if (distance < delay) {
        const remainSeconds: number = delay - distance;
        if (remainSeconds > 60 * 60) {
          const reaminHours: number = Math.ceil(remainSeconds / 60 / 60);
          this.coolLabel = `${reaminHours} h`;
        } else if (remainSeconds > 60 * 5) {
          const remainMinutes: number = Math.ceil(remainSeconds / 60);
          this.coolLabel = `${remainMinutes} min`;
        } else {
          this.coolLabel = `${remainSeconds} s`;
        }
      } else {
        this.cooling = false;
        this.coolStartTime = 0;
        this.coolLabel = "";
        if (typeof this.intervalIndex === "number") {
          clearInterval(this.intervalIndex);
          this.intervalIndex = null;
        }
      }
    },
  },
});

export class SimpleCoolButton extends Vue {

}
</script>

<style lang="scss">
.simple-cool-button {
  text-align: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>