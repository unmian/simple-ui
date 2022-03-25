<!--
 * @Author: Quarter
 * @Date: 2020-08-18 13:55:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:21:03
 * @Description: 简易的日期选择器
-->
<template>
  <div
    class="simple-date-time-ranger-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
    :style="`--input-container-width: ${width}; --input-container-height: ${height}`"
  >
    <simple-popover
      ref="dateTimeRangerPopover"
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
          :value="startDateTimeStr"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          readonly
        ></simple-input>
        <div class="ranger-sign" ref="separator">{{ separator }}</div>
        <simple-input
          :width="inputWidth"
          :height="inputHeight"
          :value="endDateTimeStr"
          :placeholder="endPlaceholder"
          :disabled="disabled"
          readonly
        ></simple-input>
        <div v-if="canClear" class="input-clear" @click.stop="clearValue">
          <i class="simple-icon-circle-close"></i>
        </div>
      </div>
      <div class="date-time-ranger-picker-popover">
        <div class="date-time-ranger-selector">
          <simple-date-time-picker-popover
            ref="startDateTimePicker"
            :value="unsyncedStartValue"
            :min="min"
            :max="complexMax"
            :right="right"
            @change="updateLeftValue"
          ></simple-date-time-picker-popover>
          <div class="picker-split"></div>
          <simple-date-time-picker-popover
            ref="endDateTimePicker"
            :value="unsyncedEndValue"
            :min="complexMin"
            :max="max"
            :left="left"
            @change="updateRightValue"
          ></simple-date-time-picker-popover>
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
import SimpleDateTimePickerPopover from "./SimpleDateTimePickerPopover.vue";

export default Emitter.extend({
  name: "SimpleDateTimeRangerPicker",
  components: {
    SimplePopover,
    SimpleInput,
    SimpleDateTimePickerPopover,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    startPlaceholder: { // 开始提示文字
      type: String,
      default: "请选择开始日期和时间",
    },
    endPlaceholder: { // 结束提示文字
      type: String,
      default: "请选择结束日期和时间",
    },
    interval: Array as PropOptions<string[] | undefined>, // 区间
    separator: { // 分割字符
      type: String,
      default: "-",
    },
    value: { // 值
      type: String,
      default: undefined,
    } as PropOptions<string | undefined>,
    formate: { // 格式化字符串
      type: String,
      default: "yyyy-MM-dd hh:mm:ss",
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
      unsyncedStartValue: 0, // 当前开始日期时间
      unsyncedEndValue: 0, // 当前结束日期时间
      leftInterval: 0, // 内部左区间
      rightInterval: 0, // 内部右区间
    };
  },
  computed: {
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {string}
     */
    syncedValue: {
      get(): string | undefined {
        return this.value;
      },
      set(val: string | undefined): void {
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
     * @description: 区间最小值
     * @author: Quarter
     * @return
     */
    min(): number {
      if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
        const minStr: string = this.interval[0];
        const dateRegExp: RegExp = new RegExp(
          /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
        );
        if (dateRegExp.test(minStr)) {
          return new Date(minStr).getTime();
        }
      }
      return 0;
    },
    /**
     * @description: 区间最大值
     * @author: Quarter
     * @return
     */
    max(): number {
      if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
        const maxStr: string = this.interval[1];
        const dateRegExp: RegExp = new RegExp(
          /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
        );
        if (dateRegExp.test(maxStr)) {
          return new Date(maxStr).getTime();
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
        return new Date(
          new Date(this.leftInterval).formate("yyyy-MM-dd 00:00:00")
        ).getTime();
      } else {
        return new Date(
          new Date(this.unsyncedStartValue).formate("yyyy-MM-dd 00:00:00")
        ).getTime();
      }
    },
    /**
     * @description: 右区间
     * @author: Quarter
     * @return {Number}
     */
    right(): number {
      if (this.unsyncedEndValue === 0) {
        if (this.rightInterval === 0) {
          return 0;
        } else {
          return new Date(
            new Date(this.rightInterval).formate("yyyy-MM-dd 00:00:00")
          ).getTime();
        }
      } else if (
        this.unsyncedEndValue > this.rightInterval &&
        this.rightInterval !== 0
      ) {
        return new Date(
          new Date(this.rightInterval).formate("yyyy-MM-dd 00:00:00")
        ).getTime();
      } else {
        return new Date(
          new Date(this.unsyncedEndValue).formate("yyyy-MM-dd 00:00:00")
        ).getTime();
      }
    },
    /**
     * @description: 开始日期字符串
     * @author: Quarter
     * @return {String}
     */
    startDateTimeStr(): string | undefined {
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
    endDateTimeStr(): string | undefined {
      if (
        typeof this.unsyncedEndValue === "number" &&
        this.unsyncedEndValue > 0 &&
        typeof this.formate === "string"
      ) {
        return new Date(this.unsyncedEndValue).formate(this.formate);
      }
    },
    /**
     * @description: 开始日期字符串
     * @author: Quarter
     * @return {String}
     */
    dateTimeStr(): string | undefined {
      if (this.startDateTimeStr && this.endDateTimeStr) {
        return `${this.startDateTimeStr} ${this.separator} ${this.endDateTimeStr}`;
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
              if (date.getTime() !== this.unsyncedStartValue) {
                this.unsyncedStartValue = date.getTime();
                this.leftInterval = this.unsyncedStartValue;
              }
            }
          } else {
            this.unsyncedStartValue = 0;
            this.leftInterval = 0;
          }
          if (typeof end === "string" && end.length > 0) {
            const date: Date = new Date(end);
            if (typeof date.getTime() === "number") {
              if (date.getTime() !== this.unsyncedEndValue) {
                this.unsyncedEndValue = date.getTime();
                this.rightInterval = date.getTime();
              }
            }
          } else {
            this.unsyncedEndValue = 0;
            this.rightInterval = 0;
          }
        } else {
          this.unsyncedStartValue = 0;
          this.unsyncedEndValue = 0;
          this.leftInterval = 0;
          this.rightInterval = 0;
        }
      },
    },
    /**
   * @description: 更新同步的值
   * @author: Quarter
   * @return
   */
    dateTimeStr(): void {
      this.syncedValue = this.dateTimeStr;
      this.$emit("input", this.dateTimeStr);
      this.$emit(
        "change",
        this.dateTimeStr,
        this.startDateTimeStr,
        this.endDateTimeStr
      );
      this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
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
     * @description: 清空值
     * @author: Quarter
     * @return
     */
    clearValue(): void {
      this.unsyncedStartValue = 0;
      this.unsyncedEndValue = 0;
      this.leftInterval = 0;
      this.rightInterval = 0;
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
        (this.$refs.startDateTimePicker as any).init();
        (this.$refs.endDateTimePicker as any).init();
      }
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      if (this.$refs.dateTimeRangerPopover instanceof SimplePopover) {
        (this.$refs.dateTimeRangerPopover as any).switch(false);
      }
    },
    /**
     * @description: 确认弹窗
     * @author: Quarter
     * @return
     */
    confirmPopover(): void {
      if (this.$refs.startDateTimePicker instanceof SimpleDateTimePickerPopover) {
        const value: number | undefined =
          (this.$refs.startDateTimePicker as InstanceType<typeof SimpleDateTimePickerPopover>).getSelectorValue();
        if (typeof value === "number") {
          this.unsyncedStartValue = value;
        } else {
          this.unsyncedStartValue = 0;
        }
      }
      if (this.$refs.endDateTimePicker instanceof SimpleDateTimePickerPopover) {
        const value: number | undefined =
          (this.$refs.endDateTimePicker as InstanceType<typeof SimpleDateTimePickerPopover>).getSelectorValue();
        if (typeof value === "number") {
          this.unsyncedEndValue = value;
        } else {
          this.unsyncedEndValue = 0;
        }
      }
      if (this.$refs.dateTimeRangerPopover instanceof SimplePopover) {
        (this.$refs.dateTimeRangerPopover as any).switch(false);
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
.simple-date-time-ranger-picker {
  width: fit-content;

  .date-ranger {
    width: var(--input-container-width, 380px);
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

    &:hover {
      border-color: #b7c1c5;

      .input-clear {
        opacity: 1;
      }
    }
  }

  &.status-disabled .date-ranger {
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

    &:hover {
      border-color: #d6e1e5;
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

    &:hover {
      border-color: #d6e1e5;
    }
  }
}

.date-time-ranger-picker-popover {
  .date-time-ranger-selector {
    padding: 10px 0;
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