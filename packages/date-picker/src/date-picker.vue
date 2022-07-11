<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-05 11:22:52
 * @LastEditors: Quarter
 * @Description: 简易的日期选择器
 * @FilePath: /simple-ui/packages/date-picker/src/date-picker.vue
-->
<template>
  <div class="s-date-picker" :class="{ 'status-disabled': disabled, 'status-readonly': readonly }">
    <s-popover
      ref="datePickerPopover"
      border-radius="4px"
      @switch="switchPopover"
      :disabled="!enabled"
    >
      <s-input
        :width="width"
        :height="height"
        :value="dateStr"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        force-clear
        :clearable="enabled"
        slot="reference"
        @clear="clearValue"
      >
        <template #icon>
          <i class="s-icon-calendar-outline" style="color: #d6e1e5"></i>
        </template>
      </s-input>
      <div class="date-picker-popover">
        <s-date-picker-popover
          ref="datePicker"
          :value="unsyncedValue"
          :min="min"
          :max="max"
          :day-picker="dayPicker"
        ></s-date-picker-popover>
        <div class="picker-footer">
          <s-button type="cancel" @click="closePopover">取消</s-button>
          <s-button v-if="quick" size="small" type="normal" @click="confirmTheDayBeforeYestarday"
            >前天</s-button
          >
          <s-button v-if="quick" size="small" type="normal" @click="confirmYestarday"
            >昨天</s-button
          >
          <s-button v-if="quick" size="small" type="confirm" @click="confirmToday">今天</s-button>
          <s-button type="confirm" @click="confirmPopover">确定</s-button>
        </div>
      </div>
    </s-popover>
  </div>
</template>

<script lang="ts">
import { Button } from "packages/button";
import { Input } from "packages/input";
import { Emitter } from "packages/mixins";
import { Popover } from "packages/popover";
import { dateFormate } from "packages/util";
import SDatePickerPopover from "./date-picker-popover.vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SDatePicker",
  components: {
    SPopover: Popover,
    SInput: Input,
    SButton: Button,
    SDatePickerPopover,
  },
})
export default class SDatePicker extends Mixins(Emitter) {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop({
    type: String,
    default: "请选择日期",
  })
  placeholder!: string; // 提示文字

  @Prop({
    type: String,
    default: null,
  })
  value!: string | null; // 同步的值

  @Prop({
    type: Array,
    default: undefined,
  })
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
  quick!: boolean; // 是否显示快捷操作

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

  unsyncedValue = 0; // 当前日期

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
   * @description: 日期字符串
   * @author: Quarter
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
   * @description: 监听传入值变化
   * @author: Quarter
   * @param {String} timeStr 时间字符串
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(timeStr: string): void {
    if (typeof timeStr === "string") {
      const formateStr: string = this.formateStandardTimeStr(timeStr);
      const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
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
   * @author: Quarter
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
   * @author: Quarter
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
   * @author: Quarter
   * @return
   */
  clearValue(): void {
    this.unsyncedValue = 0;
  }

  /**
   * @description: 切换弹窗显示
   * @author: Quarter
   * @param {Boolean} visible 是否显示
   * @return
   */
  switchPopover(visible: boolean): void {
    if (visible === true && this.$refs.datePicker instanceof SDatePickerPopover) {
      this.$refs.datePicker.init();
    }
  }

  /**
   * @description: 关闭弹窗
   * @author: Quarter
   * @return
   */
  closePopover(): void {
    if (this.$refs.datePickerPopover instanceof Popover) {
      this.$refs.datePickerPopover.switch(false);
    }
  }

  /**
   * @description: 确认使用前天
   * @author: Quarter
   * @return
   */
  confirmTheDayBeforeYestarday(): void {
    this.confirmQuickDate(Date.now() - 2 * 24 * 60 * 60 * 1000);
  }

  /**
   * @description: 确认使用昨天
   * @author: Quarter
   * @return
   */
  confirmYestarday(): void {
    this.confirmQuickDate(Date.now() - 1 * 24 * 60 * 60 * 1000);
  }

  /**
   * @description: 确认使用今天
   * @author: Quarter
   * @return
   */
  confirmToday(): void {
    this.confirmQuickDate();
  }

  /**
   * @description: 确认快捷时间
   * @author: Quarter
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
   * @author: Quarter
   * @return
   */
  confirmPopover(): void {
    if (this.$refs.datePicker instanceof SDatePickerPopover) {
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
  .s-input .input-content {
    border-color: #d6e1e5;
    background-color: #ffffff;

    .input-icon {
      padding-left: 5px;
    }

    input {
      padding-left: 5px;
      color: #333333;
    }

    &:hover {
      border-color: #b7c1c5;
    }
  }

  &.status-disabled {
    .s-input .input-content {
      cursor: not-allowed;
      background-color: #f9f9f9;

      input {
        color: #666666;
        cursor: not-allowed;
      }

      &:hover {
        border-color: #d6e1e5;
      }
    }
  }

  &:not(.status-disabled).status-readonly {
    .s-input .input-content {
      cursor: default;

      input {
        cursor: default;
      }

      &:hover {
        border-color: #d6e1e5;
      }
    }
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}

.date-picker-popover {
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
