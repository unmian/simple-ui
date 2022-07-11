<!--
 * @Author: Quarter
 * @Date: 2021-02-24 08:51:55
 * @LastEditTime: 2022-06-07 17:08:24
 * @LastEditors: Quarter
 * @Description: 简易的切换开关
 * @FilePath: /simple-ui/packages/switch/src/switch.vue
-->
<template>
  <div
    class="s-switch"
    :class="customClass"
    :style="customStyle"
    @click="switchButton"
  >
    <div class="switch-wrapper">
      <div class="switch-button">{{ switchLabel }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass, CustomStyle, CommonSize } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SSwitch",
})
export default class SSwitch extends Mixins(Emitter) {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  activeLabel?: string; // 激活的文字

  @Prop(String)
  activeColor?: string; // 激活的颜色

  @Prop({
    type: [String, Number, Boolean],
    default: true,
  })
  activeValue!: string | number | boolean; // 激活的值

  @Prop(String)
  inactiveLabel?: string; // 未激活的文字

  @Prop(String)
  inactiveColor?: string; // 未激活的颜色

  @Prop({
    type: [String, Number, Boolean],
    default: false,
  })
  inactiveValue!: string | number | boolean; // 未激活的值

  @Prop({
    type: String,
    default: "medium",
  })
  size!: CommonSize; // 大小

  @Prop({
    type: Boolean,
    default: false,
  })
  square!: boolean; // 是否矩形

  @Prop({
    type: [String, Number, Boolean],
    default: false,
  })
  value!: string | number | boolean; // 值

  @Prop([Number, String])
  scale?: number | string; // 比例

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean; // 是否禁用

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly!: boolean; // 是否只读

  @Prop({
    type: Boolean,
    default: false,
  })
  control!: boolean; // 是否外部控制

  insideActive = false; // 是否激活

  /**
   * @description: 同步的值
   * @author: Quarter
   * @return {string|number|boolean}
   */
  get syncedValue(): string | number | boolean {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @author: Quarter
   * @param {string|number|boolean} val 值
   * @return
   */
  set syncedValue(val: string | number | boolean) {
    this.$emit("update:value", val);
  }

  /**
   * @description: 是否可用
   * @author: Quarter
   * @return
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 自定义类
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "size-mini": this.size === "mini",
      "size-small": this.size === "small",
      "size-medium": this.size === "medium",
      "size-large": this.size === "large",
      "status-active": this.unsyncedValue === true,
      "status-disabled": this.disabled === true,
      "status-readonly": this.readonly === true,
      "square-switch": this.square === true,
    };
  }

  /**
   * @description: 自定义样式
   * @author: Quarter
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    const styles: CustomStyle = {};
    if (this.width) {
      styles.width = this.width;
    }
    if (this.activeColor) {
      styles["--active-color"] = this.activeColor;
    }
    if (this.inactiveColor) {
      styles["--inactive-color"] = this.inactiveColor;
    }
    if (typeof this.scale === "number") {
      if (this.scale > 0 && this.scale < 100) {
        styles["--s-bar-scale"] = `${this.scale}%`;
        styles["--s-last-scale"] = `${100 - this.scale}%`;
      }
    }
    const numberRegExp: RegExp = new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/);
    if (typeof this.scale === "string" && numberRegExp.test(this.scale)) {
      const scaleNumber: number = parseFloat(this.scale);
      if (scaleNumber > 0 && scaleNumber < 100) {
        styles["--s-bar-scale"] = `${scaleNumber}%`;
        styles["--s-last-scale"] = `${100 - scaleNumber}%`;
      }
    }
    return styles;
  }

  /**
   * @description: 过滤的激活值
   * @author: Quarter
   * @return {any}
   */
  get filterActiveValue(): any {
    if (
      this.activeValue !== undefined &&
      (typeof this.activeValue !== "string" ||
        typeof this.activeValue !== "number" ||
        typeof this.activeValue !== "boolean")
    ) {
      return this.activeValue;
    }
    return true;
  }

  /**
   * @description: 过滤的未激活值
   * @author: Quarter
   * @return {any}
   */
  get filterInactiveValue(): any {
    if (
      this.activeValue !== undefined &&
      (typeof this.inactiveValue !== "string" ||
        typeof this.inactiveValue !== "number" ||
        typeof this.inactiveValue !== "boolean")
    ) {
      return this.inactiveValue;
    }
    return false;
  }

  /**
   * @description: 过滤的激活文本
   * @author: Quarter
   * @return {String}
   */
  get filterActiveLabel(): string {
    if (this.activeLabel) {
      return this.activeLabel;
    }
    return "是";
  }

  /**
   * @description: 过滤的未激活文本
   * @author: Quarter
   * @return {String}
   */
  get filterInactiveLabel(): string {
    if (this.inactiveLabel) {
      return this.inactiveLabel;
    }
    return "否";
  }

  /**
   * @description: 切换的标签
   * @author: Quarter
   * @return {String}
   */
  get switchLabel(): string {
    if (this.unsyncedValue) {
      return this.filterActiveLabel;
    } else {
      return this.filterInactiveLabel;
    }
  }

  /**
   * @description: 设置未同步值
   * @author: Quarter
   * @return {Boolean}
   */
  get unsyncedValue(): boolean {
    return this.insideActive !== false;
  }

  /**
   * @description: 设置未同步值
   * @author: Quarter
   * @param {boolean} val 值
   * @return
   */
  set unsyncedValue(val: boolean) {
    const filterValue: boolean = val !== false;
    const customValue: any = filterValue
      ? this.filterActiveValue
      : this.filterInactiveValue;
    if (this.insideActive !== filterValue) {
      this.syncedValue = customValue;
      this.$emit("input", customValue);
      this.$emit("change", customValue);
      this.dispatch("SFormItem", "s-form-validate", ["change"]);
      this.insideActive = filterValue;
    }
  }

  /**
   * @description: 监听传入值变化
   * @author: Quarter
   * @return
   */
  @Watch("syncedValue", {
    immediate: true,
  })
  handlerSyncedValueChange(): void {
    if (this.insideActive !== (this.syncedValue === this.filterActiveValue)) {
      this.insideActive = this.syncedValue === this.filterActiveValue;
    }
  }

  /**
   * @description: 切换按钮
   * @author: Quarter
   * @return
   */
  switchButton(): void {
    if (this.enabled) {
      if (this.control) {
        this.$emit(
          "change",
          !this.unsyncedValue
            ? this.filterActiveValue
            : this.filterInactiveValue
        );
      } else {
        this.unsyncedValue = !this.unsyncedValue;
      }
    }
  }
}
</script>

<style lang="scss">
.s-switch {
  width: 60px;
  height: 32px;
  padding: 3px;
  cursor: pointer;
  user-select: none;
  border-radius: 13px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:not(.status-disabled):hover {
    background-color: #eeeeee;
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.02) inset;

    .switch-wrapper .switch-button {
      box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.1);
    }
  }

  &.status-active {
    justify-content: flex-start;
  }

  .switch-wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    .switch-button {
      width: var(--s-bar-scale, 60%);
      height: 100%;
      color: white;
      font-size: 16px;
      line-height: 26px;
      border-radius: 13px;
      text-align: center;
      background-color: var(--inactive-color, #cccccc);
      transition: left 0.3s ease, box-shadow 0.3s ease;
      position: absolute;
      top: 0;
      left: var(--s-last-scale, 40%);
    }
  }

  &.status-active .switch-wrapper .switch-button {
    background-color: var(--active-color, #549fff);
    left: 0;
  }

  &.status-disabled {
    cursor: default;
    background-color: #f9f9f9;

    .switch-wrapper {
      opacity: 0.5;
    }
  }

  &:not(.status-disabled).status-readonly {
    cursor: not-allowed;
  }

  &.size-mini {
    width: 45px;
    height: 24px;
    padding: 2px;
    border-radius: 12px;

    .switch-button {
      font-size: 12px;
      line-height: 20px;
      border-radius: 10px;
    }

    &.square-switch {
      border-radius: 2px;
    }
  }

  &.size-small {
    width: 55px;
    height: 28px;
    padding: 2px;
    border-radius: 15px;

    .switch-wrapper .switch-button {
      font-size: 13px;
      line-height: 24px;
      border-radius: 12px;
    }

    &.square-switch {
      border-radius: 4px;
    }
  }

  &.size-medium {
    width: 60px;
    height: 32px;
    padding: 3px;
    border-radius: 16px;

    .switch-wrapper .switch-button {
      font-size: 16px;
      line-height: 26px;
      border-radius: 13px;
    }

    &.square-switch {
      border-radius: 4px;
    }
  }

  &.size-large {
    width: 70px;
    height: 34px;
    padding: 3px;
    border-radius: 20px;

    .switch-wrapper .switch-button {
      font-size: 18px;
      line-height: 28px;
      border-radius: 14px;
    }

    &.square-switch {
      border-radius: 5px;
    }
  }

  &.square-switch {
    border-radius: 4px;

    &.size-mini .switch-wrapper .switch-button {
      border-radius: 2px;
    }

    &.size-small .switch-wrapper .switch-button {
      border-radius: 2px;
    }

    &.size-medium .switch-wrapper .switch-button {
      border-radius: 2px;
    }

    &.size-large .switch-wrapper .switch-button {
      border-radius: 3px;
    }
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
