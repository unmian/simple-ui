<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-05 11:26:47
 * @LastEditors: Quarter
 * @Description: 简易的文本域
 * @FilePath: /simple-ui/packages/textarea/src/textarea.vue
-->
<template>
  <div class="s-textarea" :class="customClass" :style="customStyle">
    <div class="textarea-content">
      <div v-if="placeholderVisible" class="textarea-placeholder">
        <template v-for="(item, index) of placeholderArr">
          {{ item }}
          <br v-if="index + 1 !== placeholderArr.length" :key="`placeholder-item-${index}`" />
        </template>
      </div>
      <div v-if="counterEnable" ref="counter" class="input-counter">
        {{ counterStr }}
      </div>
      <textarea
        v-model="unsyncedValue"
        :cols="realCols"
        :rows="rows"
        :maxlength="maxlength"
        :disabled="!enabled"
        @focus="focus"
        @blur="blur"
        @keydown.stop="exposeEvent($event, 'keydown')"
        @keyup.stop="exposeEvent($event, 'keyup')"
        @keypress.stop="exposeEvent($event, 'keypress')"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { InputValue } from "packages/input";
import { Emitter } from "packages/mixins";
import { CustomClass, CustomStyle } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "STextarea",
})
export default class STextarea extends Mixins(Emitter) {
  @Prop({
    type: String,
    default: null,
  })
  value!: string | null; // 值

  @Prop(String)
  width?: string; // 宽度

  @Prop([String, Number])
  cols?: string | number; // 列数

  @Prop([String, Number])
  rows?: string | number; // 行数

  @Prop(Number)
  maxlength?: number; // 最大字数

  @Prop(String)
  placeholder?: string; // 文本提示

  @Prop({
    type: Boolean,
    default: true,
  })
  showCounter!: boolean; // 是否显示计数器

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

  unsyncedValue = ""; // 不同步的文本内容
  isFocused = false; // 是否获取到焦点

  /**
   * @description: 值
   * @author: Quarter
   * @return {InputValue}
   */
  get middleValue(): InputValue {
    return this.value;
  }

  /**
   * @description: 值
   * @author: Quarter
   * @param {InputValue} val 值
   * @return
   */
  set middleValue(val: InputValue) {
    this.$emit("update:value", val);
    this.$emit("input", val);
    this.$emit("change", val);
  }

  /**
   * @description: 是否可用
   * @author: Quarter
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 自定义样式表
   * @author: Quarter
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    const styles: CustomStyle = {};
    if (typeof this.width === "string") {
      styles["--textarea-container-width"] = this.width;
      styles["--textarea-width"] = `calc(${this.width} - 2px)`;
    }
    return styles;
  }

  /**
   * @description: 提示文本数组
   * @author: Quarter
   * @return {Array<String>}
   */
  get placeholderArr(): string[] {
    if (this.placeholderVisible && typeof this.placeholder === "string") {
      return this.placeholder.split("\\n");
    }
    return new Array();
  }

  /**
   * @description: 同步的值
   * @author: Quarter
   * @return {String}
   */
  get syncedValue(): string {
    if (this.middleValue !== undefined && this.middleValue !== null) {
      return this.middleValue.toString();
    }
    return "";
  }

  /**
   * @description: 同步的值
   * @author: Quarter
   * @param {String} val 值
   * @return
   */
  set syncedValue(value: string) {
    if (this.middleValue !== value) {
      this.middleValue = value;
      this.dispatch("SFormItem", "s-form-validate", ["change"]);
    }
  }

  /**
   * @description: 处理后的列数
   * @author: Quarter
   * @return {MayNumber}
   */
  get realCols(): number | undefined {
    if (this.width === undefined && typeof this.cols === "number") {
      return this.cols;
    }
  }

  /**
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "is-focused": this.isFocused,
      "is-disabled": this.disabled,
      "is-readonly": this.readonly,
    };
  }

  /**
   * @description: 是否显示提示内容
   * @author: Quarter
   * @return {Boolean}
   */
  get placeholderVisible(): boolean {
    return typeof this.placeholder === "string" && this.unsyncedValue === "";
  }

  /**
   * @description: 是否启用计数器
   * @author: Quarter
   * @return {Boolean}
   */
  get counterEnable(): boolean {
    return typeof this.maxlength === "number" && this.showCounter === true;
  }

  /**
   * @description: 计数器内容
   * @author: Quarter
   * @return {String}
   */
  get counterStr(): string {
    return `${this.unsyncedValue.length}/${this.maxlength}`;
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.unsyncedValue = this.syncedValue;
  }

  /**
   * @description: 监控传入值的变化
   * @author: Quarter
   * @return
   */
  @Watch("value")
  handleValueChange(): void {
    this.unsyncedValue = this.syncedValue;
  }

  /**
   * @description: 监控不同步值的变化
   * @author: Quarter
   * @return
   */
  @Watch("unsyncedValue")
  handleUnsyncedValueChange(): void {
    this.syncedValue = this.unsyncedValue;
  }

  /**
   * @description: 获取焦点
   * @author: Quarter
   * @return
   */
  focus(): void {
    this.isFocused = true;
    this.$emit("focus", this.syncedValue);
    this.dispatch("SFormItem", "s-form-validate", ["focus"]);
  }

  /**
   * @description: 失去焦点
   * @author: Quarter
   * @return
   */
  blur(): void {
    this.isFocused = false;
    this.$emit("blur", this.syncedValue);
    this.dispatch("SFormItem", "s-form-validate", ["blur"]);
  }

  /**
   * @description: 暴露事件
   * @author: Quarter
   * @return
   */
  exposeEvent(event: Event, eventName: string): void {
    if (typeof eventName === "string") {
      this.$emit(eventName, event, this.unsyncedValue);
      this.dispatch("SFormItem", "s-form-validate", [eventName]);
    }
  }
}
</script>

<style lang="scss">
.s-textarea {
  width: var(--textarea-container-width, fit-content);
  font-size: 14px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ffffff;
  display: inline-flex;

  .textarea-content {
    width: var(--textarea-container-width, fit-content);
    font-size: inherit;
    line-height: 1.5;
    border-radius: 4px;
    border: 1px solid #d6e1e5;
    box-sizing: border-box;
    transition: border 0.2s ease;
    overflow: hidden;
    position: relative;

    .textarea-placeholder {
      width: 100%;
      height: 100%;
      padding: 8px 10px;
      color: #d6e1e5;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
    }

    textarea {
      width: var(--textarea-width, fit-content);
      padding: 8px 10px;
      color: #333333;
      font-size: inherit;
      line-height: inherit;
      border: none;
      outline-color: transparent;
      background: none;
      box-sizing: border-box;
      display: block;
      position: relative;
    }

    .input-counter {
      padding: 0 10px;
      color: #b7c1c5;
      font-size: 12px;
      line-height: 1.75;
      background-color: #ffffff;
      position: absolute;
      bottom: 0;
      right: 0;
    }

    &:hover {
      border-color: #b7c1c5;
    }
  }

  &.is-focused .textarea-content,
  &.is-focused .textarea-content:hover {
    border-color: #549fff;
  }

  &.is-disabled .textarea-content,
  &.is-disabled .textarea-content:hover {
    border-color: #d6e1e5;
    background-color: #f9f9f9;

    textarea {
      color: #666666;
    }

    .input-counter {
      background-color: #f9f9f9;
    }
  }

  &:not(.is-disabled).is-readonly .textarea-content,
  &:not(.is-disabled).is-readonly .textarea-content:hover {
    cursor: not-allowed;
    border-color: #d6e1e5;

    textarea {
      color: #333333;
      cursor: not-allowed;
    }

    .input-counter {
      display: none;
    }
  }
}
</style>
