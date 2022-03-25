<!--
 * @Author: Quarter
 * @Date: 2020-07-23 19:37:57
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:41:15
 * @Description: 简易的输入框
--> 
<template>
  <div class="simple-input" :class="customClass" :style="customStyle">
    <div ref="prefix" v-if="hasPrefix" class="input-prefix">
      <slot name="prefix"></slot>
    </div>
    <div class="input-content">
      <div v-if="placeholderVisible" class="input-placeholder">{{ placeholder }}</div>
      <div v-if="hasIcon" ref="icon" class="input-icon">
        <slot name="icon"></slot>
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
      <div v-if="counterEnable" ref="counter" class="input-counter">{{ counterStr }}</div>
      <div v-if="clearable" v-show="canClear" class="input-clear" @click.stop="clearInput">
        <i class="simple-icon-circle-close"></i>
      </div>
    </div>
    <div ref="suffix" v-if="hasSuffix" class="input-suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import {
  AnimationIndex,
  SimpleCustomClass,
  SimpleCustomStyle,
  SimpleInputValue,
} from "../types";
import { generateUUID } from "../expand/tool";
import { ANIMATION_INDEX_DB } from "../constants";

export default Emitter.extend({
  name: "SimpleInput",
  props: {
    value: { // 输入框的值
      type: String,
      default: null,
    },
    width: String, // 输入框宽度
    height: String, // 输入框高度
    type: String, // 文本框类型
    placeholder: String, // 文本框提示文本
    autocomplete: String, // 自动填充
    maxlength: Number, // 最大输入大小
    showCounter: { // 是否显示计数器
      type: Boolean,
      default: true,
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false,
    },
    readonly: { // 是否只读
      type: Boolean,
      default: false,
    },
    clearable: { // 是否可以清空
      type: Boolean,
      default: false,
    },
    forceClear: { // 强制可以清空
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      key: generateUUID(), // 帧运算
      unsyncedValue: "", // 不同步的值
      isFocused: false, // 是否获取焦点
      prefixWidth: 0, // 前缀宽度值
      suffixWidth: 0, // 后缀宽度值
      iconWidth: 0, // 图标宽度值
      counterWidth: 0, // 计数器宽度值
      eleObserver: null as null | ResizeObserver, // 大小观察器
    };
  },
  computed: {
    /**
     * @description: 输入框的值
     * @author: Quarter
     * @return {SimpleInputValue}
     */
    middleValue: {
      get(): SimpleInputValue {
        return this.value;
      },
      set(val: SimpleInputValue): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      },
    },
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {String}
     */
    syncedValue: {
      get(): string {
        if (this.middleValue !== undefined && this.middleValue !== null) {
          return this.middleValue.toString();
        }
        return "";
      },
      set(value: string): void {
        if (this.middleValue !== value) {
          this.middleValue = value;
          this.$emit("change", value);
          this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
        }
      },
    },
    /**
     * @description: 是否启用
     * @author: Quarter
     * @return {Boolean}
     */
    enabled(): boolean {
      return this.disabled !== true && this.readonly !== true;
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "status-focused": this.isFocused,
        "status-disabled": this.disabled === true,
        "status-readonly": this.readonly === true,
        "status-clearable": this.canClear === true,
      };
    },
    /**
     * @description: 自定义样式表
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    customStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {};
      if (typeof this.width === "string") {
        styles["--input-container-width"] = this.width;
      }
      if (typeof this.height === "string") {
        styles["--input-container-height"] = this.height;
      }
      styles["--input-content-width"] = `calc(100% - ${this.prefixWidth + this.suffixWidth
        }px)`;
      const counterWidth: number =
        this.$refs.counter instanceof Element
          ? this.$refs.counter.clientWidth
          : 0;
      styles[
        "--input-width"
      ] = `calc(100% - ${this.counterWidth}px - ${this.iconWidth}px)`;
      const input: Element | Vue | Array<Element | Vue> | undefined =
        this.$refs.input;
      if (input instanceof Element) {
        const inputStyle: CSSStyleDeclaration = getComputedStyle(input);
        styles[
          "--input-placeholder-padding"
        ] = `calc(${inputStyle.paddingLeft} + ${this.iconWidth}px)`;
      }
      return styles;
    },
    /**
     * @description: 文本框类型
     * @author: Quarter
     * @return {String}
     */
    inputType(): string {
      if (this.type === "text" || this.type === "password") {
        return this.type;
      }
      return "text";
    },
    /**
     * @description: 是否显示提示内容
     * @author: Quarter
     * @return {Boolean}
     */
    placeholderVisible(): boolean {
      return typeof this.placeholder === "string" && this.unsyncedValue === "";
    },
    /**
     * @description: 是否启用计数器
     * @author: Quarter
     * @return {Boolean}
     */
    counterEnable(): boolean {
      return typeof this.maxlength === "number" && this.showCounter === true;
    },
    /**
     * @description: 计数器内容
     * @author: Quarter
     * @return {String}
     */
    counterStr(): string {
      this.counterWidth =
        this.$refs.counter instanceof Element
          ? this.$refs.counter.getBoundingClientRect().width
          : 0;
      return `${this.unsyncedValue.length}/${this.maxlength}`;
    },
    /**
     * @description: 是否存在前缀内容
     * @author: Quarter
     * @return {Boolean}
     */
    hasPrefix(): boolean {
      return this.$slots.prefix !== undefined;
    },
    /**
     * @description: 是否存在后缀内容
     * @author: Quarter
     * @return {Boolean}
     */
    hasSuffix(): boolean {
      return this.$slots.suffix !== undefined;
    },
    /**
     * @description: 是否存在图标
     * @author: Quarter
     * @return {Boolean}
     */
    hasIcon(): boolean {
      return this.$slots.icon !== undefined;
    },
    /**
     * @description: 是否显示清除图标
     * @author: Quarter
     * @return {Boolean}
     */
    canClear(): boolean {
      if (this.forceClear) {
        return this.clearable && this.unsyncedValue !== "";
      } else {
        return this.clearable && this.enabled && this.unsyncedValue !== "";
      }
    },
  },
  created(): void {
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
    this.unsyncedValue = this.syncedValue;
    if (
      typeof this.maxlength === "number" &&
      this.unsyncedValue.length > this.maxlength
    ) {
      this.unsyncedValue = this.unsyncedValue.slice(0, this.maxlength);
      this.syncedValue = this.unsyncedValue;
    }
  },
  mounted(): void {
    this.initObserver();
    this.calcComponentWidth();
  },
  beforeDestroy(): void {
    if (this.eleObserver) {
      this.eleObserver.disconnect();
    }
  },
  methods: {
    /**
     * @description: 初始化观察器
     * @author: Quarter
     * @return
     */
    initObserver(): void {
      const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
      db[this.key] = requestAnimationFrame(this.calcComponentWidth);
      this.eleObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
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
    },
    /**
     * @description: 输入框获取焦点
     * @author: Quarter
     * @return
     */
    focusInput(): void {
      this.isFocused = true;
      this.$emit("focus", this.unsyncedValue);
      this.dispatch("SimpleFormItem", "simple-form-validate", ["focus"]);
    },
    /**
     * @description: 输入框失去焦点
     * @author: Quarter
     * @return
     */
    blurInput(): void {
      this.isFocused = false;
      this.$emit("blur", this.unsyncedValue);
      this.dispatch("SimpleFormItem", "simple-form-validate", ["blur"]);
    },
    /**
     * @description: 监听输入框值变化
     * @author: Quarter
     * @return
     */
    calcComponentWidth(): void {
      this.prefixWidth =
        this.$refs.prefix instanceof Element
          ? this.$refs.prefix.getBoundingClientRect().width
          : 0;
      this.suffixWidth =
        this.$refs.suffix instanceof Element
          ? this.$refs.suffix.getBoundingClientRect().width
          : 0;
      this.iconWidth =
        this.$refs.icon instanceof Element
          ? this.$refs.icon.getBoundingClientRect().width
          : 0;
      const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
      db[this.key] = requestAnimationFrame(this.calcComponentWidth);
    },
    /**
     * @description: 暴露事件
     * @author: Quarter
     * @return
     */
    exposeEvent(event: Event, eventName: string): void {
      if (typeof eventName === "string") {
        this.$emit(eventName, event, this.unsyncedValue);
        this.dispatch("SimpleFormItem", "simple-form-validate", [eventName]);
      }
    },
    /**
     * @description: 清除输入框
     * @author: Quarter
     * @return
     */
    clearInput(): void {
      this.unsyncedValue = "";
      this.$emit("clear", this.unsyncedValue);
    },
  },
  watch: {
    /**
     * @description: 监控传入值的变化
     * @author: Quarter
     * @param {SimpleInputValue} newValue 更改的值
     * @param {SimpleInputValue} oldValue 原始值
     * @return
     */
    value(newValue: SimpleInputValue,
      oldValue: SimpleInputValue): void {
      this.unsyncedValue = this.syncedValue;
    },
    /**
     * @description: 监听输入框值变化
     * @author: Quarter
     * @return
     */
    unsyncedValue(): void {
      this.syncedValue = this.unsyncedValue;
    },
  },
});
</script>

<style lang="scss">
.simple-input {
  width: var(--input-container-width, 100%);
  height: var(--input-container-height, 36px);
  font-size: 14px;
  border-radius: 4px;
  cursor: default;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
  display: inline-flex;
  flex-wrap: wrap;

  > div:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  > div:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .input-prefix,
  .input-suffix {
    height: 100%;
    padding: 5px 15px;
    color: #909399;
    border: 1px solid #d6e1e5;
    box-sizing: border-box;
    background-color: #f5f7fa;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .input-prefix {
    border-right: none;
  }

  .input-suffix {
    border-left: none;
  }

  .input-content {
    width: var(--input-content-width, 100%);
    height: 100%;
    border: 1px solid #d6e1e5;
    box-sizing: border-box;
    transition: border 0.2s ease;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    .input-placeholder {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      padding-left: var(--input-placeholder-padding, 10px);
      color: #d6e1e5;
      font-size: inherit;
      line-height: var(--input-container-height, 35px);
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
    }

    .input-icon {
      width: 25px;
      padding-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input {
      width: var(--input-width, 100%);
      height: 100%;
      padding: 0 10px;
      color: #333333;
      font-size: inherit;
      text-align: inherit;
      border: none;
      outline-color: rgba($color: #000000, $alpha: 0);
      background: none;
      box-sizing: border-box;
      display: block;
      position: relative;
    }

    .input-counter {
      padding: 0 10px;
      color: #b7c1c5;
      font-size: 12px;
    }

    .input-clear {
      padding: 0 10px;
      height: var(--input-container-height, 35px);
      color: #b7c1c5;
      line-height: var(--input-container-height, 35px);
      background-color: #ffffff;
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;

      &:hover {
        color: #666666;
      }
    }

    &:hover {
      border-color: #b7c1c5;

      .input-clear {
        opacity: 1;
      }
    }
  }

  &:not(.status-disabled).status-focused .input-content,
  &:not(.status-disabled).status-focused .input-content:hover {
    border-color: #549fff;
  }

  &.status-disabled .input-content {
    cursor: not-allowed !important;
    background-color: #f9f9f9;

    input {
      color: #666666;
      cursor: not-allowed !important;
    }

    &:hover {
      border-color: #d6e1e5;
    }
  }

  &:not(.status-disabled).status-readonly {
    cursor: default;

    input,
    .input-placeholder {
      cursor: default;
    }

    .input-content {
      &:hover {
        border-color: #d6e1e5;
      }

      .input-counter {
        display: none;
      }
    }
  }

  &.status-clearable .input-content:hover .input-counter {
    opacity: 0;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
