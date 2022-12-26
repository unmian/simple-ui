<!--
 * @Author: Quarter
 * @Date: 2021-06-23 11:35:52
 * @LastEditTime: 2022-12-14 15:46:31
 * @LastEditors: Quarter
 * @Description: 复选框按钮
 * @FilePath: /simple-ui/packages/checkbox/src/checkbox-button.vue
-->
<template>
  <button class="s-checkbox-button" :class="customClass" @click="handleCheck">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass, CommonSize } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import { CheckboxValue } from "./types";

@Component({
  name: "SCheckboxButton",
})
export default class CheckboxButton extends Emitter {
  // 复选框的值
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  readonly label!: CheckboxValue;

  // 尺寸大小
  @Prop(String)
  readonly size?: CommonSize;

  // 单个使用的时候是否选中
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly checked!: boolean;

  // 是否禁用点击事件
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean;

  // 是否只读
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly readonly!: boolean;

  // 是否受控
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly alone!: boolean;

  // 被选中状态
  checkStatus = false;
  // 复选框组的值
  CheckboxValue: CheckboxValue[] = [];

  /**
   * @description: 单个使用的时候是否选中
   * @return {boolean}
   */
  get syncedChecked(): boolean {
    return this.checked;
  }

  /**
   * @description: 单个使用的时候是否选中
   * @param {boolean} val 值
   * @return
   */
  set syncedChecked(val: boolean) {
    this.$emit("update:checked", val);
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
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classNames: CustomClass = {
      "s-checkbox-button--checked": this.checkStatus === true,
      "s-checkbox-button--disabled": this.disabled === true,
      "s-checkbox-button--readonly": this.readonly === true,
    };
    Reflect.set(classNames, `s-checkbox-button--size-${this.filterSize}`, true);
    return classNames;
  }

  /**
   * @description: 生命周期函数
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
      this.dispatch("SCheckboxGroup", "s-checkbox-register", [this.registerCheckbox]);
    }
  }

  /**
   * @description: 监听选中变化
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
   * @param {type} newValue 改变的值
   * @return
   */
  @Watch("CheckboxValue", {
    immediate: true,
  })
  handleCheckboxValueChange(newValue?: CheckboxValue[]): void {
    if (Array.isArray(newValue) && this.alone === false) {
      if (typeof this.label === "string" || typeof this.label === "number" || this.label === null) {
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
   * @param {Array<CheckboxValue>} value 选中的值
   * @return
   */
  registerCheckbox(value?: CheckboxValue[]): void {
    if (Array.isArray(value)) {
      this.CheckboxValue = value;
      if (this.label !== undefined && this.CheckboxValue.indexOf(this.label) > -1) {
        this.syncedChecked = true;
      }
    }
  }

  /**
   * @description: 切换选中状态
   * @return
   */
  handleCheck(event?: MouseEvent | boolean): void {
    if (this.disabled || this.readonly) {
      return;
    }
    const checkStatus = !this.checkStatus;
    this.syncedChecked = checkStatus;
    this.$emit("change", checkStatus, this.label);
    if (event !== false) {
      if (checkStatus) {
        this.$emit("handleCheck", this.label);
      } else {
        this.$emit("uncheck", this.label);
      }
    }
    if (this.alone === false) {
      if (
        this.label !== undefined &&
        (this.label === null || typeof this.label === "string" || typeof this.label === "number")
      ) {
        if (checkStatus === true) {
          this.dispatch("SCheckboxGroup", "s-checkbox-checked", [this.label]);
        } else {
          this.dispatch("SCheckboxGroup", "s-checkbox-dischecked", [this.label]);
        }
      }
      this.checkStatus = checkStatus;
    }
  }
}
</script>

<style lang="scss">
.s-checkbox-button {
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

.s-checkbox-button--checked {
  color: var(--s-text-white);
  cursor: default;
  background-color: var(--s-brand-normal);

  &:hover {
    color: var(--s-text-white);
  }
}

.s-checkbox-button--disabled {
  color: var(--s-text-disabled);
  cursor: not-allowed;

  &:hover {
    color: var(--s-text-disabled);
  }

  &.s-checkbox-button--checked {
    color: var(--s-text-white);
    background-color: var(--s-brand-disabled);

    &:hover {
      color: var(--s-text-white);
    }
  }
}

.s-checkbox-button--readonly:not(.s-checkbox-button--disabled) {
  cursor: default;

  &:hover {
    color: var(--s-text-primary);
  }

  &.s-checkbox-button--checked:hover {
    color: var(--s-text-white);
  }
}

.s-checkbox-button--size-mini {
  height: 2.6rem;
  min-width: 2.6rem;
  padding: 0 var(--s-spacing-8);
  font-size: 1.2rem;
}

.s-checkbox-button--size-small {
  height: 2.8rem;
  min-width: 2.8rem;
  padding: 0 var(--s-spacing-8);
  font-size: 1.4rem;
}

.s-checkbox-button--size-medium {
  height: 3.2rem;
  min-width: 3.2rem;
  padding: 0 var(--s-spacing-12);
  font-size: 1.4rem;
}

.s-checkbox-button--size-large {
  height: 3.6rem;
  min-width: 3.6rem;
  padding: 0 var(--s-spacing-16);
  font-size: 1.6rem;
}
</style>
