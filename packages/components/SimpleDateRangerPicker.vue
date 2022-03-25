<!--
 * @Author: Quarter
 * @Date: 2020-08-18 13:55:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:22:06
 * @Description: 简易的日期选择器
-->
<template>
  <div
    class="simple-date-ranger-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
    :style="`--input-container-width: ${width}; --input-container-height: ${height}`"
  >
    <simple-popover
      ref="dateRangerPopover"
      border-radius="4px"
      @switch="switchPopover"
      :disabled="!enabled"
    >
      <div class="date-ranger" ref="input" slot="reference">
        <div class="date-picker-icon" ref="icon">
          <i class="simple-icon-calendar-outline"></i>
        </div>
        <simple-input
          :width="inputWidth"
          :height="inputHeight"
          :value="startDateStr"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          readonly
        ></simple-input>
        <div class="ranger-sign" ref="separator">{{ separator }}</div>
        <simple-input
          :width="inputWidth"
          :height="inputHeight"
          :value="endDateStr"
          :placeholder="endPlaceholder"
          :disabled="disabled"
          readonly
        ></simple-input>
        <div v-if="canClear" class="input-clear" @click.stop="clearValue">
          <i class="simple-icon-circle-close"></i>
        </div>
      </div>
      <div class="date-ranger-picker-popover">
        <div class="date-ranger-picker">
          <simple-date-picker-popover
            ref="startDatePicker"
            :value="unsyncedStartValue"
            :min="min"
            :max="complexMax"
            :right="right"
            :day-picker="dayPicker"
            @change="updateLeftValue"
          ></simple-date-picker-popover>
          <div class="picker-split"></div>
          <simple-date-picker-popover
            ref="endDatePicker"
            :value="unsyncedEndValue"
            :min="complexMin"
            :max="max"
            :left="left"
            :day-picker="dayPicker"
            @change="updateRightValue"
          ></simple-date-picker-popover>
        </div>
        <div class="picker-footer">
          <simple-button type="cancel" @click="closePopover">取消</simple-button>
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
import SimpleDatePickerPopover from "./SimpleDatePickerPopover.vue";

export default Emitter.extend({
  name: "SimpleDateRangerPicker",
  components: {
    SimplePopover,
    SimpleInput,
    SimpleDatePickerPopover,
  },
  props: {
    width: String, // 宽度,
    height: String, // 高度
    startPlaceholder: { // 开始提示文字
      type: String,
      default: "请选择开始日期",
    },
    endPlaceholder: { // 结束提示文字
      type: String,
      default: "请选择结束日期",
    },
    separator: { // 分割字符
      type: String,
      default: "-",
    },
    value: { // 值
      type: String,
      default: null,
    } as PropOptions<string | null>,
    interval: Array as PropOptions<string[] | undefined>, // 区间
    formate: { // 格式化字符串
      type: String,
      default: "yyyy-MM-dd",
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
      inputWidth: "0px", // 输入框宽度
      inputHeight: "0px", // 输入框高度
      unsyncedStartValue: 0, // 当前开始日期
      unsyncedEndValue: 0, // 当前结束日期
      leftInterval: 0, // 选中左区间
      rightInterval: 0, // 选中右区间
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
        this.$emit("change", val);
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
    /**
     * @description: 复合最小值
     * @author: Quarter
     * @return {Number}
     */
    complexMin(): number {
      if (this.min > this.left) {
        return this.min;
      } else {
        return this.left;
      }
    },
    /**
     * @description: 复合最大值
     * @author: Quarter
     * @return {Number}
     */
    complexMax(): number {
      if (this.max !== 0 && this.max < this.right) {
        return this.max;
      } else {
        return this.right;
      }
    },
    /**
     * @description: 左区间
     * @author: Quarter
     * @return {Number}
     */
    left(): number {
      if (this.unsyncedStartValue < this.leftInterval) {
        return this.leftInterval;
      } else {
        return this.unsyncedStartValue;
      }
    },
    /**
     * @description: 右区间
     * @author: Quarter
     * @return {Number}
     */
    right(): number {
      if (this.unsyncedEndValue === 0) {
        return this.rightInterval;
      } else if (
        this.unsyncedEndValue > this.rightInterval &&
        this.rightInterval !== 0
      ) {
        return this.rightInterval;
      } else {
        return this.unsyncedEndValue;
      }
    },
    /**
     * @description: 开始日期字符串
     * @author: Quarter
     * @return {String}
     */
    startDateStr(): string | undefined {
      if (
        typeof this.unsyncedStartValue === "number" &&
        this.unsyncedStartValue > 0 &&
        typeof this.formate === "string"
      ) {
        return new Date(this.unsyncedStartValue).formate(this.formate);
      }
    },
    /**
     * @description: 结束日期字符串
     * @author: Quarter
     * @return {String}
     */
    endDateStr(): string | undefined {
      if (
        typeof this.unsyncedEndValue === "number" &&
        this.unsyncedEndValue > 0 &&
        typeof this.formate === "string"
      ) {
        return new Date(this.unsyncedEndValue).formate(this.formate);
      }
    },
    /**
     * @description: 是否显示清除
     * @author: Quarter
     * @return {Boolean}
     */
    canClear(): boolean {
      return (
        this.enabled &&
        (this.unsyncedStartValue !== 0 || this.unsyncedEndValue !== 0)
      );
    },
  },
  mounted(): void {
    this.calcInputWidth();
  },
  beforeUpdate(): void {
    this.calcInputWidth();
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
        if (typeof timeStr === "string" && timeStr.length > 0) {
          const splitStr: string[] = timeStr.split(` ${this.separator} `);
          const start: string = splitStr[0];
          const end: string = splitStr[1];
          if (typeof start === "string" && start.length > 0) {
            const date: Date = new Date(start);
            if (typeof date.getTime() === "number") {
              const justDate: Date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
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
              const justDate: Date = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
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
      },
    },
    /**
     * @description: 监听开始值变化
     * @author: Quarter
     * @return
     */
    unsyncedStartValue(): void {
      this.updateSyncedValue();
    },
    /**
     * @description: 监听结束值变化
     * @author: Quarter
     * @return
     */
    unsyncedEndValue(): void {
      this.updateSyncedValue();
    },
  },
  methods: {
    /**
     * @description: 计算输入框的宽高
     * @author: Quarter
     * @return
     */
    calcInputWidth(): void {
      const input: Vue | Element | (Vue | Element)[] | undefined = this.$refs.input;
      const icon: Vue | Element | (Vue | Element)[] | undefined = this.$refs.icon;
      const separator: Vue | Element | (Vue | Element)[] | undefined = this.$refs.separator;
      if (
        input instanceof Element &&
        icon instanceof Element &&
        separator instanceof Element
      ) {
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
    },
    /**
     * @description: 更新同步的值
     * @author: Quarter
     * @return
     */
    updateSyncedValue(): void {
      let start: string = "";
      let end: string = "";
      if (
        typeof this.unsyncedStartValue === "number" &&
        typeof this.formate === "string"
      ) {
        if (this.unsyncedStartValue !== 0) {
          start = new Date(this.unsyncedStartValue).formate("yyyy-MM-dd");
        }
      }
      if (
        typeof this.unsyncedEndValue === "number" &&
        typeof this.formate === "string"
      ) {
        if (this.unsyncedEndValue !== 0) {
          end = new Date(this.unsyncedEndValue).formate("yyyy-MM-dd");
        }
      }
      const ranger: string = `${start} - ${end}`;
      this.syncedValue = ranger;
      this.$emit("input", ranger);
      this.$emit("change", ranger, start, end);
      this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
    },
    /**
     * @description: 清空值
     * @author: Quarter
     * @return
     */
    clearValue(): void {
      this.unsyncedStartValue = 0;
      this.unsyncedEndValue = 0;
      this.$emit("clear");
    },
    /**
     * @description: 切换弹窗显示
     * @author: Quarter
     * @param {Boolean} visible 是否显示
     * @return
     */
    switchPopover(visible: boolean): void {
      if (visible === true) {
        (this.$refs.startDatePicker as any).init();
        (this.$refs.endDatePicker as any).init();
        this.leftInterval = 0;
        this.rightInterval = 0;
      }
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      if (this.$refs.dateRangerPopover instanceof SimplePopover) {
        (this.$refs.dateRangerPopover as any).switch(false);
      }
    },
    /**
     * @description: 确认弹窗
     * @author: Quarter
     * @return
     */
    confirmPopover(): void {
      if (
        this.$refs.startDatePicker instanceof SimpleDatePickerPopover &&
        this.$refs.endDatePicker instanceof SimpleDatePickerPopover
      ) {
        let value: number | undefined =
          (this.$refs.startDatePicker as any).getSelectorValue();
        if (typeof value === "number") {
          this.unsyncedStartValue = value;
        } else {
          this.unsyncedStartValue = 0;
        }
        value = (this.$refs.endDatePicker as any).getSelectorValue();
        if (typeof value === "number") {
          this.unsyncedEndValue = value;
        } else {
          this.unsyncedEndValue = 0;
        }
      }
      if (this.$refs.dateRangerPopover instanceof SimplePopover) {
        (this.$refs.dateRangerPopover as any).switch(false);
      }
    },
    /**
     * @description: 更新左区间值
     * @author: Quarter
     * @param {number} val 值
     * @return
     */
    updateLeftValue(val: number): void {
      this.leftInterval = val;
    },
    /**
     * @description: 更新右区间值
     * @author: Quarter
     * @param {number} val 值
     * @return
     */
    updateRightValue(val: number): void {
      this.rightInterval = val;
    },
  },
});
</script>

<style lang="scss">
.simple-date-ranger-picker {
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

    .simple-input {
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

      .simple-input {
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

    .simple-input {
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