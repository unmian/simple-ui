<!--
 * @Author: Quarter
 * @Date: 2020-09-29 15:32:55
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-13 18:46:59
 * @Description: 简易的按钮组件
 * @FilePath: /simple-ui/packages/button/src/button.vue
-->
<template>
  <button
    class="s-button"
    :class="buttonClass"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <s-icon v-if="icon" :name="icon"></s-icon>
    <span v-if="$slots.default && !justIcon" class="s-button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Icon } from "@unmian/simple-icons";
import { CustomClass, CommonSize } from "packages/types";
import { ButtonShape, ButtonTheme, ButtonType, ButtonVariant } from "./types";

@Component({
  name: "SButton",
  components: {
    SIcon: Icon,
  },
})
export default class Button extends Vue {
  // 按钮主题
  @Prop({ type: String, default: "default" })
  readonly theme!: ButtonTheme;

  // 按钮大小
  @Prop({ type: String, default: "medium" })
  readonly size!: CommonSize;

  // 按钮变体
  @Prop({ type: String, default: "fill" })
  readonly variant!: ButtonVariant;

  @Prop({
    type: String,
    default: "button",
  })
  readonly type!: ButtonType;

  // 按钮图标
  @Prop(String)
  readonly icon?: string;

  // 按钮形状
  @Prop({ type: String, default: "rectangle" })
  readonly shape!: ButtonShape;

  // 按钮禁用状态
  @Prop({ type: Boolean, default: false })
  readonly disabled?: boolean;

  /**
   * @description: 按钮类
   * @return {CustomClass}
   */
  get buttonClass(): CustomClass {
    const classList = [];
    if (["default", "cancel", "primary", "success", "warning", "danger"].includes(this.theme)) {
      classList.push(`s-button--${this.theme}`);
    } else {
      classList.push("s-button--default");
    }
    if (["small", "medium", "large"].includes(this.size)) {
      classList.push(`s-size-${this.size}`);
    } else {
      classList.push("s-size-medium");
    }
    if (["plain", "fill", "outline", "outline-dashed"].includes(this.variant)) {
      classList.push(`s-button--${this.variant}`);
    } else {
      classList.push("s-button--plain");
    }
    if (["rectangle", "square", "round", "circle"].includes(this.shape)) {
      classList.push(`s-button--${this.shape}`);
    } else {
      classList.push("s-button--rectangle");
    }
    if (this.disabled) {
      classList.push("s-button--disabled");
    }
    return classList;
  }

  /**
   * @description: 仅图标
   * @return {boolean}
   */
  get justIcon(): boolean {
    return this.shape === "square" || this.shape === "circle";
  }

  /**
   * @description: 点击事件
   * @param {MouseEvent} event 事件
   * @return
   */
  handleClick(event: MouseEvent): void {
    if (this.disabled === false) {
      this.$emit("click", event);
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
