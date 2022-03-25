<!--
 * @Author: Quarter
 * @Date: 2020-08-18 13:55:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:20:32
 * @Description: 简易的日期选择器
-->
<template>
  <div
    class="simple-date-time-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
  >
    <simple-popover
      ref="dateTimePickerPopover"
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
        <i class="simple-icon-time" style="color: #d6e1e5" slot="icon"></i>
      </simple-input>
      <div class="date-time-picker-popover">
        <simple-date-time-picker-popover
          ref="dateTimePicker"
          :value="unsyncedValue"
          :min="min"
          :max="max"
          :formate="standardFormater"
        ></simple-date-time-picker-popover>
        <div class="picker-footer">
          <simple-button type="cancel" @click="closePopover">取消</simple-button>
          <simple-button v-if="quick" size="small" type="confirm" @click="confirmNow">此刻</simple-button>
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
import SimpleDateTimePickerPopover from "./SimpleDateTimePickerPopover.vue";

export default Emitter.extend({
  name: "SimpleDateTimePicker",
  components: {
    SimplePopover,
    SimpleInput,
    SimpleButton,
    SimpleDateTimePickerPopover,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    placeholder: { // 提示文字
      type: String,
      default: "请选择日期和时间",
    },
    value: String, // 值
    interval: Array as PropOptions<string[]>, // 区间
    formate: { // 格式化字符串
      type: String,
      default: "yyyy-MM-dd hh:mm:ss",
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
      unsyncedValue: 0, // 非同步的值
    };
  },
  computed: {
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {string | undefined}
     */
    syncedValue: {
      get(): string | undefined {
        return this.value;
      },
      set(val: string | undefined): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
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
     * @description: 标准格式化字符串
     * @author: Quarter
     * @return {String}
     */
    standardFormater(): string {
      if (typeof this.formate === "string") {
        const dateStrArr: string[] = new Array();
        const timeStrArr: string[] = new Array();
        const timeStrMap: any = {
          "y+": "yyyy",
          "M+": "MM",
          "d+": "dd",
          "h+": "hh",
          "m+": "mm",
          "s+": "ss",
        };
        ["y+", "M+", "d+"].forEach((str: string) => {
          if (new RegExp(str).test(this.formate)) {
            dateStrArr.push(timeStrMap[str] || "");
          }
        });
        ["h+", "m+", "s+"].forEach((str: string) => {
          if (new RegExp(str).test(this.formate)) {
            timeStrArr.push(timeStrMap[str] || "");
          }
        });
        return dateStrArr.join("-") + " " + timeStrArr.join(":");
      }
      return "";
    },
    /**
     * @description: 区间最小值
     * @author: Quarter
     * @return
     */
    min(): number | undefined {
      if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
        const minStr: string = this.interval[0];
        const dateRegExp: RegExp = new RegExp(
          /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
        );
        if (dateRegExp.test(minStr)) {
          return new Date(minStr).getTime();
        }
      }
    },
    /**
     * @description: 区间最大值
     * @author: Quarter
     * @return
     */
    max(): number | undefined {
      if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
        const maxStr: string = this.interval[1];
        const dateRegExp: RegExp = new RegExp(
          /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
        );
        if (dateRegExp.test(maxStr)) {
          return new Date(maxStr).getTime();
        }
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
          const date: Date = new Date(this.formateStandardTimeStr(timeStr));
          if (date.getTime() !== this.unsyncedValue) {
            this.unsyncedValue = date.getTime();
          }
        }
      },
    },
    /**
     * @description: 监听选中值变化
     * @author: Quarter
     * @param {Number} timeStamp 时间戳
     * @return
     */
    unsyncedValue(timeStamp: number): void {
      if (typeof timeStamp === "number" && typeof this.formate === "string") {
        if (timeStamp === 0) {
          const value: string = "";
          this.syncedValue = value;
          this.$emit("input", value);
          this.$emit("change", value);
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
        const timeStrArr: string[] = new Array(3).fill("00");
        ["yyyy", "MM", "dd"].forEach((str: string, index: number) => {
          if (this.formate.includes(str)) {
            dateStrArr[index] = timeStr.substr(
              this.formate.indexOf(str),
              str.length
            );
          }
        });
        ["hh", "mm", "ss"].forEach((str: string, index: number) => {
          if (this.formate.includes(str)) {
            timeStrArr[index] = timeStr.substr(
              this.formate.indexOf(str),
              str.length
            );
          }
        });
        return dateStrArr.join("-") + " " + timeStrArr.join(":");
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
      if (visible === true && this.$refs.dateTimePicker instanceof SimpleDateTimePickerPopover) {
        (this.$refs.dateTimePicker as InstanceType<typeof SimpleDateTimePickerPopover>).init();
      }
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
      if (this.$refs.dateTimePickerPopover instanceof SimplePopover) {
        (this.$refs.dateTimePickerPopover as InstanceType<typeof SimplePopover>).switch(false);
      }
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      if (this.$refs.dateTimePickerPopover instanceof SimplePopover) {
        (this.$refs.dateTimePickerPopover as InstanceType<typeof SimplePopover>).switch(false);
      }
    },
    /**
     * @description: 确认使用此时的时间
     * @author: Quarter
     * @return
     */
    confirmNow(): void {
      if (this.$refs.dateTimePicker instanceof SimpleDateTimePickerPopover) {
        const value: number | undefined =
          (this.$refs.dateTimePicker as InstanceType<typeof SimpleDateTimePickerPopover>).getSelectorValue(Date.now());
        if (typeof value === "number") {
          this.unsyncedValue = value;
        } else {
          this.unsyncedValue = 0;
        }
      }
      if (this.$refs.dateTimePickerPopover instanceof SimplePopover) {
        (this.$refs.dateTimePickerPopover as InstanceType<typeof SimplePopover>).switch(false);
      }
    },
    /**
     * @description: 确认弹窗
     * @author: Quarter
     * @return
     */
    confirmPopover(): void {
      if (this.$refs.dateTimePicker instanceof SimpleDateTimePickerPopover) {
        const value: number | undefined =
          (this.$refs.dateTimePicker as InstanceType<typeof SimpleDateTimePickerPopover>).getSelectorValue();
        if (typeof value === "number") {
          this.unsyncedValue = value;
        } else {
          this.unsyncedValue = 0;
        }
      }
      if (this.$refs.dateTimePickerPopover instanceof SimplePopover) {
        (this.$refs.dateTimePickerPopover as InstanceType<typeof SimplePopover>).switch(false);
      }
    },
  },
});
</script>

<style lang="scss">
.simple-date-time-picker {
  width: fit-content;

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

.date-time-picker-popover {
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
