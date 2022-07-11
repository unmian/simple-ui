<!--
 * @Author: Quarter
 * @Date: 2020-08-18 13:55:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 11:19:44
 * @Description: 简易的日期选择器
-->
<template>
  <div
    class="s-date-ranger-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
    :style="{
      '--input-container-width': width,
      '--input-container-height': height,
    }"
  >
    <s-popover
      ref="dateRangerPopover"
      border-radius="4px"
      @switch="switchPopover"
      :disabled="!enabled"
    >
      <template #reference>
        <div class="date-ranger" ref="input">
          <div class="date-picker-icon" ref="icon">
            <i class="s-icon-calendar-outline"></i>
          </div>
          <s-input
            :width="inputWidth"
            :height="inputHeight"
            :value="startDateStr"
            :placeholder="startPlaceholder"
            :disabled="disabled"
            readonly
          ></s-input>
          <div class="ranger-sign" ref="separator">{{ separator }}</div>
          <s-input
            :width="inputWidth"
            :height="inputHeight"
            :value="endDateStr"
            :placeholder="endPlaceholder"
            :disabled="disabled"
            readonly
          ></s-input>
          <div v-if="canClear" class="input-clear" @click.stop="clearValue">
            <i class="s-icon-circle-close"></i>
          </div>
        </div>
      </template>
      <div class="date-ranger-picker-popover">
        <div class="date-ranger-picker">
          <s-date-picker-popover
            ref="startDatePicker"
            :value="unsyncedStartValue"
            :min="min"
            :max="complexMax"
            :right="right"
            :day-picker="dayPicker"
            @change="updateLeftValue"
          ></s-date-picker-popover>
          <div class="picker-split"></div>
          <s-date-picker-popover
            ref="endDatePicker"
            :value="unsyncedEndValue"
            :min="complexMin"
            :max="max"
            :left="left"
            :day-picker="dayPicker"
            @change="updateRightValue"
          ></s-date-picker-popover>
        </div>
        <div class="picker-footer">
          <s-button type="cancel" @click="closePopover">取消</s-button>
          <s-button type="confirm" @click="confirmPopover">确定</s-button>
        </div>
      </div>
    </s-popover>
  </div>
</template>

<script lang="ts">
import { Input } from "packages/input";
import { Emitter } from "packages/mixins";
import { Popover } from "packages/popover";
import { dateFormate } from "packages/util";
import SDatePickerPopover from "./date-picker-popover.vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SDateRangerPicker",
  components: {
    SPopover: Popover,
    SInput: Input,
    SDatePickerPopover,
  },
})
export default class SDateRangerPicker extends Mixins(Emitter) {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop({
    type: String,
    default: "请选择开始日期",
  })
  startPlaceholder!: string; // 开始提示文字

  @Prop({
    type: String,
    default: "请选择结束日期",
  })
  endPlaceholder!: string; // 结束提示文字

  @Prop({
    type: String,
    default: "-",
  })
  separator!: string; // 分割字符

  @Prop({
    type: String,
    default: null,
  })
  value!: string | null; // 值

  @Prop(Array)
  interval?: string[]; // 区间

  @Prop({
    type: String,
    default: "yyyy-MM-dd",
  })
  formate!: string; // 格式化字符串

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

  inputWidth = "0px"; // 输入框宽度
  inputHeight = "0px"; // 输入框高度
  unsyncedStartValue = 0; // 当前开始日期
  unsyncedEndValue = 0; // 当前结束日期
  leftInterval = 0; // 选中左区间
  rightInterval = 0; // 选中右区间

  /**
   * @description: 同步的值
   * @author: Quarter
   * @return {string|null}
   */
  get syncedValue(): string | null {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @author: Quarter
   * @param {string|null} val 值
   * @return
   */
  set syncedValue(val: string | null) {
    this.$emit("update:value", val);
    this.$emit("input", val);
    this.$emit("change", val);
  }
  /**
   * @description: 是否启用
   * @author: Quarter
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 日选择
   * @author: Quarter
   * @return {Boolean}
   */
  get dayPicker(): boolean {
    if (typeof this.formate === "string") {
      const dayRegExp: RegExp = new RegExp(/d+/);
      return dayRegExp.test(this.formate);
    }
    return true;
  }

  /**
   * @description: 最小值
   * @author: Quarter
   * @return {Number}
   */
  get min(): number {
    if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
      const minStr: string = this.interval[0];
      const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(minStr)) {
        return new Date(minStr + " 00:00:00").getTime();
      }
    }
    return 0;
  }

  /**
   * @description: 最大值
   * @author: Quarter
   * @return {Number}
   */
  get max(): number {
    if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
      const maxStr: string = this.interval[1];
      const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(maxStr)) {
        return new Date(maxStr + " 00:00:00").getTime();
      }
    }
    return 0;
  }

  /**
   * @description: 复合最小值
   * @author: Quarter
   * @return {Number}
   */
  get complexMin(): number {
    if (this.min > this.left) {
      return this.min;
    } else {
      return this.left;
    }
  }

  /**
   * @description: 复合最大值
   * @author: Quarter
   * @return {Number}
   */
  get complexMax(): number {
    if (this.max !== 0 && this.max < this.right) {
      return this.max;
    } else {
      return this.right;
    }
  }

  /**
   * @description: 左区间
   * @author: Quarter
   * @return {Number}
   */
  get left(): number {
    if (this.unsyncedStartValue < this.leftInterval) {
      return this.leftInterval;
    } else {
      return this.unsyncedStartValue;
    }
  }

  /**
   * @description: 右区间
   * @author: Quarter
   * @return {Number}
   */
  get right(): number {
    if (this.unsyncedEndValue === 0) {
      return this.rightInterval;
    } else if (this.unsyncedEndValue > this.rightInterval && this.rightInterval !== 0) {
      return this.rightInterval;
    } else {
      return this.unsyncedEndValue;
    }
  }

  /**
   * @description: 开始日期字符串
   * @author: Quarter
   * @return {String}
   */
  get startDateStr(): string | undefined {
    if (
      typeof this.unsyncedStartValue === "number" &&
      this.unsyncedStartValue > 0 &&
      typeof this.formate === "string"
    ) {
      return dateFormate(this.unsyncedStartValue, this.formate);
    }
  }

  /**
   * @description: 结束日期字符串
   * @author: Quarter
   * @return {String}
   */
  get endDateStr(): string | undefined {
    if (
      typeof this.unsyncedEndValue === "number" &&
      this.unsyncedEndValue > 0 &&
      typeof this.formate === "string"
    ) {
      return dateFormate(this.unsyncedEndValue, this.formate);
    }
  }

  /**
   * @description: 是否显示清除
   * @author: Quarter
   * @return {Boolean}
   */
  get canClear(): boolean {
    return this.enabled && (this.unsyncedStartValue !== 0 || this.unsyncedEndValue !== 0);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    this.calcInputWidth();
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeUpdate(): void {
    this.calcInputWidth();
  }

  /**
   * @description: 监听传入值变化
   * @author: Quarter
   * @param {String} timeStr 时间字符串
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(timeStr: string): void {
    if (typeof timeStr === "string" && timeStr.length > 0) {
      const splitStr: string[] = timeStr.split(` ${this.separator} `);
      const start: string = splitStr[0];
      const end: string = splitStr[1];
      if (typeof start === "string" && start.length > 0) {
        const date: Date = new Date(start);
        if (typeof date.getTime() === "number") {
          const justDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          if (justDate.getTime() !== this.unsyncedStartValue) {
            this.unsyncedStartValue = justDate.getTime();
          }
        }
      } else {
        this.unsyncedStartValue = 0;
      }
      if (typeof end === "string" && end.length > 0) {
        const date: Date = new Date(end);
        if (typeof date.getTime() === "number") {
          const justDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          if (justDate.getTime() !== this.unsyncedEndValue) {
            this.unsyncedEndValue = justDate.getTime();
          }
        }
      } else {
        this.unsyncedEndValue = 0;
      }
    } else {
      this.unsyncedStartValue = 0;
      this.unsyncedEndValue = 0;
    }
  }

  /**
   * @description: 监听开始值变化
   * @author: Quarter
   * @return
   */
  @Watch("unsyncedStartValue")
  @Watch("unsyncedEndValue")
  handleUnsyncedValueChange(): void {
    let start: string = "";
    let end: string = "";
    if (typeof this.unsyncedStartValue === "number" && typeof this.formate === "string") {
      if (this.unsyncedStartValue !== 0) {
        start = dateFormate(this.unsyncedStartValue, "yyyy-MM-dd");
      }
    }
    if (typeof this.unsyncedEndValue === "number" && typeof this.formate === "string") {
      if (this.unsyncedEndValue !== 0) {
        end = dateFormate(this.unsyncedEndValue, "yyyy-MM-dd");
      }
    }
    const ranger: string = `${start} - ${end}`;
    this.syncedValue = ranger;
    this.$emit("input", ranger);
    this.$emit("change", ranger, start, end);
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 计算输入框的宽高
   * @author: Quarter
   * @return
   */
  calcInputWidth(): void {
    const input: Vue | Element | (Vue | Element)[] | undefined = this.$refs.input;
    const icon: Vue | Element | (Vue | Element)[] | undefined = this.$refs.icon;
    const separator: Vue | Element | (Vue | Element)[] | undefined = this.$refs.separator;
    if (input instanceof Element && icon instanceof Element && separator instanceof Element) {
      const inputStyle: CSSStyleDeclaration = getComputedStyle(input);
      const spaceWidth: number =
        input.clientWidth -
        parseFloat(inputStyle.paddingLeft) -
        parseFloat(inputStyle.paddingRight) -
        icon.clientWidth -
        separator.clientWidth;
      this.inputWidth = `${Math.floor(spaceWidth / 2)}px`;
      this.inputHeight = `${input.clientHeight}px`;
    }
  }

  /**
   * @description: 清空值
   * @author: Quarter
   * @return
   */
  clearValue(): void {
    this.unsyncedStartValue = 0;
    this.unsyncedEndValue = 0;
    this.$emit("clear");
  }

  /**
   * @description: 切换弹窗显示
   * @author: Quarter
   * @param {Boolean} visible 是否显示
   * @return
   */
  switchPopover(visible: boolean): void {
    if (
      visible === true &&
      this.$refs.startDatePicker instanceof SDatePickerPopover &&
      this.$refs.endDatePicker instanceof SDatePickerPopover
    ) {
      this.$refs.startDatePicker.init();
      this.$refs.endDatePicker.init();
      this.leftInterval = 0;
      this.rightInterval = 0;
    }
  }

  /**
   * @description: 关闭弹窗
   * @author: Quarter
   * @return
   */
  closePopover(): void {
    if (this.$refs.dateRangerPopover instanceof Popover) {
      this.$refs.dateRangerPopover.switch(false);
    }
  }

  /**
   * @description: 确认弹窗
   * @author: Quarter
   * @return
   */
  confirmPopover(): void {
    if (
      this.$refs.startDatePicker instanceof SDatePickerPopover &&
      this.$refs.endDatePicker instanceof SDatePickerPopover
    ) {
      let value: number | undefined = this.$refs.startDatePicker.getSelectorValue();
      if (typeof value === "number") {
        this.unsyncedStartValue = value;
      } else {
        this.unsyncedStartValue = 0;
      }
      value = this.$refs.endDatePicker.getSelectorValue();
      if (typeof value === "number") {
        this.unsyncedEndValue = value;
      } else {
        this.unsyncedEndValue = 0;
      }
    }
    if (this.$refs.dateRangerPopover instanceof Popover) {
      this.$refs.dateRangerPopover.switch(false);
    }
  }

  /**
   * @description: 更新左区间值
   * @author: Quarter
   * @param {number} val 值
   * @return
   */
  updateLeftValue(val: number): void {
    this.leftInterval = val;
  }

  /**
   * @description: 更新右区间值
   * @author: Quarter
   * @param {number} val 值
   * @return
   */
  updateRightValue(val: number): void {
    this.rightInterval = val;
  }
}
</script>

<style lang="scss">
.s-date-ranger-picker {
  width: fit-content;

  .date-ranger {
    width: var(--input-container-width, 340px);
    height: var(--input-container-height, 36px);
    padding-right: 10px;
    border: 1px solid #d6e1e5;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #ffffff;
    transition: border 0.2s ease;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;

    .date-picker-icon {
      width: 25px;
      padding-left: 5px;
      color: #d6e1e5;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .s-input {
      text-align: center;
      margin-right: 0;

      .input-content {
        border: none;
        background-color: unset;

        .input-icon {
          padding-left: 5px;
        }

        input {
          padding-left: 5px;
          color: #333333;
        }
      }
    }

    .ranger-sign {
      padding: 0 5px;
      color: #333333;
      font-size: 14px;
      text-align: center;
    }

    .input-clear {
      padding: 0 10px;
      height: var(--input-container-height, 36px);
      color: #b7c1c5;
      line-height: var(--input-container-height, 36px);
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
  }

  &:not(.status-disabled):not(.status-readonly):hover .date-ranger {
    border-color: #b7c1c5;

    .input-clear {
      opacity: 1;
    }
  }

  &.status-disabled {
    cursor: not-allowed;

    .date-ranger {
      cursor: not-allowed;
      background-color: #f9f9f9;

      .s-input {
        cursor: not-allowed;
        background-color: transparent;

        input {
          color: #666666;
          cursor: not-allowed;
        }
      }

      .input-clear {
        background-color: transparent;
      }
    }
  }

  &:not(.status-disabled).status-readonly .date-ranger {
    cursor: not-allowed;

    .s-input {
      cursor: not-allowed;
      background-color: transparent;

      input {
        cursor: not-allowed;
      }
    }

    .input-clear {
      background-color: transparent;
    }
  }
}
.date-ranger-picker-popover {
  .date-ranger-picker {
    display: flex;

    .picker-split {
      width: 1px;
      background-color: #d6e1e5;
      margin: 0 10px;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  .picker-footer {
    width: 100%;
    height: 45px;
    padding: 0 5px;
    border-top: 1px solid #d6e1e5;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
