<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:33:43
 * @LastEditors: Quarter
 * @Description: 简易的冷却按钮
 * @FilePath: /simple-ui/packages/cool-button/src/cool-button.vue
-->
<template>
  <s-button
    class="s-cool-button"
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
  </s-button>
</template>

<script lang="ts">
import { Button, ButtonTheme } from "packages/button";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SCoolButton",
  components: {
    SButton: Button,
  },
})
export default class CoolButton extends Vue {
  @Prop({
    type: Number,
    default: 60,
  })
  delay?: number; // 延迟的时间

  @Prop(String)
  width?: string; // 宽度

  @Prop({
    type: Boolean,
    default: false,
  })
  fill?: boolean; // 是否填充

  @Prop({
    type: Boolean,
    default: false,
  })
  outline?: boolean; // 是否框线

  @Prop({
    type: Boolean,
    default: false,
  })
  round?: boolean; // 是否圆角

  @Prop({
    type: String,
    default: "normal",
  })
  type?: ButtonTheme; // 按钮类型

  cooling = false; // 是否冷却
  coolStartTime = 0; // 开始冷却时间
  intervalIndex: number | null = null; // 循环标记
  coolLabel = ""; // 倒计时文本

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    if (typeof this.intervalIndex === "number" && this.intervalIndex !== -1) {
      clearInterval(this.intervalIndex);
    }
  }

  /**
   * @description: 点击按钮事件
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
  }

  /**
   * @description: 计算冷却时间
   * @return
   */
  calcRelayTime(): void {
    const now: number = Date.now();
    const distance: number = Math.ceil((now - this.coolStartTime) / 1000);
    let delay = 60;
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
  }
}
</script>

<style lang="scss">
.s-cool-button {
  text-align: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
