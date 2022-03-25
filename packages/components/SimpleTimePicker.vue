<!--
 * @Author: Quarter
 * @Date: 2020-08-18 13:55:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:12:25
 * @Description: 简易的日期选择器
-->
<template>
  <div
    class="simple-date-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
  >
    <simple-popover ref="popover" border-radius="4px" :disabled="!enabled" @switch="switchPopover">
      <simple-input
        :width="width"
        :height="height"
        :value="timeStr"
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
      <div class="date-picker-popover">
        <simple-time-picker-popover
          ref="timePicker"
          :time="time"
          :min="min"
          :max="max"
          :formate="formate"
          :quick="quick"
          @close="closePopover"
          @confirm="confirmPopover"
        ></simple-time-picker-popover>
      </div>
    </simple-popover>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import SimplePopover from "./SimplePopover.vue";
import SimpleInput from "./SimpleInput.vue";
import SimpleTimePickerPopover from "./SimpleTimePickerPopover.vue";
import { SimpleTimeConfig } from "../types";

export default Emitter.extend({
  name: "SimpleTimePicker",
  components: {
    SimplePopover,
    SimpleInput,
    SimpleTimePickerPopover,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    placeholder: { // 提示文字
      type: String,
      default: "请选择时间",
    },
    value: { // 值
      type: String,
      default: null,
    } as PropOptions<string | null>,
    interval: Array as PropOptions<string[] | undefined>, // 区间
    formate: { // 格式化字符串
      type: String,
      default: "hh:mm:ss",
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
      time: { // 当前时间
        hour: null as number | null,
        minute: null as number | null,
        second: null as number | null,
      },
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
     * @description: 最小值
     * @author: Quarter
     * @return {String}
     */
    min(): string | undefined {
      if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
        const minStr: string = this.interval[0];
        const timeRegExp: RegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
        if (timeRegExp.test(minStr)) {
          return minStr;
        }
      }
    },
    /**
     * @description: 最小值
     * @author: Quarter
     * @return {String}
     */
    max(): string | undefined {
      if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
        const maxStr: string = this.interval[1];
        const timeRegExp: RegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
        if (timeRegExp.test(maxStr)) {
          return maxStr;
        }
      }
    },
    /**
     * @description: 时间字符串
     * @author: Quarter
     * @return {String}
     */
    timeStr(): string | null {
      const { hour, minute, second } = this.time;
      if (typeof hour === "number") {
        const hourStr: string =
          new Array(2 - hour.toString().length).fill(0).join("") +
          hour.toString();
        const minuteStr: string =
          new Array(2 - (minute || 0).toString().length).fill(0).join("") +
          (minute || 0).toString();
        const secondStr: string =
          new Array(2 - (second || 0).toString().length).fill(0).join("") +
          (second || 0).toString();
        if (typeof this.formate === "string") {
          return this.formate
            .replace(/h+/g, hourStr)
            .replace(/m+/g, minuteStr)
            .replace(/s+/g, secondStr);
        } else {
          return `${hourStr}:${minuteStr}:${secondStr}`;
        }
      }
      return null;
    },
  },
  methods: {
    /**
     * @description: 清空值
     * @author: Quarter
     * @return
     */
    clearValue(): void {
      this.time = {
        hour: null,
        minute: null,
        second: null,
      };
    },
    /**
     * @description: 切换弹窗显隐
     * @author: Quarter
     * @param {Boolean} visible 显隐
     * @return
     */
    switchPopover(visible: boolean): void {
      if (visible) {
        (this.$refs.timePicker as any).init();
      }
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      if (this.$refs.popover) {
        (this.$refs.popover as any).switch(false);
      }
    },
    /**
     * @description: 确认弹窗
     * @author: Quarter
     * @param {Number} hour 小时
     * @param {Number} minute 分钟
     * @param {Number} second 秒
     * @return
     */
    confirmPopover(time: SimpleTimeConfig): void {
      if (time) {
        const { hour, minute, second } = time;
        if (typeof hour === "number") {
          this.time.hour = hour;
        }
        if (typeof minute === "number") {
          this.time.minute = minute;
        }
        if (typeof second === "number") {
          this.time.second = second;
        }
      }
      this.closePopover();
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
        if (typeof timeStr === "string" && timeStr !== this.timeStr) {
          const timeRegExp: RegExp = new RegExp(
            /^([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})){0,1}$/
          );
          if (timeRegExp.test(timeStr)) {
            const times: string[] = timeStr.split(":");
            if (times[0]) {
              const hour: number = parseInt(times[0], 10);
              if (hour >= 0 && hour <= 23) {
                this.time.hour = hour;
              }
            }
            if (times[1]) {
              const minute: number = parseInt(times[1], 10);
              if (minute >= 0 && minute <= 59) {
                this.time.minute = minute;
              }
            }
            if (times[2]) {
              const second: number = parseInt(times[2], 10);
              if (second >= 0 && second <= 59) {
                this.time.second = second;
              }
            }
          }
        }
      },
    },
    /**
     * @description: 监听选中值变化
     * @author: Quarter
     * @return
     */
    timeStr(): void {
      this.syncedValue = this.timeStr;
      this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
    },
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
      cursor: not-allowed;

      input {
        cursor: not-allowed;
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
</style>
