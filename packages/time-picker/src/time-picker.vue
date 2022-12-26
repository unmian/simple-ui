<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:42:17
 * @LastEditors: Quarter
 * @Description: 简易的时间选择器
 * @FilePath: /simple-ui/packages/time-picker/src/time-picker.vue
-->
<template>
  <div class="s-date-picker" :class="{ 'status-disabled': disabled, 'status-readonly': readonly }">
    <s-popover ref="popover" border-radius="4px" :disabled="!enabled" @switch="switchPopover">
      <s-input
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
        <template #icon>
          <icon name="clock" color="#d6e1e5"></icon>
        </template>
      </s-input>
      <div class="date-picker-popover">
        <s-time-picker-popover
          ref="timePicker"
          :time="time"
          :min="min"
          :max="max"
          :formate="formate"
          :quick="quick"
          @close="closePopover"
          @confirm="confirmPopover"
        ></s-time-picker-popover>
      </div>
    </s-popover>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Input } from "packages/input";
import { Emitter } from "packages/mixins";
import { Popover } from "packages/popover";
import { Component, Prop, Watch } from "vue-property-decorator";
import STimePickerPopover from "./time-picker-popover.vue";
import { TimeConfig } from "./types";

@Component({
  name: "STimePicker",
  components: {
    Icon,
    SPopover: Popover,
    SInput: Input,
    STimePickerPopover,
  },
})
export default class TimePicker extends Emitter {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: String; // 高度

  @Prop({
    type: String,
    default: "请选择时间",
  })
  placeholder!: string; // 提示文字

  @Prop({
    type: String,
    default: null,
  })
  value!: string | null; // 值

  @Prop(Array)
  interval?: string[]; // 区间

  @Prop({
    type: String,
    default: "hh:mm:ss",
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

  time: TimeConfig = {
    // 当前时间
    hour: null as number | null,
    minute: null as number | null,
    second: null as number | null,
  };

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
    this.$emit("change", val);
  }

  /**
   * @description: 是否启用
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 最小值
   * @return {String}
   */
  get min(): string | undefined {
    if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
      const minStr: string = this.interval[0];
      const timeRegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(minStr)) {
        return minStr;
      }
    }
    return undefined;
  }

  /**
   * @description: 最小值
   * @return {String}
   */
  get max(): string | undefined {
    if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
      const maxStr: string = this.interval[1];
      const timeRegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(maxStr)) {
        return maxStr;
      }
    }
    return undefined;
  }

  /**
   * @description: 时间字符串
   * @return {String}
   */
  get timeStr(): string | null {
    const { hour, minute, second } = this.time;
    if (typeof hour === "number") {
      const hourStr: string =
        new Array(2 - hour.toString().length).fill(0).join("") + hour.toString();
      const minuteStr: string =
        new Array(2 - (minute || 0).toString().length).fill(0).join("") + (minute || 0).toString();
      const secondStr: string =
        new Array(2 - (second || 0).toString().length).fill(0).join("") + (second || 0).toString();
      if (typeof this.formate === "string") {
        return this.formate
          .replace(/h+/g, hourStr)
          .replace(/m+/g, minuteStr)
          .replace(/s+/g, secondStr);
      }
      return `${hourStr}:${minuteStr}:${secondStr}`;
    }
    return null;
  }

  /**
   * @description: 监听传入值变化
   * @param {String} timeStr 时间字符串
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleWatchValueChange(timeStr: string): void {
    if (typeof timeStr === "string" && timeStr !== this.timeStr) {
      const timeRegExp = new RegExp(/^([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})){0,1}$/);
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
  }

  /**
   * @description: 监听选中值变化
   * @return
   */
  @Watch("timeStr")
  handleTimeStrChange(): void {
    this.syncedValue = this.timeStr;
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 清空值
   * @return
   */
  clearValue(): void {
    this.time = {
      hour: null,
      minute: null,
      second: null,
    };
  }

  /**
   * @description: 切换弹窗显隐
   * @param {Boolean} visible 显隐
   * @return
   */
  switchPopover(visible: boolean): void {
    if (visible === true && this.$refs.timePicker instanceof STimePickerPopover) {
      this.$refs.timePicker.init();
    }
  }

  /**
   * @description: 关闭弹窗
   * @return
   */
  closePopover(): void {
    if (this.$refs.popover instanceof Popover) {
      this.$refs.popover.switch(false);
    }
  }

  /**
   * @description: 确认弹窗
   * @param {Number} hour 小时
   * @param {Number} minute 分钟
   * @param {Number} second 秒
   * @return
   */
  confirmPopover(time: TimeConfig): void {
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
