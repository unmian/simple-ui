<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:29:48
 * @LastEditors: Quarter
 * @Description: 复选框组件
 * @FilePath: /simple-ui/packages/checkbox/src/checkbox.vue
-->
<template>
  <div class="s-checkbox" :class="customClass" @click="check">
    <div class="checkbox-icon">
      <div class="inactive-view"></div>
      <div class="active-view">
        <i class="s-icon-check"></i>
      </div>
    </div>
    <div v-if="hasSlot" class="checkbox-text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { CheckboxValue } from "./types";

@Component({
  name: "SCheckbox",
})
export default class SCheckbox extends Mixins(Emitter) {
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  label!: CheckboxValue; // 复选框的值

  @Prop({
    type: Boolean,
    default: false,
  })
  checked!: boolean; // 单个使用的时候是否选中

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled?: boolean; // 是否禁用点击事件

  @Prop({
    type: Boolean,
    default: false,
  })
  alone!: boolean; // 是否受控

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly!: boolean; // 是否只读

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
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "status-checked": this.checkStatus === true,
      "status-disabled": this.disabled === true,
      "status-readonly": this.readonly === true,
    };
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
  @Watch("checked", {
    immediate: true,
  })
  handleCheckedChange(newValue: boolean): void {
    if (typeof newValue === "boolean" && this.checkStatus !== newValue) {
      this.checkStatus = newValue;
    }
  }

  /**
   * @description: 监听值的变化
   * @author: Quarter
   * @return
   */
  @Watch("label", {
    immediate: true,
  })
  handleLabelChange(): void {
    if (Array.isArray(this.CheckboxValue) && this.alone === false) {
      if (
        typeof this.label === "string" ||
        typeof this.label === "number" ||
        this.label === null
      ) {
        if (this.CheckboxValue.indexOf(this.label) === -1) {
          this.checkStatus = false;
        } else {
          this.checkStatus = true;
        }
      }
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
    if (this.enabled) {
      const checkStatus: boolean = !this.checkStatus;
      if (this.alone === false) {
        this.syncedChecked = checkStatus;
        this.$emit("change", checkStatus, this.label);
        if (event !== false) {
          if (checkStatus) {
            this.$emit("check", this.label);
          } else {
            this.$emit("uncheck", this.label);
          }
        }
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
      } else {
        this.$emit("trigger", this.label, this.checkStatus);
      }
    }
  }
}
</script>

<style lang="scss">
.s-checkbox {
  color: #333333;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  .checkbox-icon {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;

    .inactive-view,
    .active-view {
      width: 100%;
      height: 100%;
      font-size: 14px;
      font-weight: bolder;
      border-radius: 2px;
      box-sizing: border-box;
      transition: transform 0.2s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
    }

    .inactive-view {
      border: 1px solid #d6e1e5;
      background-color: #ffffff;
      transform: scale(1);
    }

    .active-view {
      color: #ffffff;
      background-color: #549fff;
      transform: scale(0);
    }
  }

  .checkbox-text {
    color: inherit;
    font-size: inherit;
    margin-left: 10px;
  }

  &.status-checked {
    .active-view {
      transform: scale(1);
    }
  }

  &.status-disabled {
    cursor: not-allowed;

    .inactive-view,
    .active-view {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .active-view {
      color: rgba(0, 0, 0, 0.3);
    }
  }

  &:not(.status-disabled).status-readonly {
    cursor: not-allowed;

    &.status-checked .checkbox-text {
      color: #549fff;
    }

    .inactive-view {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &:not(:last-of-type) {
    margin-right: 30px;
  }
}
</style>
