<!--
 * @Author: Quarter
 * @Date: 2021-06-23 11:36:03
 * @LastEditTime: 2022-12-14 15:37:46
 * @LastEditors: Quarter
 * @Description: 单选按钮组件
 * @FilePath: /simple-ui/packages/radio/src/radio-button.vue
-->
<template>
  <button class="s-radio-button" :class="customClass" @click="handleCheck">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass, CommonSize } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import { RadioValue } from "./types";

@Component({
  name: "SRadioButton",
})
export default class RadioButton extends Emitter {
  // 选中的值
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  readonly value!: RadioValue;

  // 当前单选框的值
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  readonly label!: RadioValue;

  // 尺寸大小
  @Prop(String)
  readonly size?: CommonSize;

  // 是否禁用
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean;

  // 不同步的值
  unsyncedValue: RadioValue = null;

  /**
   * @description: 选中的值
   * @return {RadioValue}
   */
  get syncedValue(): RadioValue {
    return this.value;
  }

  /**
   * @description: 选中的值
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
   * @return {Boolean}
   */
  get checked(): boolean {
    return this.unsyncedValue === this.label;
  }

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "s-radio-button--checked": this.checked === true,
      "s-radio-button--disabled": this.disabled === true,
    };
    Reflect.set(classNames, `s-radio-button--size-${this.filterSize}`, true);
    return classNames;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    if (this.unsyncedValue !== this.syncedValue) {
      this.unsyncedValue = this.syncedValue;
    }
  }

  /**
   * @description: 监听选中值的改变
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
   * @return
   */
  handleCheck(): void {
    if (this.disabled === false && this.unsyncedValue !== this.label && this.label !== undefined) {
      this.unsyncedValue = this.label;
      this.syncedValue = this.unsyncedValue;
    }
  }
}
</script>

<style lang="scss">
.s-radio-button {
  color: var(--s-text-primary);
  cursor: pointer;
  border: 1px solid var(--s-border-color);
  background-color: var(--s-background-primary);
  display: inline-flex;
  align-items: center;
  margin: 0;

  &:hover {
    color: var(--s-brand-hover);
  }

  &:nth-of-type(n + 2) {
    border-left: none;
  }

  &:first-of-type {
    border-radius: var(--s-border-radius) 0 0 var(--s-border-radius);
  }

  &:last-of-type {
    border-radius: 0 var(--s-border-radius) var(--s-border-radius) 0;
  }
}

.s-radio-button--checked {
  color: var(--s-text-white);
  cursor: default;
  background-color: var(--s-brand-normal);

  &:hover {
    color: var(--s-text-white);
  }
}

.s-radio-button--disabled {
  color: var(--s-text-disabled);
  cursor: not-allowed;

  &:hover {
    color: var(--s-text-disabled);
  }

  &.s-radio-button--checked {
    color: white;
    background-color: var(--s-brand-disabled);
  }
}

.s-radio-button--size-mini {
  height: 2.6rem;
  min-width: 2.6rem;
  padding: 0 var(--s-spacing-8);
  font-size: 1.2rem;
}

.s-radio-button--size-small {
  height: 2.8rem;
  min-width: 2.8rem;
  padding: 0 var(--s-spacing-8);
  font-size: 1.4rem;
}

.s-radio-button--size-medium {
  height: 3.2rem;
  min-width: 3.2rem;
  padding: 0 var(--s-spacing-12);
  font-size: 1.4rem;
}

.s-radio-button--size-large {
  height: 3.6rem;
  min-width: 3.6rem;
  padding: 0 var(--s-spacing-16);
  font-size: 1.6rem;
}
</style>
