<!--
 * @Author: Quarter
 * @Date: 2020-08-20 14:20:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-18 08:23:31
 * @Description: 日期选择器弹窗
-->
<template>
  <div class="simple-time-ranger-picker-popover">
    <div class="picker-content">
      <div class="start-time-picker">
        <div class="picker-label">开始时间</div>
        <simple-time-selector
          ref="startTimeSelector"
          v-model="insideStartTime"
          :min="min"
          :max="filterStartMaxTime"
          :formate="formate"
        ></simple-time-selector>
      </div>
      <div class="end-time-picker">
        <div class="picker-label">结束时间</div>
        <simple-time-selector
          ref="endTimeSelector"
          v-model="insideEndTime"
          :min="filterEndMinTime"
          :max="max"
          :formate="formate"
        ></simple-time-selector>
      </div>
    </div>
    <div class="picker-footer">
      <simple-button type="cancel" @click="closePopover">取消</simple-button>
      <simple-button type="confirm" @click="confirmPopover">确定</simple-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { DEFAULT_DATE } from "../constants";
import { SimpleDateTimeConfig, SimpleTimeConfig } from "../types";
import SimpleTimeSelector from "./SimpleTimeSelector.vue";

export default Vue.extend({
  name: "SimpleTimeRangerPickerPopover",
  components: {
    SimpleTimeSelector,
  },
  props: {
    formate: { // 格式化字符串
      type: String,
      default: "hh:mm:ss",
    },
    startTime: Object as PropOptions<SimpleTimeConfig | SimpleDateTimeConfig>, // 开始时间
    endTime: Object as PropOptions<SimpleTimeConfig | SimpleDateTimeConfig>, // 结束时间
    date: String, // 日期
    min: String, // 最小值
    max: String, // 最大值
  },
  data() {
    return {
      insideStartTime: { // 内部开始时间
        hour: 0,
        minute: 0,
        second: 0,
      } as SimpleTimeConfig,
      insideEndTime: { // 内部结束时间
        hour: 0,
        minute: 0,
        second: 0,
      } as SimpleTimeConfig,
    };
  },
  computed: {
    /**
     * @description: 过滤的日期
     * @author: Quarter
     * @return {String}
     */
    filterDate(): string {
      if (typeof this.date === "string") {
        const dateRegExp: RegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
        if (dateRegExp.test(this.date)) {
          return this.date;
        }
      }
      return DEFAULT_DATE;
    },
    /**
     * @description: 最小时间限制
     * @author: Quarter
     * @return {Number}
     */
    minTime(): number | undefined {
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
    },
    /**
     * @description: 最大时间限制
     * @author: Quarter
     * @return {Number}
     */
    maxTime(): number | undefined {
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
    },
    /**
     * @description: 开始时间最大限制
     * @author: Quarter
     * @return {String}
     */
    filterStartMaxTime(): string | undefined {
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
            return new Date(this.maxTime).formate("hh:mm:ss");
          }
        } else {
          return new Date(this.maxTime).formate("hh:mm:ss");
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
    },
    /**
     * @description: 结束时间最小限制
     * @author: Quarter
     * @return {String}
     */
    filterEndMinTime(): string | undefined {
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
            return new Date(this.minTime).formate("hh:mm:ss");
          }
        } else {
          return new Date(this.minTime).formate("hh:mm:ss");
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
    },
    /**
     * @description: 小时列表
     * @author: Quarter
     * @return {Array<String>}
     */
    hourArr(): string[] {
      return new Array(24).fill("0").map((value: any, index: number) => {
        const str: string = index.toString();
        return new Array(2 - str.length).fill(0).join("") + str;
      });
    },
    /**
     * @description: 分钟列表
     * @author: Quarter
     * @return {Array<String>}
     */
    minuteArr(): string[] {
      return new Array(60).fill("0").map((value: any, index: number) => {
        const str: string = index.toString();
        return new Array(2 - str.length).fill(0).join("") + str;
      });
    },
  },
  watch: {
    /**
     * @description: 监听开始时间的变化
     * @author: Quarter
     * @return
     */
    startTime: {
      immediate: true,
      handler(): void {
        this.handleStartTimeChange();
      },
    },
    /**
     * @description: 监听结束时间的变化
     * @author: Quarter
     * @return
     */
    endTime: {
      immediate: true,
      handler(): void {
        this.handleEndTimeChange();
      },
    },
  },
  methods: {
    /**
     * @description: 处理开始时间变化
     * @author: Quarter
     * @return
     */
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
    },
    /**
     * @description: 处理结束始时间变化
     * @author: Quarter
     * @return
     */
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
    },
    /**
     * @description: 初始化
     * @author: Quarter
     * @return
     */
    init(): void {
      this.$nextTick(() => {
        this.handleStartTimeChange();
        this.handleEndTimeChange();
        if (this.$refs.startTimeSelector instanceof SimpleTimeSelector) {
          (this.$refs.startTimeSelector as any).init();
        }
        if (this.$refs.endTimeSelector instanceof SimpleTimeSelector) {
          (this.$refs.endTimeSelector as any).init();
        }
      });
    },
    /**
     * @description: 关闭弹出层
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      this.$emit("close");
    },
    /**
     * @description: 确认时间
     * @author: Quarter
     * @return
     */
    confirmPopover(): void {
      if (this.$refs.startTimeSelector instanceof SimpleTimeSelector) {
        const startTime: Date = new Date(
          (this.$refs.startTimeSelector as any).confirmValue()
        );
        this.insideStartTime = {
          hour: startTime.getHours(),
          minute: startTime.getMinutes(),
          second: startTime.getSeconds(),
        };
      }
      if (this.$refs.endTimeSelector instanceof SimpleTimeSelector) {
        const endTime: Date = new Date((this.$refs.endTimeSelector as any).confirmValue());
        this.insideEndTime = {
          hour: endTime.getHours(),
          minute: endTime.getMinutes(),
          second: endTime.getSeconds(),
        };
      }
      this.$emit("confirm", this.insideStartTime, this.insideEndTime);
    },
  },
});
</script>

<style lang="scss">
.simple-time-ranger-picker-popover {
  button.simple-button:not(:last-child) {
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

    .simple-time-selector {
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