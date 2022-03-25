<!--
 * @Author: Quarter
 * @Date: 2020-08-20 14:20:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-18 08:22:25
 * @Description: 日期选择器弹窗
-->
<template>
  <div class="simple-time-selector">
    <div class="hour-list" @mouseleave="calibrateActiveHour">
      <simple-scroll ref="hourScroll" full @scroll="judgeActiveHour">
        <ul>
          <li
            v-for="(item, index) of hourArr"
            :key="`insideHour-item-${item}`"
            :class="{
              active: insideTime.hour === index,
              disabled: calcHourStatus(index),
            }"
          >{{ item }}</li>
        </ul>
      </simple-scroll>
    </div>
    <div class="minute-list" v-if="showMinute" @mouseleave="calibrateActiveMinute">
      <simple-scroll ref="minuteScroll" full @scroll="judgeActiveMinute">
        <ul>
          <li
            v-for="(item, index) of minuteArr"
            :key="`insideMinute-item-${item}`"
            :class="{
              active: insideTime.minute === index,
              disabled: calcMinuteStatus(index),
            }"
          >{{ item }}</li>
        </ul>
      </simple-scroll>
    </div>
    <div class="second-list" v-if="showSecond" @mouseleave="calibrateActiveSecond">
      <simple-scroll ref="secondScroll" full @scroll="judgeActiveSecond">
        <ul>
          <li
            v-for="(item, index) of minuteArr"
            :key="`insideSecond-item-${item}`"
            :class="{
              active: insideTime.second === index,
              disabled: calcSecondStatus(index),
            }"
          >{{ item }}</li>
        </ul>
      </simple-scroll>
    </div>
    <div class="active-window"></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { DEFAULT_DATE } from "../constants";
import { SimpleDateTimeConfig, SimpleTimeConfig } from "../types";
import SimpleScroll from "./SimpleScroll.vue";

export default Vue.extend({
  name: "SimpleTimeSelector",
  props: {
    width: String, // 宽度
    height: String, // 高度
    value: Object as PropOptions<SimpleTimeConfig | SimpleDateTimeConfig>, // 值
    formate: { // 格式化字符串
      type: String,
      default: "hh:mm:ss",
    },
    date: String, // 日期
    min: String, // 最小值
    max: String, // 最大值
    quick: { // 是否显示快捷操作
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      insideTime: { // 内部时间
        hour: 0,
        minute: 0,
        second: 0,
      } as SimpleTimeConfig,
    };
  },
  computed: {
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {SimpleTimeConfig | SimpleDateTimeConfig | undefined}
     */
    syncedValue: {
      get(): SimpleTimeConfig | SimpleDateTimeConfig | undefined {
        return this.value;
      },
      set(val: SimpleTimeConfig | SimpleDateTimeConfig): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      }
    },
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
     * @description: 显示分钟
     * @author: Quarter
     * @return
     */
    showMinute(): boolean {
      if (typeof this.formate === "string") {
        return new RegExp(/m+/).test(this.formate);
      }
      return true;
    },
    /**
     * @description: 显示秒
     * @author: Quarter
     * @return
     */
    showSecond(): boolean {
      if (typeof this.formate === "string") {
        return new RegExp(/s+/).test(this.formate);
      }
      return true;
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
     * @description: 完整的时间
     * @author: Quarter
     * @return {Number}
     */
    wholeTime(): number | undefined {
      const { hour, minute, second } = this.insideTime;
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
        return new Date(
          `${this.filterDate} ${hourStr}:${minuteStr}:${secondStr}`
        ).getTime();
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
     * @description: 监听时间的变化
     * @author: Quarter
     * @return
     */
    value: {
      immediate: true,
      handler(): void {
        this.handleTimeChange();
      },
    },
    /**
     * @description: 监听内部时间变化
     * @author: Quarter
     * @return
     */
    insideTime: {
      deep: true,
      handler(): void {
        this.syncedValue = this.insideTime;
      },
    },
  },
  methods: {
    /**
     * @description: 初始化
     * @author: Quarter
     * @return
     */
    init(): void {
      this.$nextTick(() => {
        this.handleTimeChange();
        this.calibrateActiveHour();
        this.calibrateActiveMinute();
        this.calibrateActiveSecond();
      });
    },
    /**
     * @description: 处理时间变化
     * @author: Quarter
     * @return
     */
    handleTimeChange(): void {
      if (this.syncedValue) {
        const { hour, minute, second } = this.syncedValue;
        if (typeof hour === "number") {
          if (
            typeof this.minTime === "number" &&
            new Date(`${this.filterDate} ${hour}:00:00`).getTime() < this.minTime
          ) {
            this.insideTime.hour = new Date(this.minTime).getHours();
          } else if (
            typeof this.maxTime === "number" &&
            new Date(`${this.filterDate} ${hour}:00:00`).getTime() > this.maxTime
          ) {
            this.insideTime.hour = new Date(this.maxTime).getHours();
          } else {
            this.insideTime.hour = hour;
          }
        } else {
          this.insideTime.hour = 0;
        }
        if (typeof minute === "number") {
          if (
            typeof this.minTime === "number" &&
            new Date(
              `${this.filterDate} ${this.insideTime.hour}:${minute}:00`
            ).getTime() < this.minTime
          ) {
            this.insideTime.minute = new Date(this.minTime).getMinutes();
          } else if (
            typeof this.maxTime === "number" &&
            new Date(
              `${this.filterDate} ${this.insideTime.hour}:${minute}:00:00`
            ).getTime() > this.maxTime
          ) {
            this.insideTime.minute = new Date(this.maxTime).getMinutes();
          } else {
            this.insideTime.minute = minute;
          }
        } else {
          this.insideTime.minute = 0;
        }
        if (typeof second === "number") {
          if (
            typeof this.minTime === "number" &&
            new Date(
              `${this.filterDate} ${this.insideTime.hour}:${this.insideTime.minute}:${second}`
            ).getTime() < this.minTime
          ) {
            this.insideTime.second = new Date(this.minTime).getSeconds();
          } else if (
            typeof this.maxTime === "number" &&
            new Date(
              `${this.filterDate} ${this.insideTime.hour}:${this.insideTime.minute}:${second}`
            ).getTime() > this.maxTime
          ) {
            this.insideTime.second = new Date(this.maxTime).getSeconds();
          } else {
            this.insideTime.second = second;
          }
        } else {
          this.insideTime.second = 0;
        }
      }
    },
    /**
     * @description: 确认使用时间
     * @author: Quarter
     * @return {Number}
     */
    confirmValue(time?: number): number {
      let temp: number = Date.now();
      if (typeof time === "number") {
        temp = time;
      } else if (typeof this.wholeTime === "number") {
        temp = this.wholeTime;
      }
      if (this.minTime && temp < this.minTime) {
        temp = this.minTime;
      }
      if (this.maxTime && temp > this.maxTime) {
        temp = this.maxTime;
      }
      this.calibrateActiveHour();
      this.calibrateActiveMinute();
      this.calibrateActiveSecond();
      return temp;
    },
    /**
     * @description: 判断选中小时
     * @author: Quarter
     * @return
     */
    judgeActiveHour(e: WheelEvent): void {
      if (e.target instanceof HTMLElement) {
        const top: number = e.target.scrollTop;
        if (typeof top === "number") {
          this.insideTime.hour = Math.round(top / 36);
        }
      }
    },
    /**
     * @description: 校准小时选中项
     * @author: Quarter
     * @return
     */
    calibrateActiveHour(): void {
      if (this.$refs.hourScroll instanceof SimpleScroll) {
        (this.$refs.hourScroll as any).scroll((this.insideTime.hour || 0) * 36);
      }
    },
    /**
     * @description: 计算小时状态
     * @author: Quarter
     * @param {Number} hour 小时
     * @return {Boolean}
     */
    calcHourStatus(hour: number): boolean {
      const hourStr: string =
        new Array(2 - hour.toString().length).fill(0).join("") + hour.toString();
      if (typeof this.minTime === "number" && this.minTime > 0) {
        if (
          new Date(`${this.filterDate} ${hourStr}:59:59`).getTime() < this.minTime
        ) {
          return true;
        }
      }
      if (typeof this.maxTime === "number" && this.maxTime > 0) {
        if (
          new Date(`${this.filterDate} ${hourStr}:00:00`).getTime() > this.maxTime
        ) {
          return true;
        }
      }
      return false;
    },
    /**
     * @description: 判断选中分钟
     * @author: Quarter
     * @return
     */
    judgeActiveMinute(e: WheelEvent): void {
      if (e.target instanceof HTMLElement) {
        const top: number = e.target.scrollTop;
        if (typeof top === "number") {
          this.insideTime.minute = Math.round(top / 36);
        }
      }
    },
    /**
     * @description: 校准分钟选中项
     * @author: Quarter
     * @return
     */
    calibrateActiveMinute(): void {
      if (this.$refs.minuteScroll instanceof SimpleScroll) {
        (this.$refs.minuteScroll as any).scroll((this.insideTime.minute || 0) * 36);
      }
    },
    /**
     * @description: 计算分钟状态
     * @author: Quarter
     * @param {Number} minute 分钟
     * @return {Boolean}
     */
    calcMinuteStatus(minute: number): boolean {
      const hourStatus: boolean = this.calcHourStatus(this.insideTime.hour || 0);
      if (hourStatus) {
        return true;
      }
      const hourStr: string =
        new Array(2 - (this.insideTime.hour || "0").toString().length)
          .fill(0)
          .join("") + (this.insideTime.hour || "0").toString();
      const minuteStr: string =
        new Array(2 - minute.toString().length).fill(0).join("") +
        minute.toString();
      if (typeof this.minTime === "number" && this.minTime > 0) {
        if (
          new Date(`${this.filterDate} ${hourStr}:${minuteStr}:59`).getTime() <
          this.minTime
        ) {
          return true;
        }
      }
      if (typeof this.maxTime === "number" && this.maxTime > 0) {
        if (
          new Date(`${this.filterDate} ${hourStr}:${minuteStr}:0`).getTime() >
          this.maxTime
        ) {
          return true;
        }
      }
      return false;
    },
    /**
     * @description: 判断选中秒
     * @author: Quarter
     * @return
     */
    judgeActiveSecond(e: WheelEvent): void {
      if (e.target instanceof HTMLElement) {
        const top: number = e.target.scrollTop;
        if (typeof top === "number") {
          this.insideTime.second = Math.round(top / 36);
        }
      }
    },
    /**
     * @description: 校准秒选中项
     * @author: Quarter
     * @return
     */
    calibrateActiveSecond(): void {
      if (this.$refs.secondScroll instanceof SimpleScroll) {
        (this.$refs.secondScroll as any).scroll((this.insideTime.second || 0) * 36);
      }
    },
    /**
     * @description: 计算秒状态
     * @author: Quarter
     * @param {Number} minute 分钟
     * @return {Boolean}
     */
    calcSecondStatus(second: number): boolean {
      if (this.showSecond === false) {
        return true;
      }
      const hourStatus: boolean = this.calcHourStatus(this.insideTime.hour || 0);
      if (hourStatus) {
        return true;
      }
      const minuteStatus: boolean = this.calcMinuteStatus(
        this.insideTime.minute || 0
      );
      if (minuteStatus) {
        return true;
      }
      const hourStr: string =
        new Array(2 - (this.insideTime.hour || "0").toString().length)
          .fill(0)
          .join("") + (this.insideTime.hour || "0").toString();
      const minuteStr: string =
        new Array(2 - (this.insideTime.minute || "0").toString().length)
          .fill(0)
          .join("") + (this.insideTime.minute || "0").toString();
      const secondStr: string =
        new Array(2 - second.toString().length).fill(0).join("") +
        second.toString();
      if (typeof this.minTime === "number" && this.minTime > 0) {
        if (
          new Date(
            `${this.filterDate} ${hourStr}:${minuteStr}:${secondStr}`
          ).getTime() < this.minTime
        ) {
          return true;
        }
      }
      if (typeof this.maxTime === "number" && this.maxTime > 0) {
        if (
          new Date(
            `${this.filterDate} ${hourStr}:${minuteStr}:${secondStr}`
          ).getTime() > this.maxTime
        ) {
          return true;
        }
      }
      return false;
    },
  },
});
</script>

<style lang="scss">
.simple-time-selector {
  width: 180px;
  height: 180px;
  padding: 15px;
  user-select: none;
  display: flex;
  justify-content: center;
  position: relative;

  .hour-list,
  .minute-list,
  .second-list {
    height: 100%;
    flex: 1;

    &:nth-child(n + 2) {
      border-left: 1px solid #f9f9f9;
    }
  }

  ul {
    padding: 72px 0;
    list-style: none;
    margin: 0;

    li {
      width: 100%;
      color: #696969;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        color: #333333;
        font-weight: bold;
      }

      &.disabled,
      &.disabled.active {
        color: #cecece;
        font-weight: normal;
      }
    }
  }

  &::before,
  &::after {
    content: "";
    width: 100%;
    display: block;
    height: 1px;
    background-color: #efefef;
    position: absolute;
    left: 0;
  }

  &::before {
    top: calc(50% - 19px);
  }

  &::after {
    top: calc(50% + 18px);
  }
}
</style>