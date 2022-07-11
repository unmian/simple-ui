<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:51:59
 * @LastEditors: Quarter
 * @Description: 单选按钮组件
 * @FilePath: /simple-ui/packages/radio/src/radio.vue
-->
<template>
  <div class="s-radio" :class="customClass" @click="checkRadio">
    <div class="radio">
      <div class="inactive-view"></div>
      <div class="active-view"></div>
    </div>
    <div v-if="hasSlot" class="radio-label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { type CustomClass } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { RadioValue } from "./types";

@Component({
  name: "SRadio",
})
export default class SRadio extends Mixins(Emitter) {
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  value!: RadioValue; // 值

  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  label!: RadioValue; // 当前单选框的值

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
    this.$emit("input", val);
  }

  /**
   * @description: 是否有插槽内容
   * @author: Quarter
   * @return {Boolean}
   */
  get hasSlot(): boolean {
    return !!this.$slots.default;
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
    return {
      "status-checked": this.checked === true,
      "status-disabled": this.disabled === true,
      "status-readonly": this.readonly === true,
    };
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
   * @return
   */
  @Watch("value")
  handleValueChange(): void {
    if (this.unsyncedValue !== this.syncedValue) {
      this.unsyncedValue = this.syncedValue;
    }
  }

  /**
   * @description: 选中单选框
   * @author: Quarter
   * @return
   */
  checkRadio(): void {
    if (
      this.enabled &&
      this.unsyncedValue !== this.label &&
      this.label !== undefined
    ) {
      this.unsyncedValue = this.label;
      this.syncedValue = this.unsyncedValue;
      this.$emit("input", this.label);
      this.$emit("change", this.label);
      this.dispatch("SFormItem", "s-form-validate", ["change"]);
    }
  }
}
</script>

<style lang="scss">
.s-radio {
  cursor: default;
  display: inline-flex;
  align-items: center;

  .radio {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;

    .inactive-view,
    .active-view {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-sizing: border-box;
      transition: transform 0.2s ease;
      position: absolute;
      top: 0;
      left: 0;
    }

    .inactive-view {
      border: 1px solid #d6e1e5;
    }

    .active-view {
      border: 5px solid #549fff;
      transform: scale(0);
    }
  }

  .radio-label {
    color: #333333;
    font-size: 14px;
    margin-left: 10px;
  }

  &.status-checked .active-view {
    transform: scale(1);
  }

  &.status-disabled {
    cursor: not-allowed;

    .inactive-view {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .active-view {
      border-color: rgba(0, 0, 0, 0.2);
    }
  }

  &:not(.status-disabled).status-readonly {
    cursor: not-allowed;

    .inactive-view {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.status-checked .radio-label {
      color: #549fff;
    }
  }

  &:not(:last-of-type) {
    margin-right: 30px;
  }
}
</style>
