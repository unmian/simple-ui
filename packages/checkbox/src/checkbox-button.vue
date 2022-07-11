<!--
 * @Author: Quarter
 * @Date: 2021-06-23 11:35:52
 * @LastEditTime: 2022-06-07 17:34:34
 * @LastEditors: Quarter
 * @Description: 复选框按钮
 * @FilePath: /simple-ui/packages/checkbox/src/checkbox-button.vue
-->
<template>
  <button class="s-checkbox-button" :class="customClass" @click="check">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass, CommonSize } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { CheckboxValue } from "./types";

@Component({
  name: "SCheckboxButton",
})
export default class SCheckboxButton extends Mixins(Emitter) {
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  label!: CheckboxValue; // 复选框的值

  @Prop(String)
  size?: CommonSize; // 尺寸大小

  @Prop({
    type: Boolean,
    default: false,
  })
  checked!: boolean; // 单个使用的时候是否选中

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean; // 是否禁用点击事件

  @Prop({
    type: Boolean,
    default: false,
  })
  alone!: boolean; // 是否受控

  checkStatus = false; // 被选中状态
  CheckboxValue: CheckboxValue[] = []; // 复选框组的值

  /**
   * @description: 单个使用的时候是否选中
   * @author: Quarter
   * @return {boolean}
   */
  get syncedChecked(): boolean {
    return this.checked;
  }

  /**
   * @description: 单个使用的时候是否选中
   * @author: Quarter
   * @param {boolean} val 值
   * @return
   */
  set syncedChecked(val: boolean) {
    this.$emit("update:checked", val);
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
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "status-checked": this.checkStatus === true,
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
    if (
      this.CheckboxValue !== undefined &&
      typeof this.syncedChecked === "boolean" &&
      this.checkStatus !== this.syncedChecked
    ) {
      this.checkStatus = this.syncedChecked;
    }
    if (this.alone === false) {
      this.$on("s-checkbox-changed", (value?: CheckboxValue[]) => {
        if (Array.isArray(value)) {
          this.CheckboxValue = value;
        }
      });
      this.dispatch("SCheckboxGroup", "s-checkbox-register", [
        this.registerCheckbox,
      ]);
    }
  }

  /**
   * @description: 监听选中变化
   * @author: Quarter
   * @param {Boolean} newValue 变化的值
   * @return
   */
  @Watch("checked")
  handleCheckedChange(newValue: boolean): void {
    if (typeof newValue === "boolean" && this.checkStatus !== newValue) {
      this.checkStatus = newValue;
    }
  }

  /**
   * @description: 更新复选框状态
   * @author: Quarter
   * @param {type} newValue 改变的值
   * @return
   */
  @Watch("CheckboxValue", {
    immediate: true,
  })
  handleCheckboxValueChange(newValue?: CheckboxValue[]): void {
    if (Array.isArray(newValue) && this.alone === false) {
      if (
        typeof this.label === "string" ||
        typeof this.label === "number" ||
        this.label === null
      ) {
        if (newValue.indexOf(this.label) === -1) {
          this.checkStatus = false;
        } else {
          this.checkStatus = true;
        }
      }
    }
  }

  /**
   * @description: 注册复选框组
   * @author: Quarter
   * @param {Array<CheckboxValue>} value 选中的值
   * @return
   */
  registerCheckbox(value?: CheckboxValue[]): void {
    if (Array.isArray(value)) {
      this.CheckboxValue = value;
      if (
        this.label !== undefined &&
        this.CheckboxValue.indexOf(this.label) > -1
      ) {
        this.syncedChecked = true;
      }
    }
  }

  /**
   * @description: 切换选中状态
   * @author: Quarter
   * @return
   */
  check(event?: MouseEvent | boolean): void {
    if (this.disabled !== true) {
      const checkStatus: boolean = !this.checkStatus;
      this.syncedChecked = checkStatus;
      this.$emit("change", checkStatus, this.label);
      if (event !== false) {
        if (checkStatus) {
          this.$emit("check", this.label);
        } else {
          this.$emit("uncheck", this.label);
        }
      }
      if (this.alone === false) {
        if (
          this.label !== undefined &&
          (this.label === null ||
            typeof this.label === "string" ||
            typeof this.label === "number")
        ) {
          if (checkStatus === true) {
            this.dispatch("SCheckboxGroup", "s-checkbox-checked", [this.label]);
          } else {
            this.dispatch("SCheckboxGroup", "s-checkbox-dischecked", [
              this.label,
            ]);
          }
        }
        this.checkStatus = checkStatus;
      }
    }
  }
}
</script>

<style lang="scss">
.s-checkbox-button {
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
      border-radius: 3px 0 0 3px;
    }

    &:last-of-type {
      border-radius: 0 3px 3px 0;
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
      border-radius: 5px 0 0 5px;
    }

    &:last-of-type {
      border-radius: 0 5px 5px 0;
    }
  }

  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }

  &:nth-of-type(n + 2) {
    border-left: none;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }
}
</style>
