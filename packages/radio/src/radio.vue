<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-14 15:37:41
 * @LastEditors: Quarter
 * @Description: 单选按钮组件
 * @FilePath: /simple-ui/packages/radio/src/radio.vue
-->
<template>
  <div
    class="s-radio"
    :class="{
      's-radio--checked': checked,
      's-radio--disabled': disabled,
      's-radio--readonly': readonly,
    }"
    @click="handleCheck"
  >
    <div class="s-radio__symbol">
      <div class="s-radio__inactive-symbol"></div>
      <div class="s-radio__active-symbol"></div>
    </div>
    <div v-if="hasSlot" class="s-radio__label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { Component, Prop, Watch } from "vue-property-decorator";
import { RadioValue } from "./types";

@Component({
  name: "SRadio",
})
export default class Radio extends Emitter {
  // 值
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
    this.$emit("input", val);
  }

  /**
   * @description: 是否有插槽内容
   * @return {Boolean}
   */
  get hasSlot(): boolean {
    return !!this.$slots.default;
  }

  /**
   * @description: 是否可用
   * @return
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 当前是否选中
   * @return {Boolean}
   */
  get checked(): boolean {
    return this.unsyncedValue === this.label;
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
   * @return
   */
  handleCheck(): void {
    if (this.enabled && this.unsyncedValue !== this.label && this.label !== undefined) {
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
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: var(--s-spacing-16);
}

.s-radio__symbol {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: var(--s-background-primary);
  position: relative;
}

.s-radio__inactive-symbol,
.s-radio__active-symbol {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  transition: transform 0.2s ease;
  position: absolute;
  top: 0;
  left: 0;
}

.s-radio__inactive-symbol {
  border: 1px solid var(--s-border-color);
}

.s-radio__active-symbol {
  border: 0.4rem solid var(--s-brand-normal);
  transform: scale(0);
}

.s-radio__label {
  color: var(--s-text-priamry);
  font-size: 1.4rem;
  margin-left: var(--s-spacing-12);
}

.s-radio--checked {
  cursor: default;

  .s-radio__active-symbol {
    transform: scale(1);
  }

  .s-radio__label {
    color: var(--s-brand-normal);
  }
}

.s-radio--disabled {
  cursor: not-allowed;

  .s-radio__inactive-symbol {
    background-color: var(--s-background-disabled);
  }

  .s-radio__active-symbol {
    border-color: var(--s-brand-disabled);
  }

  .s-radio__label {
    color: var(--s-text-disabled);
  }

  &.s-radio--checked .s-radio__label {
    color: var(--s-brand-disabled);
  }
}

.s-radio--readonly:not(.s-radio--disabled) {
  cursor: default;

  .s-radio__inactive-symbol {
    background-color: var(--s-background-secondary);
  }
}
</style>
