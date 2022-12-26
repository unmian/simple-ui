<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-14 19:32:05
 * @LastEditors: Quarter
 * @Description: 简易的文本域
 * @FilePath: /simple-ui/packages/textarea/src/textarea.vue
-->
<template>
  <div
    class="s-textarea"
    :class="{
      's-textarea--focused': isFocused,
      's-textarea--disabled': disabled,
      's-textarea--readonly': readonly,
    }"
    :style="{ width }"
  >
    <div v-if="placeholderVisible" class="s-textarea__placeholder">
      <template v-for="(item, index) of placeholderArr">
        {{ item }}
        <br v-if="index + 1 !== placeholderArr.length" :key="`placeholder-item-${index}`" />
      </template>
    </div>
    <div v-if="counterEnable" ref="counter" class="s-textarea__counter">
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
</template>

<script lang="ts">
import { InputValue } from "packages/input";
import { Emitter } from "packages/mixins";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "STextarea",
})
export default class Textarea extends Emitter {
  // 值
  @Prop({
    type: String,
    default: null,
  })
  readonly value!: string | null;

  // 宽度
  @Prop(String)
  readonly width?: string;

  // 列数
  @Prop([String, Number])
  readonly cols?: string | number;

  // 行数
  @Prop([String, Number])
  readonly rows?: string | number;

  // 最大字数
  @Prop(Number)
  readonly maxlength?: number;

  // 文本提示
  @Prop(String)
  readonly placeholder?: string;

  // 是否显示计数器
  @Prop({
    type: Boolean,
    default: true,
  })
  readonly showCounter!: boolean;

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

  // 不同步的文本内容
  unsyncedValue = "";
  // 是否获取到焦点
  isFocused = false;

  /**
   * @description: 值
   * @return {InputValue}
   */
  get middleValue(): InputValue {
    return this.value;
  }

  /**
   * @description: 值
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
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 提示文本数组
   * @return {Array<String>}
   */
  get placeholderArr(): string[] {
    if (this.placeholderVisible && typeof this.placeholder === "string") {
      return this.placeholder.split("\\n");
    }
    return [];
  }

  /**
   * @description: 同步的值
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
   * @return {MayNumber}
   */
  get realCols(): number | undefined {
    if (this.width === undefined && typeof this.cols === "number") {
      return this.cols;
    }
    return undefined;
  }

  /**
   * @description: 是否显示提示内容
   * @return {Boolean}
   */
  get placeholderVisible(): boolean {
    return typeof this.placeholder === "string" && this.unsyncedValue === "";
  }

  /**
   * @description: 是否启用计数器
   * @return {Boolean}
   */
  get counterEnable(): boolean {
    if (this.disabled || this.readonly) {
      return false;
    }
    return typeof this.maxlength === "number" && this.showCounter === true;
  }

  /**
   * @description: 计数器内容
   * @return {String}
   */
  get counterStr(): string {
    return `${this.unsyncedValue.length}/${this.maxlength}`;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    this.unsyncedValue = this.syncedValue;
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
   * @description: 监控不同步值的变化
   * @return
   */
  @Watch("unsyncedValue")
  handleUnsyncedValueChange(): void {
    this.syncedValue = this.unsyncedValue;
  }

  /**
   * @description: 获取焦点
   * @return
   */
  focus(): void {
    this.isFocused = true;
    this.$emit("focus", this.syncedValue);
    this.dispatch("SFormItem", "s-form-validate", ["focus"]);
  }

  /**
   * @description: 失去焦点
   * @return
   */
  blur(): void {
    this.isFocused = false;
    this.$emit("blur", this.syncedValue);
    this.dispatch("SFormItem", "s-form-validate", ["blur"]);
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
}
</script>

<style lang="scss">
.s-textarea {
  width: fit-content;
  color: var(--s-text-primary);
  font-size: 1.4rem;
  line-height: 1.5;
  overflow: hidden;
  border-radius: var(--s-border-radius);
  border: 1px solid var(--s-border-color);
  background-color: var(--s-background-primary);
  display: inline-flex;
  position: relative;

  textarea {
    width: 100%;
    padding: var(--s-spacing-8);
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    outline-color: transparent;
    background: none;
    box-sizing: border-box;
    display: block;
    position: relative;
  }

  &:hover {
    border-color: var(--s-brand-hover);
  }
}

.s-textarea__placeholder {
  width: 100%;
  height: 100%;
  padding: var(--s-spacing-8);
  color: var(--s-text-placeholder);
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
}

.s-textarea__counter {
  padding: var(--s-spacing-4) var(--s-spacing-8);
  color: var(--s-text-placeholder);
  font-size: 1.2rem;
  line-height: inherit;
  background-color: var(--s-background-primary);
  position: absolute;
  bottom: 0;
  right: 0;
}

.s-textarea--focused,
.s-textarea--focused:hover {
  border-color: var(--s-brand-hover);
}

.s-textarea--disabled {
  cursor: not-allowed;
  background-color: var(--s-background-secondary);

  &:hover {
    border-color: var(--s-border-color);
  }

  textarea {
    color: var(--s--text-dsiabled);
  }
}

.s-textarea--readonly:not(.s-textarea--disabled) {
  cursor: default;
  border-color: var(--s-border-color);
}
</style>
