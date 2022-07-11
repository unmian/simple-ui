<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-05 11:20:46
 * @LastEditors: Quarter
 * @Description: 时间范围选择器
 * @FilePath: /simple-ui/packages/time-picker/src/time-ranger-picker.vue
-->
<template>
  <div
    class="s-time-ranger-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
    :style="{
      '--input-container-width': width,
      '--input-container-height': height,
    }"
  >
    <s-popover ref="popover" border-radius="4px" :disabled="!enabled" @switch="switchPopover">
      <template #reference>
        <div class="time-ranger" ref="input">
          <div class="date-picker-icon" ref="icon">
            <i class="s-icon-calendar-outline"></i>
          </div>
          <s-input
            :width="inputWidth"
            :height="inputHeight"
            :value="startTimeStr"
            :placeholder="startPlaceholder"
            :disabled="disabled"
            readonly
          ></s-input>
          <div class="ranger-sign" ref="separator">{{ separator }}</div>
          <s-input
            :width="inputWidth"
            :height="inputHeight"
            :value="endTimeStr"
            :placeholder="endPlaceholder"
            :disabled="disabled"
            readonly
          ></s-input>
          <div v-if="canClear" class="input-clear" @click.stop="clearValue">
            <i class="s-icon-circle-close"></i>
          </div>
        </div>
      </template>
      <div class="time-ranger-picker-popover">
        <s-time-ranger-picker-popover
          ref="timeRangerPicker"
          :start-time="startTime"
          :end-time="endTime"
          :min="min"
          :max="max"
          :formate="formate"
          @close="closePopover"
          @confirm="confirmPopover"
        ></s-time-ranger-picker-popover>
      </div>
    </s-popover>
  </div>
</template>

<script lang="ts">
import { Input } from "packages/input";
import { Emitter } from "packages/mixins";
import { Popover } from "packages/popover";
import STimeRangerPickerPopover from "./time-ranger-picker-popover.vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { TimeConfig } from "./types";

@Component({
  name: "STimeRangerPicker",
  components: {
    SPopover: Popover,
    SInput: Input,
    STimeRangerPickerPopover,
  },
})
export default class STimeRangerPicker extends Mixins(Emitter) {
  $refs!: {
    input: HTMLDivElement; // 输入框
    icon: HTMLDivElement; // 图标
    popover: Popover; // 弹出层
    separator: HTMLDivElement; // 分隔符
    timeRangerPicker: STimeRangerPickerPopover; // 时间范围选择弹窗
  };

  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop({
    type: String,
    default: "请选择开始时间",
  })
  startPlaceholder!: string; // 开始提示文字

  @Prop({
    type: String,
    default: "请选择结束时间",
  })
  endPlaceholder!: string; // 结束提示文字

  @Prop({
    type: String,
    default: null,
  })
  value!: string | null; // 值

  @Prop(Array)
  interval?: string[]; // 时间区间

  @Prop({
    type: String,
    default: "hh:mm:ss",
  })
  formate!: string; // 格式化字符串

  @Prop({
    type: String,
    default: "-",
  })
  separator!: string; // 分割字符

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

  startTime: TimeConfig = {
    // 开始时间
    hour: null,
    minute: null,
    second: null,
  };
  endTime: TimeConfig = {
    // 结束时间
    hour: null,
    minute: null,
    second: null,
  };
  inputWidth = "0px"; // 输入框宽度
  inputHeight = "0px"; // 输入框高度

  /**
   * @description: 同步的值
   * @author: Quarter
   * @return {string | null}
   */
  get syncedValue(): string | null {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @author: Quarter
   * @param {string | null} val 值
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
   * @description: 最小值
   * @author: Quarter
   * @return {String}
   */
  get min(): string | undefined {
    if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
      const minStr: string = this.interval[0];
      const timeRegExp: RegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(minStr)) {
        return minStr;
      }
    }
  }

  /**
   * @description: 最小值
   * @author: Quarter
   * @return {String}
   */
  get max(): string | undefined {
    if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
      const maxStr: string = this.interval[1];
      const timeRegExp: RegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(maxStr)) {
        return maxStr;
      }
    }
  }

  /**
   * @description: 开始时间字符串
   * @author: Quarter
   * @return {String}
   */
  get startTimeStr(): string | null {
    const { hour, minute, second } = this.startTime;
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
      } else {
        return `${hourStr}:${minuteStr}:${secondStr}`;
      }
    }
    return null;
  }

  /**
   * @description: 结束时间字符串
   * @author: Quarter
   * @return {String}
   */
  get endTimeStr(): string | null {
    const { hour, minute, second } = this.endTime;
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
      } else {
        return `${hourStr}:${minuteStr}:${secondStr}`;
      }
    }
    return null;
  }

  /**
   * @description: 时间范围字符串
   * @author: Quarter
   * @return {String}
   */
  get timeStr(): string | null {
    if (this.startTimeStr && this.endTimeStr) {
      return `${this.startTimeStr} ${this.separator} ${this.endTimeStr}`;
    }
    return null;
  }

  /**
   * @description: 是否显示清除
   * @author: Quarter
   * @return {Boolean}
   */
  get canClear(): boolean {
    return this.enabled && !!this.timeStr;
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
  handleValueChange(timeStr: string | null): void {
    if (typeof timeStr === "string" && timeStr !== this.timeStr) {
      const strArr: string[] = timeStr.split(` ${this.separator} `);
      const startTimeStr: string = strArr[0];
      const endTimeStr: string = strArr[1];
      const timeRegExp: RegExp = new RegExp(/^([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})){0,1}$/);
      if (timeRegExp.test(startTimeStr)) {
        const times: string[] = startTimeStr.split(":");
        if (times[0]) {
          const hour: number = parseInt(times[0], 10);
          if (hour >= 0 && hour <= 23) {
            this.startTime.hour = hour;
          }
        }
        if (times[1]) {
          const minute: number = parseInt(times[1], 10);
          if (minute >= 0 && minute <= 59) {
            this.startTime.minute = minute;
          }
        }
        if (times[2]) {
          const second: number = parseInt(times[2], 10);
          if (second >= 0 && second <= 59) {
            this.startTime.second = second;
          }
        }
      }
      if (timeRegExp.test(endTimeStr)) {
        const times: string[] = endTimeStr.split(":");
        if (times[0]) {
          const hour: number = parseInt(times[0], 10);
          if (hour >= 0 && hour <= 23) {
            this.endTime.hour = hour;
          }
        }
        if (times[1]) {
          const minute: number = parseInt(times[1], 10);
          if (minute >= 0 && minute <= 59) {
            this.endTime.minute = minute;
          }
        }
        if (times[2]) {
          const second: number = parseInt(times[2], 10);
          if (second >= 0 && second <= 59) {
            this.endTime.second = second;
          }
        }
      }
    }
  }

  /**
   * @description: 监听选中值变化
   * @author: Quarter
   * @return
   */
  @Watch("timeStr")
  handleTimeStrChange(): void {
    this.syncedValue = this.timeStr;
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 计算输入框的宽高
   * @author: Quarter
   * @return
   */
  calcInputWidth(): void {
    const input: Element | Vue | (Element | Vue)[] | undefined = this.$refs.input;
    const icon: Element | Vue | (Element | Vue)[] | undefined = this.$refs.icon;
    const separator: Element | Vue | (Element | Vue)[] | undefined = this.$refs.separator;
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
    this.startTime = {
      hour: null,
      minute: null,
      second: null,
    };
    this.endTime = {
      hour: null,
      minute: null,
      second: null,
    };
  }

  /**
   * @description: 切换弹窗显隐
   * @author: Quarter
   * @param {Boolean} visible 显隐
   * @return
   */
  switchPopover(visible: boolean): void {
    if (visible && this.$refs.timeRangerPicker instanceof STimeRangerPickerPopover) {
      this.$refs.timeRangerPicker.init();
    }
  }

  /**
   * @description: 关闭弹窗
   * @author: Quarter
   * @return
   */
  closePopover(): void {
    if (this.$refs.popover instanceof Popover) {
      this.$refs.popover.switch(false);
    }
  }

  /**
   * @description: 确认弹窗
   * @author: Quarter
   * @param {TimeConfig} startTime 开始时间
   * @param {TimeConfig} endTime 结束时间
   * @return
   */
  confirmPopover(startTime: TimeConfig, endTime: TimeConfig): void {
    if (startTime && endTime) {
      {
        const { hour, minute, second } = startTime;
        if (typeof hour === "number") {
          this.startTime.hour = hour;
        }
        if (typeof minute === "number") {
          this.startTime.minute = minute;
        }
        if (typeof second === "number") {
          this.startTime.second = second;
        }
      }
      {
        const { hour, minute, second } = endTime;
        if (typeof hour === "number") {
          this.endTime.hour = hour;
        }
        if (typeof minute === "number") {
          this.endTime.minute = minute;
        }
        if (typeof second === "number") {
          this.endTime.second = second;
        }
      }
    }
    this.closePopover();
  }
}
</script>

<style lang="scss">
.s-time-ranger-picker {
  width: fit-content;

  .time-ranger {
    width: var(--input-container-width, 240px);
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

  &:not(.status-disabled):not(.status-readonly):hover .time-ranger {
    border-color: #b7c1c5;

    .input-clear {
      opacity: 1;
    }
  }

  &.status-disabled {
    cursor: not-allowed;

    .time-ranger {
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

  &:not(.status-disabled).status-readonly .time-ranger {
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

.time-ranger-picker-popover {
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
</style>
