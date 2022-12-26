<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-15 18:07:36
 * @LastEditors: Quarter
 * @Description: 简易的输入框组件
 * @FilePath: /simple-ui/packages/input/src/input.vue
-->
<template>
  <div
    class="s-input"
    :class="{
      's-input--focused': isFocused,
      's-input--clearable': canClear,
      's-input--disabled': disabled === true,
      's-input--readonly': readonly === true,
    }"
    :style="{
      width,
      height,
    }"
  >
    <div ref="prefix" v-if="hasPrefix" class="s-input__prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="s-input__content">
      <div v-if="hasIcon" ref="icon" class="s-input__icon">
        <slot name="icon"></slot>
      </div>
      <div class="s-input__container">
        <div v-if="placeholderVisible" class="s-input__placeholder">
          {{ readonly ? readonlyPlaceholder : placeholder }}
        </div>
        <input
          v-model="unsyncedValue"
          ref="input"
          :type="inputType"
          :maxlength="maxlength"
          :autocomplete="autocomplete"
          :disabled="!enabled"
          @focus.stop="focusInput"
          @blur.stop="blurInput"
          @keydown.stop="exposeEvent($event, 'keydown')"
          @keyup.stop="exposeEvent($event, 'keyup')"
          @keypress.stop="exposeEvent($event, 'keypress')"
        />
      </div>
      <div v-if="counterEnable" ref="counter" class="s-input__counter">
        {{ counterStr }}
      </div>
      <div v-if="clearable" v-show="canClear" class="s-input__clear" @click.stop="handleClear">
        <icon name="close-circle"></icon>
      </div>
    </div>
    <div ref="suffix" v-if="hasSuffix" class="s-input__suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { ANIMATION_INDEX_DB } from "packages/constants";
import { UUID } from "packages/util";
import { Emitter } from "packages/mixins";
import { AnimationIndex } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import { InputValue } from "./types";

@Component({
  name: "SInput",
  components: {
    Icon,
  },
})
export default class Input extends Emitter {
  // 输入框的值
  @Prop({
    type: [String, Number],
    default: null,
  })
  readonly value?: string | number | null;

  // 输入框宽度
  @Prop({
    type: String,
    default: "16rem",
  })
  readonly width?: string;

  // 输入框高度
  @Prop({
    type: String,
    default: "3.4rem",
  })
  readonly height?: string;

  // 文本框类型
  @Prop(String)
  readonly type?: string;

  // 文本框提示文本
  @Prop(String)
  readonly placeholder?: string;

  // 只读下的文本框提示文本
  @Prop(String)
  readonly readonlyPlaceholder?: string;

  // 自动填充
  @Prop(String)
  readonly autocomplete?: string;

  // 最大输入大小
  @Prop(Number)
  readonly maxlength?: number;

  // 是否显示计数器
  @Prop({
    type: Boolean,
    default: true,
  })
  readonly showCounter?: boolean;

  // 是否禁用
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled?: boolean;

  // 是否只读
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly readonly?: boolean;

  // 是否可以清空
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly clearable?: boolean;

  // 强制可以清空
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly forceClear?: boolean;

  key = UUID(); // 帧运算
  unsyncedValue = ""; // 不同步的值
  isFocused = false; // 是否获取焦点
  prefixWidth = 0; // 前缀宽度值
  suffixWidth = 0; // 后缀宽度值
  iconWidth = 0; // 图标宽度值
  counterWidth = 0; // 计数器宽度值
  eleObserver: null | ResizeObserver = null; // 大小观察器

  /**
   * @description: 输入框的值
   * @return {string}
   */
  get syncedValue(): string {
    if (undefined !== this.value && this.value !== null) {
      return this.value.toString();
    }
    return "";
  }

  /**
   * @description: 输入框的值
   * @param {InputValue} val 值
   * @return
   */
  set syncedValue(val: InputValue) {
    this.$emit("update:value", val);
    this.$emit("input", val);
    this.$emit("change", val);
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 是否启用
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 文本框类型
   * @return {String}
   */
  get inputType(): string {
    if (this.type === "text" || this.type === "password") {
      return this.type;
    }
    return "text";
  }

  /**
   * @description: 是否显示提示内容
   * @return {Boolean}
   */
  get placeholderVisible(): boolean {
    return this.unsyncedValue === "";
  }

  /**
   * @description: 是否启用计数器
   * @return {Boolean}
   */
  get counterEnable(): boolean {
    return typeof this.maxlength === "number" && this.showCounter === true;
  }

  /**
   * @description: 计数器内容
   * @return {String}
   */
  get counterStr(): string {
    this.counterWidth =
      this.$refs.counter instanceof Element ? this.$refs.counter.getBoundingClientRect().width : 0;
    return `${this.unsyncedValue.length}/${this.maxlength}`;
  }

  /**
   * @description: 是否存在前缀内容
   * @return {Boolean}
   */
  get hasPrefix(): boolean {
    return this.$slots.prefix !== undefined;
  }

  /**
   * @description: 是否存在后缀内容
   * @return {Boolean}
   */
  get hasSuffix(): boolean {
    return this.$slots.suffix !== undefined;
  }

  /**
   * @description: 是否存在图标
   * @return {Boolean}
   */
  get hasIcon(): boolean {
    return this.$slots.icon !== undefined;
  }

  /**
   * @description: 是否显示清除图标
   * @return {Boolean}
   */
  get canClear(): boolean {
    if (this.forceClear) {
      return !!this.clearable && this.unsyncedValue !== "";
    }
    return !!this.clearable && this.enabled && this.unsyncedValue !== "";
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
    this.unsyncedValue = this.syncedValue;
    if (typeof this.maxlength === "number" && this.unsyncedValue.length > this.maxlength) {
      this.unsyncedValue = this.unsyncedValue.slice(0, this.maxlength);
      this.syncedValue = this.unsyncedValue;
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    // this.initObserver();
    // this.calcComponentWidth();
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    if (this.eleObserver) {
      this.eleObserver.disconnect();
    }
  }

  /**
   * @description: 监控传入值的变化
   * @return
   */
  @Watch("value")
  handleValueChange(): void {
    this.unsyncedValue = this.syncedValue;
  }

  /**
   * @description: 监听输入框值变化
   * @return
   */
  @Watch("unsyncedValue")
  handleUnsyncedValueChange(): void {
    this.syncedValue = this.unsyncedValue;
  }

  /**
   * @description: 初始化观察器
   * @return
   */
  initObserver(): void {
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    db[this.key] = requestAnimationFrame(this.calcComponentWidth);
    this.eleObserver = new ResizeObserver(() => {
      this.calcComponentWidth();
    });
    if (this.$refs.prefix instanceof HTMLDivElement) {
      this.eleObserver.observe(this.$refs.prefix);
    }
    if (this.$refs.icon instanceof HTMLDivElement) {
      this.eleObserver.observe(this.$refs.icon);
    }
    /* if (this.$refs.counter instanceof HTMLDivElement) {
      this.eleObserver.observe(this.$refs.counter);
    } */
    if (this.$refs.suffix instanceof HTMLDivElement) {
      this.eleObserver.observe(this.$refs.suffix);
    }
  }

  /**
   * @description: 输入框获取焦点
   * @return
   */
  focusInput(): void {
    this.isFocused = true;
    this.$emit("focus", this.unsyncedValue);
    this.dispatch("SFormItem", "s-form-validate", ["focus"]);
  }

  /**
   * @description: 输入框失去焦点
   * @return
   */
  blurInput(): void {
    this.isFocused = false;
    this.$emit("blur", this.unsyncedValue);
    this.dispatch("SFormItem", "s-form-validate", ["blur"]);
  }

  /**
   * @description: 监听输入框值变化
   * @return
   */
  calcComponentWidth(): void {
    this.prefixWidth =
      this.$refs.prefix instanceof Element ? this.$refs.prefix.getBoundingClientRect().width : 0;
    this.suffixWidth =
      this.$refs.suffix instanceof Element ? this.$refs.suffix.getBoundingClientRect().width : 0;
    this.iconWidth =
      this.$refs.icon instanceof Element ? this.$refs.icon.getBoundingClientRect().width : 0;
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    db[this.key] = requestAnimationFrame(this.calcComponentWidth);
  }

  /**
   * @description: 暴露事件
   * @return
   */
  exposeEvent(event: Event, eventName: string): void {
    if (typeof eventName === "string") {
      this.$emit(eventName, event, this.unsyncedValue);
      this.dispatch("SFormItem", "s-form-validate", [eventName]);
    }
  }

  /**
   * @description: 清除输入框
   * @return
   */
  handleClear(): void {
    this.unsyncedValue = "";
    this.$emit("clear", this.unsyncedValue);
  }
}
</script>

<style lang="scss">
.s-input {
  font-size: 14px;
  color: var(--s-text-primary);
  cursor: default;
  box-sizing: border-box;
  border-color: var(--s-border-color);
  border-radius: var(--s-bborder-radius);
  background-color: var(--s-background-primary);
  overflow: hidden;
  display: inline-flex;
  flex-wrap: wrap;

  > div:first-of-type {
    border-top-left-radius: var(--s-border-radius);
    border-bottom-left-radius: var(--s-border-radius);
  }

  > div:last-of-type {
    border-top-right-radius: var(--s-border-radius);
    border-bottom-right-radius: var(--s-border-radius);
  }

  .s-input__prefix,
  .s-input__suffix {
    height: 100%;
    color: var(--s-text-secondary);
    border: 1px solid;
    border-color: inherit;
    box-sizing: border-box;
    background-color: var(--s-background-secondary);
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .s-input__prefix {
    padding: var(--s-spacing-4) var(--s-spacing-8) var(--s-spacing-4) var(--s-spacing-12);
    border-right: none;
  }

  .s-input__suffix {
    padding: var(--s-spacing-4) var(--s-spacing-12) var(--s-spacing-4) var(--s-spacing-8);
    border-left: none;
  }

  .s-input__content {
    height: 100%;
    flex: 1;
    border: 1px solid;
    border-color: inherit;
    box-sizing: border-box;
    transition: border 0.2s ease;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    &:hover {
      border-color: var(--s-brand-hover);

      .s-input__clear {
        opacity: 1;
      }
    }
  }

  .s-input__icon {
    padding-left: var(--s-spacing-12);
    color: var(--s-text-placeholder);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s-input__container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .s-input__placeholder {
    width: 100%;
    height: 100%;
    padding: 0 var(--s-spacing-12);
    color: var(--s-text-placeholder);
    font-size: inherit;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  input {
    width: var(--input-width, 100%);
    height: 100%;
    padding: 0 var(--s-spacing-12);
    color: inherit;
    font-size: inherit;
    text-align: inherit;
    border: none;
    outline-color: rgba($color: #000000, $alpha: 0);
    background: none;
    box-sizing: border-box;
    display: block;
    position: relative;
  }

  .s-input__counter {
    padding: 0 var(--s-spacing-8);
    color: var(--s-text-placeholder);
    font-size: 1.2rem;
    user-select: none;
  }

  .s-input__clear {
    padding: 0 var(--s-spacing-8);
    height: 100%;
    color: var(--s-text-placeholder);
    font-size: 1.6rem;
    cursor: pointer;
    background-color: var(--s-background-primary);
    opacity: 0;
    display: inline-flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;

    &:hover {
      color: var(--s-brand-hover);
    }
  }

  &:not(:last-child) {
    margin-right: var(--s-spacing-12);
  }
}

.s-input--focused:not(.s-input--disabled) .s-input__content,
.s-input--focused:not(.s-input--disabled) .s-input__content:hover {
  border-color: var(--s-brand-normal);

  .s-input__icon {
    color: var(--s-text-primary);
  }
}

.s-input--disabled {
  color: var(--s-text-disabled);
  cursor: not-allowed !important;

  .s-input__content {
    background-color: var(--s-background-disabled);

    input {
      cursor: not-allowed !important;
    }

    &:hover {
      border-color: var(--s-border-color);
    }
  }

  .s-input__icon {
    color: var(--s-text-disabled);
  }
}

.s-input--readonly:not(.s-input--disabled) {
  cursor: default;

  input,
  .s-input__placeholder {
    cursor: default;
  }

  .s-input__content {
    &:hover {
      border-color: var(--s-border-color);
    }

    .s-input__counter {
      display: none;
    }
  }
}

.s-input--clearable .s-input__content:hover .s-input__counter {
  opacity: 0;
}
</style>
