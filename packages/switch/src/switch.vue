<!--
 * @Author: Quarter
 * @Date: 2021-02-24 08:51:55
 * @LastEditTime: 2022-12-14 16:23:16
 * @LastEditors: Quarter
 * @Description: 简易的切换开关
 * @FilePath: /simple-ui/packages/switch/src/switch.vue
-->
<template>
  <div class="s-switch" :class="customClass" :style="customStyle" @click="switchButton">
    <div class="s-switch__button">{{ switchLabel }}</div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { CustomClass, CustomStyle, CommonSize } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SSwitch",
})
export default class Switch extends Emitter {
  // 宽度
  @Prop(String)
  readonly width?: string;

  // 激活的文字
  @Prop(String)
  readonly activeLabel?: string;

  // 激活的颜色
  @Prop(String)
  readonly activeColor?: string;

  // 激活的值
  @Prop({
    type: [String, Number, Boolean],
    default: true,
  })
  readonly activeValue!: string | number | boolean;

  // 未激活的文字
  @Prop(String)
  readonly inactiveLabel?: string;

  // 未激活的颜色
  @Prop(String)
  readonly inactiveColor?: string;

  // 未激活的值
  @Prop({
    type: [String, Number, Boolean],
    default: false,
  })
  readonly inactiveValue!: string | number | boolean;

  // 大小
  @Prop({
    type: String,
    default: "medium",
  })
  readonly size!: CommonSize;

  // 是否矩形
  @Prop({
    type: Boolean,
    default: false,
  })
  square!: boolean;

  // 值
  @Prop({
    type: [String, Number, Boolean],
    default: false,
  })
  readonly value!: string | number | boolean;

  // 比例
  @Prop([Number, String])
  scale?: number | string;

  // 是否禁用
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

  // 是否外部控制
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly control!: boolean;

  // 是否激活
  insideActive = false;

  /**
   * @description: 同步的值
   * @return {string|number|boolean}
   */
  get syncedValue(): string | number | boolean {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @param {string|number|boolean} val 值
   * @return
   */
  set syncedValue(val: string | number | boolean) {
    this.$emit("update:value", val);
  }

  /**
   * @description: 是否可用
   * @return
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 自定义类
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "s-switch--size-mini": this.size === "mini",
      "s-switch--size-small": this.size === "small",
      "s-switch--size-medium": this.size === "medium",
      "s-switch--size-large": this.size === "large",
      "s-switch--active": this.unsyncedValue === true,
      "s-switch--disabled": this.disabled === true,
      "s-switch--readonly": this.readonly === true,
      "s-switch--square": this.square === true,
    };
  }

  /**
   * @description: 自定义样式
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
    const numberRegExp = new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/);
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
   * @return {String}
   */
  get switchLabel(): string {
    if (this.unsyncedValue) {
      return this.filterActiveLabel;
    }
    return this.filterInactiveLabel;
  }

  /**
   * @description: 设置未同步值
   * @return {Boolean}
   */
  get unsyncedValue(): boolean {
    return this.insideActive !== false;
  }

  /**
   * @description: 设置未同步值
   * @param {boolean} val 值
   * @return
   */
  set unsyncedValue(val: boolean) {
    const filterValue: boolean = val !== false;
    const customValue: any = filterValue ? this.filterActiveValue : this.filterInactiveValue;
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
   * @return
   */
  switchButton(): void {
    if (this.enabled) {
      if (this.control) {
        this.$emit(
          "change",
          !this.unsyncedValue ? this.filterActiveValue : this.filterInactiveValue,
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
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  background-color: var(--s-background-secondary);
  box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.02) inset;
  transition: padding 0.2s linear;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  margin-right: var(--s-spacing-12);

  .s-switch__button {
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.1);
  }
}

.s-switch__button {
  height: 100%;
  color: var(--s-text-white);
  white-space: nowrap;
  background-color: var(--s-background-disabled);
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.s-switch--active .s-switch__button {
  background-color: var(--s-brand-normal);
  left: 0;
}

.s-switch--disabled {
  cursor: not-allowed;

  .s-switch__wrapper {
    opacity: 0.5;
  }
}

.s-switch--readonly:not(.s-switch--disabled) {
  cursor: default;
}

.s-switch--square {
  border-radius: var(-s-border-radius);
}

.s-switch--size-mini {
  height: 2.4rem;
  font-size: 1.2rem;
  padding: 0.2rem 0.2rem 0.2rem 1.4rem;
  border-radius: 1.2rem;

  .s-switch__button {
    min-width: 2rem;
    padding: 0 0.5rem;
    border-radius: 1rem;
  }

  &.s-switch--active {
    padding: 0.2rem 1.4rem 0.2rem 0.2rem;
  }
}

.s-switch--size-small {
  height: 3rem;
  padding: 0.3rem 0.3rem 0.3rem 1.8rem;
  font-size: 1.4rem;
  border-radius: 1.5rem;

  .s-switch__button {
    min-width: 2.4rem;
    padding: 0 0.6rem;
    border-radius: 1.2rem;
  }

  &.s-switch--active {
    padding: 0.3rem 1.8rem 0.3rem 0.3rem;
  }
}

.s-switch--size-medium {
  height: 3.4rem;
  padding: 0.3rem 0.3rem 0.3rem 2rem;
  font-size: 1.6rem;
  border-radius: 1.7rem;

  .s-switch__button {
    min-width: 2.8rem;
    padding: 0 0.8rem;
    border-radius: 1.4rem;
  }

  &.s-switch--active {
    padding: 0.3rem 2rem 0.3rem 0.3rem;
  }
}

.s-switch--size-large {
  height: 3.8rem;
  padding: 0.4rem 0.4rem 0.4rem 2.3rem;
  font-size: 1.6rem;
  border-radius: 1.9rem;

  .s-switch__button {
    min-width: 3rem;
    padding: 0 0.8rem;
    border-radius: 1.5rem;
  }

  &.s-switch--active {
    padding: 0.4rem 2.3rem 0.4rem 0.4rem;
  }
}
</style>
