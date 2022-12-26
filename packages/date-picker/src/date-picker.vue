<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-15 17:47:16
 * @LastEditors: Quarter
 * @Description: 简易的日期选择器
 * @FilePath: /simple-ui/packages/date-picker/src/date-picker.vue
-->
<template>
  <div
    class="s-date-picker"
    :class="{ 's-date-picker--disabled': disabled, 's-date-picker--readonly': readonly }"
  >
    <popover ref="datePickerPopover" :disabled="!enabled" @switch="switchPopover">
      <s-input
        :width="width"
        :height="height"
        :value="dateStr"
        :readonly-placeholder="filterPlaceholder"
        :disabled="disabled"
        :readonly="inputReadonly"
        force-clear
        :clearable="enabled"
        slot="reference"
        @clear="clearValue"
      >
        <template #icon>
          <icon name="calendar-days"></icon>
        </template>
      </s-input>
      <div class="s-date-picker__popover">
        <date-picker-popover
          ref="datePicker"
          :value="unsyncedValue"
          :min="min"
          :max="max"
          :day-picker="dayPicker"
        ></date-picker-popover>
        <div class="picker-footer">
          <s-button size="small" theme="cancel" @click="closePopover">取消</s-button>
          <s-button v-if="quick" size="small" theme="default" @click="confirmTheDayBeforeYestarday"
            >前天</s-button
          >
          <s-button v-if="quick" size="small" type="default" @click="confirmYestarday"
            >昨天</s-button
          >
          <s-button v-if="quick" size="small" type="default" @click="confirmToday">今天</s-button>
          <s-button size="small" theme="primary" @click="confirmPopover">确定</s-button>
        </div>
      </div>
    </popover>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Button } from "packages/button";
import { Input } from "packages/input";
import { Emitter } from "packages/mixins";
import { Popover } from "packages/popover";
import { dateFormate } from "packages/util";
import { Component, Prop, Watch } from "vue-property-decorator";
import DatePickerPopover from "./date-picker-popover.vue";

@Component({
  name: "SDatePicker",
  components: {
    Icon,
    DatePickerPopover,
    SInput: Input,
    SButton: Button,
    Popover,
  },
})
export default class DatePicker extends Emitter {
  // 宽度
  @Prop(String)
  readonly width?: string;

  // 高度
  @Prop(String)
  readonly height?: string;

  // 提示文字
  @Prop({
    type: String,
    default: "请选择日期",
  })
  readonly placeholder!: string;

  // 同步的值
  @Prop({
    type: String,
    default: null,
  })
  readonly value!: string | null;

  // 区间
  @Prop({
    type: Array,
    default: undefined,
  })
  readonly interval?: string[];

  // 格式化字符串
  @Prop({
    type: String,
    default: "yyyy-MM-dd",
  })
  readonly formate!: string;

  // 是否显示快捷操作
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly quick!: boolean;

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

  // 当前日期
  unsyncedValue = 0;

  /**
   * @description: 同步的值
   * @return {string|null}
   */
  get syncedValue(): string | null {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @param {string|null} val 值
   * @return
   */
  set syncedValue(val: string | null) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 是否启用
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 输入框是否只读
   * @return {boolean}
   */
  get inputReadonly(): boolean {
    if (this.disabled) {
      return false;
    }
    return true;
  }

  /**
   * @description: 过滤的提示文本
   * @return {string}
   */
  get filterPlaceholder(): string {
    if (this.disabled || this.readonly) {
      return "";
    }
    return this.placeholder;
  }

  /**
   * @description: 日选择
   * @return {Boolean}
   */
  get dayPicker(): boolean {
    if (typeof this.formate === "string") {
      const dayRegExp = new RegExp(/d+/);
      return dayRegExp.test(this.formate);
    }
    return true;
  }

  /**
   * @description: 日期字符串
   * @return {String}
   */
  get dateStr(): string | undefined {
    if (
      typeof this.unsyncedValue === "number" &&
      this.unsyncedValue > 0 &&
      typeof this.formate === "string"
    ) {
      return dateFormate(this.unsyncedValue, this.formate);
    }
    return undefined;
  }

  /**
   * @description: 最小值
   * @return {Number}
   */
  get min(): number {
    if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
      const minStr: string = this.interval[0];
      const dateRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(minStr)) {
        return new Date(`${minStr} 00:00:00`).getTime();
      }
    }
    return 0;
  }

  /**
   * @description: 最大值
   * @return {Number}
   */
  get max(): number {
    if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
      const maxStr: string = this.interval[1];
      const dateRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(maxStr)) {
        return new Date(`${maxStr} 00:00:00`).getTime();
      }
    }
    return 0;
  }

  /**
   * @description: 监听传入值变化
   * @param {String} timeStr 时间字符串
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(timeStr: string): void {
    if (typeof timeStr === "string") {
      const formateStr: string = this.formateStandardTimeStr(timeStr);
      const dateRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(formateStr)) {
        const date: Date = new Date(formateStr);
        if (date.getTime() !== this.unsyncedValue) {
          this.unsyncedValue = date.getTime();
        }
      } else {
        this.unsyncedValue = 0;
      }
    } else {
      this.unsyncedValue = 0;
    }
  }

  /**
   * @description: 监听选中值变化
   * @param {Number} timeStamp 时间戳
   * @return
   */
  @Watch("unsyncedValue")
  handleUnsyncedValueChange(): void {
    if (typeof this.unsyncedValue === "number" && typeof this.formate === "string") {
      if (this.unsyncedValue === 0) {
        this.syncedValue = null;
        this.$emit("input", null);
        this.$emit("change", null);
      } else {
        const value: string = dateFormate(this.unsyncedValue, this.formate);
        this.syncedValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
      }
      this.dispatch("SFormItem", "s-form-validate", ["change"]);
    }
  }

  /**
   * @description: 格式化标准时间字符串
   * @param {String} timeStr 时间字符串
   * @return {String}
   */
  formateStandardTimeStr(timeStr: string): string {
    if (typeof this.formate === "string") {
      const dateStrArr: string[] = new Array(3).fill("01");
      ["yyyy", "MM", "dd"].forEach((str: string, index: number) => {
        if (this.formate.includes(str)) {
          dateStrArr[index] = timeStr.substr(this.formate.indexOf(str), str.length);
        }
      });
      return dateStrArr.join("-");
    }
    return "";
  }

  /**
   * @description: 清空值
   * @return
   */
  clearValue(): void {
    this.unsyncedValue = 0;
  }

  /**
   * @description: 切换弹窗显示
   * @param {Boolean} visible 是否显示
   * @return
   */
  switchPopover(visible: boolean): void {
    if (visible === true && this.$refs.datePicker instanceof DatePickerPopover) {
      this.$refs.datePicker.init();
    }
  }

  /**
   * @description: 关闭弹窗
   * @return
   */
  closePopover(): void {
    if (this.$refs.datePickerPopover instanceof Popover) {
      this.$refs.datePickerPopover.switch(false);
    }
  }

  /**
   * @description: 确认使用前天
   * @return
   */
  confirmTheDayBeforeYestarday(): void {
    this.confirmQuickDate(Date.now() - 2 * 24 * 60 * 60 * 1000);
  }

  /**
   * @description: 确认使用昨天
   * @return
   */
  confirmYestarday(): void {
    this.confirmQuickDate(Date.now() - 1 * 24 * 60 * 60 * 1000);
  }

  /**
   * @description: 确认使用今天
   * @return
   */
  confirmToday(): void {
    this.confirmQuickDate();
  }

  /**
   * @description: 确认快捷时间
   * @param {Number} timestamp 时间戳
   * @return
   */
  confirmQuickDate(timestamp?: number): void {
    const date: Date = new Date(timestamp || Date.now());
    const justDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (justDate.getTime() !== this.unsyncedValue) {
      this.unsyncedValue = justDate.getTime();
    }
    if (this.$refs.datePickerPopover instanceof Popover) {
      this.$refs.datePickerPopover.switch(false);
    }
  }

  /**
   * @description: 确认弹窗
   * @return
   */
  confirmPopover(): void {
    if (this.$refs.datePicker instanceof DatePickerPopover) {
      const value: number | undefined = this.$refs.datePicker.getSelectorValue();
      if (typeof value === "number") {
        this.unsyncedValue = value;
      } else {
        this.unsyncedValue = 0;
      }
    }
    if (this.$refs.datePickerPopover instanceof Popover) {
      this.$refs.datePickerPopover.switch(false);
    }
  }
}
</script>

<style lang="scss">
.s-date-picker {
  display: inline-flex;

  &:not(.s-date-picker--disabled):not(.s-date-picker--readonly):hover {
    .s-input--readonly:not(.s-input--disabled) .s-input__content {
      border-color: var(--s-brand-hover);
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.s-date-picker--disabled {
  cursor: not-allowed;
}

.s-date-picker__popover {
  .picker-footer {
    width: 100%;
    padding: var(--s-spacing-8);
    border-top: 1px solid var(--s-border-color);
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
