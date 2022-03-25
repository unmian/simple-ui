<!--
 * @Author: Quarter
 * @Date: 2020-08-18 13:55:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:20:16
 * @Description: 简易的日期选择器
-->
<template>
  <div
    class="simple-date-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
  >
    <simple-popover
      ref="datePickerPopover"
      border-radius="4px"
      @switch="switchPopover"
      :disabled="!enabled"
    >
      <simple-input
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
        <i class="simple-icon-calendar-outline" style="color: #d6e1e5" slot="icon"></i>
      </simple-input>
      <div class="date-picker-popover">
        <simple-date-picker-popover
          ref="datePicker"
          :value="unsyncedValue"
          :min="min"
          :max="max"
          :day-picker="dayPicker"
        ></simple-date-picker-popover>
        <div class="picker-footer">
          <simple-button type="cancel" @click="closePopover">取消</simple-button>
          <simple-button
            v-if="quick"
            size="small"
            type="normal"
            @click="confirmTheDayBeforeYestarday"
          >前天</simple-button>
          <simple-button v-if="quick" size="small" type="normal" @click="confirmYestarday">昨天</simple-button>
          <simple-button v-if="quick" size="small" type="confirm" @click="confirmToday">今天</simple-button>
          <simple-button type="confirm" @click="confirmPopover">确定</simple-button>
        </div>
      </div>
    </simple-popover>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import SimplePopover from "./SimplePopover.vue";
import SimpleInput from "./SimpleInput.vue";
import SimpleButton from "./SimpleButton.vue";
import SimpleDatePickerPopover from "./SimpleDatePickerPopover.vue";

export default Emitter.extend({
  name: "SimpleDatePicker",
  components: {
    SimplePopover,
    SimpleInput,
    SimpleButton,
    SimpleDatePickerPopover,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    placeholder: { // 提示文字
      type: String,
      default: "请选择日期",
    },
    value: { // 同步的值
      type: String,
      default: null,
    },
    interval: { // 区间
      type: Array,
      default: undefined,
    } as PropOptions<string[] | undefined>,
    formate: { // 格式化字符串
      type: String,
      default: "yyyy-MM-dd",
    },
    quick: { // 是否显示快捷操作
      type: Boolean,
      default: false,
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false,
    },
    readonly: { // 是否只读
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      unsyncedValue: 0, // 当前日期
    };
  },
  computed: {
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {string|null}
     */
    syncedValue: {
      get(): string | null {
        return this.value;
      },
      set(val: string | null): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      }
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
     * @description: 日选择
     * @author: Quarter
     * @return {Boolean}
     */
    dayPicker(): boolean {
      if (typeof this.formate === "string") {
        const dayRegExp: RegExp = new RegExp(/d+/);
        return dayRegExp.test(this.formate);
      }
      return true;
    },
    /**
     * @description: 日期字符串
     * @author: Quarter
     * @return {String}
     */
    dateStr(): string | undefined {
      if (
        typeof this.unsyncedValue === "number" &&
        this.unsyncedValue > 0 &&
        typeof this.formate === "string"
      ) {
        return new Date(this.unsyncedValue).formate(this.formate);
      }
    },
    /**
     * @description: 最小值
     * @author: Quarter
     * @return {Number}
     */
    min(): number {
      if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
        const minStr: string = this.interval[0];
        const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
        if (dateRegExp.test(minStr)) {
          return new Date(minStr + " 00:00:00").getTime();
        }
      }
      return 0;
    },
    /**
     * @description: 最大值
     * @author: Quarter
     * @return {Number}
     */
    max(): number {
      if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
        const maxStr: string = this.interval[1];
        const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
        if (dateRegExp.test(maxStr)) {
          return new Date(maxStr + " 00:00:00").getTime();
        }
      }
      return 0;
    },
  },
  methods: {
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
            dateStrArr[index] = timeStr.substr(
              this.formate.indexOf(str),
              str.length
            );
          }
        });
        return dateStrArr.join("-");
      }
      return "";
    },
    /**
     * @description: 清空值
     * @author: Quarter
     * @return
     */
    clearValue(): void {
      this.unsyncedValue = 0;
    },
    /**
     * @description: 切换弹窗显示
     * @author: Quarter
     * @param {Boolean} visible 是否显示
     * @return
     */
    switchPopover(visible: boolean): void {
      if (visible === true && this.$refs.datePicker instanceof SimpleDatePickerPopover) {
        (this.$refs.datePicker as any).init();
      }
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      if (this.$refs.datePickerPopover instanceof SimplePopover) {
        (this.$refs.datePickerPopover as any).switch(false);
      }
    },
    /**
     * @description: 确认使用前天
     * @author: Quarter
     * @return
     */
    confirmTheDayBeforeYestarday(): void {
      this.confirmQuickDate(Date.now() - 2 * 24 * 60 * 60 * 1000);
    },
    /**
     * @description: 确认使用昨天
     * @author: Quarter
     * @return
     */
    confirmYestarday(): void {
      this.confirmQuickDate(Date.now() - 1 * 24 * 60 * 60 * 1000);
    },
    /**
     * @description: 确认使用今天
     * @author: Quarter
     * @return
     */
    confirmToday(): void {
      this.confirmQuickDate();
    },
    /**
     * @description: 确认快捷时间
     * @author: Quarter
     * @param {Number} timestamp 时间戳
     * @return
     */
    confirmQuickDate(timestamp?: number): void {
      const date: Date = new Date(timestamp || Date.now());
      const justDate: Date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      if (justDate.getTime() !== this.unsyncedValue) {
        this.unsyncedValue = justDate.getTime();
      }
      if (this.$refs.datePickerPopover instanceof SimplePopover) {
        (this.$refs.datePickerPopover as any).switch(false);
      }
    },
    /**
     * @description: 确认弹窗
     * @author: Quarter
     * @return
     */
    confirmPopover(): void {
      if (this.$refs.datePicker instanceof SimpleDatePickerPopover) {
        const value: number | undefined =
          (this.$refs.datePicker as any).getSelectorValue();
        if (typeof value === "number") {
          this.unsyncedValue = value;
        } else {
          this.unsyncedValue = 0;
        }
      }
      if (this.$refs.datePickerPopover instanceof SimplePopover) {
        (this.$refs.datePickerPopover as any).switch(false);
      }
    },
  },
  watch: {
    /**
     * @description: 监听传入值变化
     * @author: Quarter
     * @param {String} timeStr 时间字符串
     * @return
     */
    value: {
      immediate: true,
      handler(timeStr: string): void {
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
    },
    /**
     * @description: 监听选中值变化
     * @author: Quarter
     * @param {Number} timeStamp 时间戳
     * @return
     */
    unsyncedValue(): void {
      if (
        typeof this.unsyncedValue === "number" &&
        typeof this.formate === "string"
      ) {
        if (this.unsyncedValue === 0) {
          this.syncedValue = null;
          this.$emit("input", null);
          this.$emit("change", null);
        } else {
          const value: string = new Date(this.unsyncedValue).formate(
            this.formate
          );
          this.syncedValue = value;
          this.$emit("input", value);
          this.$emit("change", value);
        }
        this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
      }
    }
  },
});
</script>

<style lang="scss">
.simple-date-picker {
  .simple-input .input-content {
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
    .simple-input .input-content {
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
    .simple-input .input-content {
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
