<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 16:03:29
 * @LastEditors: Quarter
 * @Description: 时间选择
 * @FilePath: /simple-ui/packages/time-picker/src/time-selector.vue
-->
<template>
  <div class="s-time-selector">
    <div class="hour-list" @mouseleave="calibrateActiveHour">
      <s-scroll ref="hourScroll" full @scroll="judgeActiveHour">
        <ul>
          <li
            v-for="(item, index) of hourArr"
            :key="`insideHour-item-${item}`"
            :class="{
              active: insideTime.hour === index,
              disabled: calcHourStatus(index),
            }"
          >
            {{ item }}
          </li>
        </ul>
      </s-scroll>
    </div>
    <div class="minute-list" v-if="showMinute" @mouseleave="calibrateActiveMinute">
      <s-scroll ref="minuteScroll" full @scroll="judgeActiveMinute">
        <ul>
          <li
            v-for="(item, index) of minuteArr"
            :key="`insideMinute-item-${item}`"
            :class="{
              active: insideTime.minute === index,
              disabled: calcMinuteStatus(index),
            }"
          >
            {{ item }}
          </li>
        </ul>
      </s-scroll>
    </div>
    <div class="second-list" v-if="showSecond" @mouseleave="calibrateActiveSecond">
      <s-scroll ref="secondScroll" full @scroll="judgeActiveSecond">
        <ul>
          <li
            v-for="(item, index) of minuteArr"
            :key="`insideSecond-item-${item}`"
            :class="{
              active: insideTime.second === index,
              disabled: calcSecondStatus(index),
            }"
          >
            {{ item }}
          </li>
        </ul>
      </s-scroll>
    </div>
    <div class="active-window"></div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_DATE } from "packages/constants";
import { DateTimeConfig } from "packages/date-time-picker";
import { Scroll } from "packages/scroll";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TimeConfig } from "./types";

@Component({
  name: "STimeSelector",
  components: {
    SScroll: Scroll,
  },
})
export default class TimeSelector extends Vue {
  $refs!: {
    hourScroll: InstanceType<typeof Scroll>; // 小时滚动条
    minuteScroll: InstanceType<typeof Scroll>; // 分钟滚动条
    secondScroll: InstanceType<typeof Scroll>; // 秒滚动条
  };

  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop(Object)
  value?: TimeConfig | DateTimeConfig; // 值

  @Prop({
    type: String,
    default: "hh:mm:ss",
  })
  formate!: string; // 格式化字符串

  @Prop(String)
  date?: string; // 日期

  @Prop(String)
  min?: string; // 最小值

  @Prop(String)
  max?: string; // 最大值

  @Prop({
    type: Boolean,
    default: false,
  })
  quick!: boolean; // 是否显示快捷操作

  insideTime: TimeConfig = {
    // 内部时间
    hour: 0,
    minute: 0,
    second: 0,
  };

  /**
   * @description: 同步的值
   * @return {TimeConfig | DateTimeConfig | undefined}
   */
  get syncedValue(): TimeConfig | DateTimeConfig | undefined {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @param {TimeConfig | DateTimeConfig | undefined} val 值
   * @return
   */
  set syncedValue(val: TimeConfig | DateTimeConfig | undefined) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 过滤的日期
   * @return {String}
   */
  get filterDate(): string {
    if (typeof this.date === "string") {
      const dateRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
      if (dateRegExp.test(this.date)) {
        return this.date;
      }
    }
    return DEFAULT_DATE;
  }

  /**
   * @description: 显示分钟
   * @return
   */
  get showMinute(): boolean {
    if (typeof this.formate === "string") {
      return new RegExp(/m+/).test(this.formate);
    }
    return true;
  }

  /**
   * @description: 显示秒
   * @return
   */
  get showSecond(): boolean {
    if (typeof this.formate === "string") {
      return new RegExp(/s+/).test(this.formate);
    }
    return true;
  }

  /**
   * @description: 最小时间限制
   * @return {Number}
   */
  get minTime(): number | undefined {
    if (typeof this.min === "string") {
      const timeRegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(this.min)) {
        return new Date(`${DEFAULT_DATE} ${this.min}`).getTime();
      }
      const dateRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (dateRegExp.test(this.min)) {
        return new Date(this.min).getTime();
      }
    }
    return undefined;
  }

  /**
   * @description: 最大时间限制
   * @return {Number}
   */
  get maxTime(): number | undefined {
    if (typeof this.max === "string") {
      const timeRegExp = new RegExp(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (timeRegExp.test(this.max)) {
        return new Date(`${DEFAULT_DATE} ${this.max}`).getTime();
      }
      const dateRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/);
      if (dateRegExp.test(this.max)) {
        return new Date(this.max).getTime();
      }
    }
    return undefined;
  }

  /**
   * @description: 完整的时间
   * @return {Number}
   */
  get wholeTime(): number | undefined {
    const { hour, minute, second } = this.insideTime;
    if (typeof hour === "number") {
      const hourStr: string =
        new Array(2 - hour.toString().length).fill(0).join("") + hour.toString();
      const minuteStr: string =
        new Array(2 - (minute || 0).toString().length).fill(0).join("") + (minute || 0).toString();
      const secondStr: string =
        new Array(2 - (second || 0).toString().length).fill(0).join("") + (second || 0).toString();
      return new Date(`${this.filterDate} ${hourStr}:${minuteStr}:${secondStr}`).getTime();
    }
    return undefined;
  }

  /**
   * @description: 小时列表
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
   * @return {Array<String>}
   */
  get minuteArr(): string[] {
    return new Array(60).fill("0").map((value: any, index: number) => {
      const str: string = index.toString();
      return new Array(2 - str.length).fill(0).join("") + str;
    });
  }

  /**
   * @description: 监听时间的变化
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(): void {
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
          new Date(`${this.filterDate} ${this.insideTime.hour}:${minute}:00`).getTime() <
            this.minTime
        ) {
          this.insideTime.minute = new Date(this.minTime).getMinutes();
        } else if (
          typeof this.maxTime === "number" &&
          new Date(`${this.filterDate} ${this.insideTime.hour}:${minute}:00:00`).getTime() >
            this.maxTime
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
            `${this.filterDate} ${this.insideTime.hour}:${this.insideTime.minute}:${second}`,
          ).getTime() < this.minTime
        ) {
          this.insideTime.second = new Date(this.minTime).getSeconds();
        } else if (
          typeof this.maxTime === "number" &&
          new Date(
            `${this.filterDate} ${this.insideTime.hour}:${this.insideTime.minute}:${second}`,
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
  }

  /**
   * @description: 监听内部时间变化
   * @return
   */
  @Watch("insideTime", {
    deep: true,
  })
  handleInsideTimeChange(): void {
    this.syncedValue = this.insideTime;
  }

  /**
   * @description: 初始化
   * @return
   */
  init(): void {
    this.$nextTick(() => {
      this.handleValueChange();
      this.calibrateActiveHour();
      this.calibrateActiveMinute();
      this.calibrateActiveSecond();
    });
  }

  /**
   * @description: 确认使用时间
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
  }

  /**
   * @description: 判断选中小时
   * @return
   */
  judgeActiveHour(e: WheelEvent): void {
    if (e.target instanceof HTMLElement) {
      const top: number = e.target.scrollTop;
      if (typeof top === "number") {
        this.insideTime.hour = Math.round(top / 36);
      }
    }
  }

  /**
   * @description: 校准小时选中项
   * @return
   */
  calibrateActiveHour(): void {
    if (this.$refs.hourScroll instanceof Scroll) {
      this.$refs.hourScroll.scroll((this.insideTime.hour || 0) * 36);
    }
  }

  /**
   * @description: 计算小时状态
   * @param {Number} hour 小时
   * @return {Boolean}
   */
  calcHourStatus(hour: number): boolean {
    const hourStr: string =
      new Array(2 - hour.toString().length).fill(0).join("") + hour.toString();
    if (typeof this.minTime === "number" && this.minTime > 0) {
      if (new Date(`${this.filterDate} ${hourStr}:59:59`).getTime() < this.minTime) {
        return true;
      }
    }
    if (typeof this.maxTime === "number" && this.maxTime > 0) {
      if (new Date(`${this.filterDate} ${hourStr}:00:00`).getTime() > this.maxTime) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description: 判断选中分钟
   * @return
   */
  judgeActiveMinute(e: WheelEvent): void {
    if (e.target instanceof HTMLElement) {
      const top: number = e.target.scrollTop;
      if (typeof top === "number") {
        this.insideTime.minute = Math.round(top / 36);
      }
    }
  }

  /**
   * @description: 校准分钟选中项
   * @return
   */
  calibrateActiveMinute(): void {
    if (this.$refs.minuteScroll instanceof Scroll) {
      this.$refs.minuteScroll.scroll((this.insideTime.minute || 0) * 36);
    }
  }

  /**
   * @description: 计算分钟状态
   * @param {Number} minute 分钟
   * @return {Boolean}
   */
  calcMinuteStatus(minute: number): boolean {
    const hourStatus: boolean = this.calcHourStatus(this.insideTime.hour || 0);
    if (hourStatus) {
      return true;
    }
    const hourStr: string =
      new Array(2 - (this.insideTime.hour || "0").toString().length).fill(0).join("") +
      (this.insideTime.hour || "0").toString();
    const minuteStr: string =
      new Array(2 - minute.toString().length).fill(0).join("") + minute.toString();
    if (typeof this.minTime === "number" && this.minTime > 0) {
      if (new Date(`${this.filterDate} ${hourStr}:${minuteStr}:59`).getTime() < this.minTime) {
        return true;
      }
    }
    if (typeof this.maxTime === "number" && this.maxTime > 0) {
      if (new Date(`${this.filterDate} ${hourStr}:${minuteStr}:0`).getTime() > this.maxTime) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description: 判断选中秒
   * @return
   */
  judgeActiveSecond(e: WheelEvent): void {
    if (e.target instanceof HTMLElement) {
      const top: number = e.target.scrollTop;
      if (typeof top === "number") {
        this.insideTime.second = Math.round(top / 36);
      }
    }
  }

  /**
   * @description: 校准秒选中项
   * @return
   */
  calibrateActiveSecond(): void {
    if (this.$refs.secondScroll instanceof Scroll) {
      this.$refs.secondScroll.scroll((this.insideTime.second || 0) * 36);
    }
  }

  /**
   * @description: 计算秒状态
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
    const minuteStatus: boolean = this.calcMinuteStatus(this.insideTime.minute || 0);
    if (minuteStatus) {
      return true;
    }
    const hourStr: string =
      new Array(2 - (this.insideTime.hour || "0").toString().length).fill(0).join("") +
      (this.insideTime.hour || "0").toString();
    const minuteStr: string =
      new Array(2 - (this.insideTime.minute || "0").toString().length).fill(0).join("") +
      (this.insideTime.minute || "0").toString();
    const secondStr: string =
      new Array(2 - second.toString().length).fill(0).join("") + second.toString();
    if (typeof this.minTime === "number" && this.minTime > 0) {
      if (
        new Date(`${this.filterDate} ${hourStr}:${minuteStr}:${secondStr}`).getTime() < this.minTime
      ) {
        return true;
      }
    }
    if (typeof this.maxTime === "number" && this.maxTime > 0) {
      if (
        new Date(`${this.filterDate} ${hourStr}:${minuteStr}:${secondStr}`).getTime() > this.maxTime
      ) {
        return true;
      }
    }
    return false;
  }
}
</script>

<style lang="scss">
.s-time-selector {
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
