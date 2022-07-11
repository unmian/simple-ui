<!--
 * @Author: Quarter
 * @Date: 2021-06-23 11:36:03
 * @LastEditTime: 2022-06-07 16:48:35
 * @LastEditors: Quarter
 * @Description: 单选按钮组件
 * @FilePath: /simple-ui/packages/radio/src/radio-button.vue
-->
<template>
  <button class="s-radio-button" :class="customClass" @click="checkRadio">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass, CommonSize } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { RadioValue } from "./types";

@Component({
  name: "SRadioButton",
})
export default class SRadioButton extends Mixins(Emitter) {
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  value!: RadioValue; // 选中的值

  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  label!: RadioValue; // 当前单选框的值

  @Prop(String)
  size?: CommonSize; // 尺寸大小

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean; // 是否禁用

  unsyncedValue: RadioValue = null; // 不同步的值

  /**
   * @description: 选中的值
   * @author: Quarter
   * @return {RadioValue}
   */
  get syncedValue(): RadioValue {
    return this.value;
  }

  /**
   * @description: 选中的值
   * @author: Quarter
   * @param {RadioValue} val 值
   * @return
   */
  set syncedValue(val: RadioValue) {
    this.$emit("update:value", val);
    this.$emit("input", this.label);
    this.$emit("change", this.label);
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 过滤的尺寸
   * @author: Quarter
   * @return {CommonSize}
   */
  get filterSize(): CommonSize {
    const sizeList: CommonSize[] = ["mini", "small", "medium", "large"];
    if (typeof this.size === "string" && sizeList.indexOf(this.size) > -1) {
      return this.size;
    }
    return "medium";
  }

  /**
   * @description: 当前是否选中
   * @author: Quarter
   * @return {Boolean}
   */
  get checked(): boolean {
    return this.unsyncedValue === this.label;
  }

  /**
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "status-checked": this.checked === true,
      "status-disabled": this.disabled === true,
    };
    Reflect.set(classNames, "size-" + this.filterSize, true);
    return classNames;
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    if (this.unsyncedValue !== this.syncedValue) {
      this.unsyncedValue = this.syncedValue;
    }
  }

  /**
   * @description: 监听选中值的改变
   * @author: Quarter
   * @param {RadioValue} newValue 改变的值
   * @return
   */
  @Watch("value")
  handleValueChange(newValue: RadioValue) {
    if (this.unsyncedValue !== newValue) {
      this.unsyncedValue = newValue;
    }
  }

  /**
   * @description: 选中单选框
   * @author: Quarter
   * @return
   */
  checkRadio(): void {
    if (
      this.disabled === false &&
      this.unsyncedValue !== this.label &&
      this.label !== undefined
    ) {
      this.unsyncedValue = this.label;
      this.syncedValue = this.unsyncedValue;
    }
  }
}
</script>

<style lang="scss">
.s-radio-button {
  color: #666666;
  cursor: default;
  border: 1px solid #d6e1e5;
  background-color: white;
  display: inline-flex;
  align-items: center;
  margin: 0;

  &:not(.status-disabled) {
    &.status-checked {
      color: #ffffff;
      background-color: #549fff;
    }

    &:not(.status-checked) {
      cursor: pointer;

      &:hover {
        color: #549fff;
      }
    }
  }

  &.status-disabled {
    color: #aaaaaa;
    cursor: not-allowed;
    border-color: rgba($color: #d6e1e5, $alpha: 0.5);

    &.status-checked {
      color: white;
      background-color: rgba($color: #549fff, $alpha: 0.5);
    }
  }

  &.size-mini {
    height: 24px;
    min-width: 24px;
    padding: 0 10px;
    font-size: 12px;

    &:first-of-type {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    &:last-of-type {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }

  &.size-small {
    height: 30px;
    min-width: 30px;
    padding: 0 10px;
    font-size: 14px;
  }

  &.size-medium {
    height: 34px;
    min-width: 34px;
    padding: 0 15px;
    font-size: 14px;
  }

  &.size-large {
    height: 40px;
    min-width: 40px;
    padding: 0 18px;
    font-size: 16px;

    &:first-of-type {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-of-type {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:nth-of-type(n + 2) {
    border-left: none;
  }

  &:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
