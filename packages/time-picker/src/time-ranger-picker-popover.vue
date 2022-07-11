<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 17:13:14
 * @LastEditors: Quarter
 * @Description: 时间范围选择器弹窗
 * @FilePath: /simple-ui/packages/time-picker/src/time-ranger-picker-popover.vue
-->
<template>
  <div class="s-time-ranger-picker-popover">
    <div class="picker-content">
      <div class="start-time-picker">
        <div class="picker-label">开始时间</div>
        <s-time-selector
          ref="startTimeSelector"
          v-model="insideStartTime"
          :min="min"
          :max="filterStartMaxTime"
          :formate="formate"
        ></s-time-selector>
      </div>
      <div class="end-time-picker">
        <div class="picker-label">结束时间</div>
        <s-time-selector
          ref="endTimeSelector"
          v-model="insideEndTime"
          :min="filterEndMinTime"
          :max="max"
          :formate="formate"
        ></s-time-selector>
      </div>
    </div>
    <div class="picker-footer">
      <s-button type="cancel" @click="closePopover">取消</s-button>
      <s-button type="confirm" @click="confirmPopover">确定</s-button>
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_DATE } from "packages/constants";
import { DateTimeConfig } from "packages/date-time-picker";
import { dateFormate } from "packages/util";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import STimeSelector from "./time-selector.vue";
import { TimeConfig } from "./types";

@Component({
  name: "STimeRangerPickerPopover",
  components: {
    STimeSelector,
  },
})
export default class STimeRangerPickerPopover extends Vue {
  @Prop({
    type: String,
    default: "hh:mm:ss",
  })
  formate!: string; // 格式化字符串

  @Prop(Object)
  startTime?: TimeConfig | DateTimeConfig; // 开始时间

  @Prop(Object)
  endTime!: TimeConfig | DateTimeConfig; // 结束时间

  @Prop(String)
  date?: string; // 日期

  @Prop(String)
  min?: string; // 最小值

  @Prop(String)
  max?: string; // 最大值

  insideStartTime: TimeConfig = {
    // 内部开始时间
    hour: 0,
    minute: 0,
    second: 0,
  };
  insideEndTime: TimeConfig = {
    // 内部结束时间
    hour: 0,
    minute: 0,
    second: 0,
  };

  /**
   * @description: 过滤的日期
   * @author: Quarter
   * @return {String}
   */
  get filterDate(): string {
    if (typeof this.date === "string") {
      const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(this.date)) {
        return this.date;
      }
    }
    return DEFAULT_DATE;
  }

  /**
   * @description: 最小时间限制
   * @author: Quarter
   * @return {Number}
   */
  get minTime(): number | undefined {
    if (typeof this.min === "string") {
      const timeRegExp: RegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(this.min)) {
        return new Date(DEFAULT_DATE + " " + this.min).getTime();
      }
      const dateRegExp: RegExp = new RegExp(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
      );
      if (dateRegExp.test(this.min)) {
        return new Date(this.min).getTime();
      }
    }
  }

  /**
   * @description: 最大时间限制
   * @author: Quarter
   * @return {Number}
   */
  get maxTime(): number | undefined {
    if (typeof this.max === "string") {
      const timeRegExp: RegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(this.max)) {
        return new Date(DEFAULT_DATE + " " + this.max).getTime();
      }
      const dateRegExp: RegExp = new RegExp(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/
      );
      if (dateRegExp.test(this.max)) {
        return new Date(this.max).getTime();
      }
    }
  }

  /**
   * @description: 开始时间最大限制
   * @author: Quarter
   * @return {String}
   */
  get filterStartMaxTime(): string | undefined {
    if (this.maxTime) {
      const { hour, minute, second } = this.insideEndTime;
      if (hour !== 0 || minute !== 0 || second !== 0) {
        const hourStr: string =
          new Array(2 - (hour || 0).toString().length).fill(0).join("") +
          (hour || 0).toString();
        const minuteStr: string =
          new Array(2 - (minute || 0).toString().length).fill(0).join("") +
          (minute || 0).toString();
        const secondStr: string =
          new Array(2 - (second || 0).toString().length).fill(0).join("") +
          (second || 0).toString();
        const timeStr: string = `${hourStr}:${minuteStr}:${secondStr}`;
        if (
          new Date(`${this.filterDate} ${timeStr}`).getTime() < this.maxTime
        ) {
          return timeStr;
        } else {
          return dateFormate(this.maxTime, "hh:mm:ss");
        }
      } else {
        return dateFormate(this.maxTime, "hh:mm:ss");
      }
    } else {
      const { hour, minute, second } = this.insideEndTime;
      if (hour !== 0 || minute !== 0 || second !== 0) {
        const hourStr: string =
          new Array(2 - (hour || 0).toString().length).fill(0).join("") +
          (hour || 0).toString();
        const minuteStr: string =
          new Array(2 - (minute || 0).toString().length).fill(0).join("") +
          (minute || 0).toString();
        const secondStr: string =
          new Array(2 - (second || 0).toString().length).fill(0).join("") +
          (second || 0).toString();
        return `${hourStr}:${minuteStr}:${secondStr}`;
      }
    }
  }

  /**
   * @description: 结束时间最小限制
   * @author: Quarter
   * @return {String}
   */
  get filterEndMinTime(): string | undefined {
    if (this.minTime) {
      const { hour, minute, second } = this.insideStartTime;
      if (hour !== 0 || minute !== 0 || second !== 0) {
        const hourStr: string =
          new Array(2 - (hour || 0).toString().length).fill(0).join("") +
          (hour || 0).toString();
        const minuteStr: string =
          new Array(2 - (minute || 0).toString().length).fill(0).join("") +
          (minute || 0).toString();
        const secondStr: string =
          new Array(2 - (second || 0).toString().length).fill(0).join("") +
          (second || 0).toString();
        const timeStr: string = `${hourStr}:${minuteStr}:${secondStr}`;
        if (
          new Date(`${this.filterDate} ${timeStr}`).getTime() > this.minTime
        ) {
          return timeStr;
        } else {
          return dateFormate(this.minTime, "hh:mm:ss");
        }
      } else {
        return dateFormate(this.minTime, "hh:mm:ss");
      }
    } else {
      const { hour, minute, second } = this.insideStartTime;
      if (hour !== 0 || minute !== 0 || second !== 0) {
        const hourStr: string =
          new Array(2 - (hour || 0).toString().length).fill(0).join("") +
          (hour || 0).toString();
        const minuteStr: string =
          new Array(2 - (minute || 0).toString().length).fill(0).join("") +
          (minute || 0).toString();
        const secondStr: string =
          new Array(2 - (second || 0).toString().length).fill(0).join("") +
          (second || 0).toString();
        return `${hourStr}:${minuteStr}:${secondStr}`;
      }
    }
  }

  /**
   * @description: 小时列表
   * @author: Quarter
   * @return {Array<String>}
   */
  get hourArr(): string[] {
    return new Array(24).fill("0").map((value: any, index: number) => {
      const str: string = index.toString();
      return new Array(2 - str.length).fill(0).join("") + str;
    });
  }

  /**
   * @description: 分钟列表
   * @author: Quarter
   * @return {Array<String>}
   */
  get minuteArr(): string[] {
    return new Array(60).fill("0").map((value: any, index: number) => {
      const str: string = index.toString();
      return new Array(2 - str.length).fill(0).join("") + str;
    });
  }

  /**
   * @description: 监听开始时间的变化
   * @author: Quarter
   * @return
   */
  @Watch("startTime", {
    immediate: true,
  })
  handleStartTimeChange(): void {
    if (this.startTime) {
      const { hour, minute, second } = this.startTime;
      if (typeof hour === "number") {
        this.insideStartTime.hour = hour;
      } else {
        this.insideStartTime.hour = 0;
      }
      if (typeof minute === "number") {
        this.insideStartTime.minute = minute;
      } else {
        this.insideStartTime.minute = 0;
      }
      if (typeof second === "number") {
        this.insideStartTime.second = second;
      } else {
        this.insideStartTime.second = 0;
      }
    }
  }

  /**
   * @description: 监听结束时间的变化
   * @author: Quarter
   * @return
   */
  @Watch("endTime", {
    immediate: true,
  })
  handleEndTimeChange(): void {
    if (this.endTime) {
      const { hour, minute, second } = this.endTime;
      if (typeof hour === "number") {
        this.insideEndTime.hour = hour;
      } else {
        this.insideEndTime.hour = 0;
      }
      if (typeof minute === "number") {
        this.insideEndTime.minute = minute;
      } else {
        this.insideEndTime.minute = 0;
      }
      if (typeof second === "number") {
        this.insideEndTime.second = second;
      } else {
        this.insideEndTime.second = 0;
      }
    }
  }

  /**
   * @description: 初始化
   * @author: Quarter
   * @return
   */
  init(): void {
    this.$nextTick(() => {
      this.handleStartTimeChange();
      this.handleEndTimeChange();
      if (this.$refs.startTimeSelector instanceof STimeSelector) {
        this.$refs.startTimeSelector.init();
      }
      if (this.$refs.endTimeSelector instanceof STimeSelector) {
        this.$refs.endTimeSelector.init();
      }
    });
  }

  /**
   * @description: 关闭弹出层
   * @author: Quarter
   * @return
   */
  closePopover(): void {
    this.$emit("close");
  }

  /**
   * @description: 确认时间
   * @author: Quarter
   * @return
   */
  confirmPopover(): void {
    if (this.$refs.startTimeSelector instanceof STimeSelector) {
      const startTime: Date = new Date(
        this.$refs.startTimeSelector.confirmValue()
      );
      this.insideStartTime = {
        hour: startTime.getHours(),
        minute: startTime.getMinutes(),
        second: startTime.getSeconds(),
      };
    }
    if (this.$refs.endTimeSelector instanceof STimeSelector) {
      const endTime: Date = new Date(this.$refs.endTimeSelector.confirmValue());
      this.insideEndTime = {
        hour: endTime.getHours(),
        minute: endTime.getMinutes(),
        second: endTime.getSeconds(),
      };
    }
    this.$emit("confirm", this.insideStartTime, this.insideEndTime);
  }
}
</script>

<style lang="scss">
.s-time-ranger-picker-popover {
  button.s-button:not(:last-child) {
    margin-right: 0;
  }

  .picker-content {
    width: 360px;
    padding: 15px;
    display: flex;
    justify-content: space-between;

    .picker-label {
      color: #333333;
      font-size: 14px;
      text-align: center;
    }

    .s-time-selector {
      width: 140px;
      border: 1px solid #efefef;
      border-radius: 3px;
      margin-top: 15px;
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
