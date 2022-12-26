<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:34:06
 * @LastEditors: Quarter
 * @Description: 日期时间选择弹窗
 * @FilePath: /simple-ui/packages/date-time-picker/src/date-time-picker-popover.vue
-->
<template>
  <div class="s-date-time-picker-popover">
    <div class="picker-input">
      <s-input width="140px" :value="dateStr" placeholder="选择日期" readonly></s-input>
      <s-popover ref="popover" border-radius="4px" @switch="switchPopover">
        <s-input
          width="130px"
          slot="reference"
          :value="timeStr"
          placeholder="选择时间"
          readonly
        ></s-input>
        <div ref="123" class="date-picker-popover">
          <s-time-picker-popover
            ref="timePicker"
            :date="dateStr"
            :time="date"
            :min="minTimeStr"
            :max="maxTimeStr"
            :formate="timeFormate"
            @close="closePopover"
            @confirm="confirmPopover"
          ></s-time-picker-popover>
        </div>
      </s-popover>
    </div>
    <div class="split-line"></div>
    <div class="picker-header">
      <div class="left-operation">
        <s-button type="normal" v-show="yearSwitchVisible" @click="previousYear">
          <i class="s-icon-d-arrow-left"></i>
        </s-button>
        <s-button type="normal" v-show="monthSwitchVisible" @click="previousMonth">
          <i class="s-icon-arrow-left"></i>
        </s-button>
      </div>
      <div class="date-info">
        <s-button type="normal" v-show="datePickerVisible" @click="showYearPicker"
          >{{ yearStr }} 年</s-button
        >
        <s-button type="normal" v-show="datePickerVisible" @click="showMonthPicker"
          >{{ monthStr }} 月</s-button
        >
        <span v-show="yearPickerVisible">{{ yearStr }} 年</span>
        <span v-show="monthPickerVisible">{{ monthStr }} 月</span>
      </div>
      <div class="right-operation">
        <s-button type="normal" v-show="monthSwitchVisible" @click="nextMonth">
          <i class="s-icon-arrow-right"></i>
        </s-button>
        <s-button type="normal" v-show="yearSwitchVisible" @click="nextYear">
          <i class="s-icon-d-arrow-right"></i>
        </s-button>
      </div>
    </div>
    <div class="picker-content">
      <div class="date-picker" v-show="datePickerVisible">
        <ul class="date-header">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <div class="split-line"></div>
        <ul>
          <li v-for="item of monthDay" :key="`date-item-${item.time}`">
            <s-button
              type="none"
              :class="{
                'date-disabled': !item.enable,
                'inner-range': item.select,
                'date-selected': dateSelected === item.time,
              }"
              @click="selectDate(item.time, item.enable)"
              >{{ item.date }}</s-button
            >
          </li>
        </ul>
      </div>
      <div class="year-picker" v-show="yearPickerVisible">
        <ul>
          <li v-for="year of yearArray" :key="`year-item-${year}`">
            <s-button
              type="none"
              :class="{ 'date-selected': currentYear === year }"
              @click="selectYear(year)"
              >{{ year }} 年</s-button
            >
          </li>
        </ul>
      </div>
      <div class="month-picker" v-show="monthPickerVisible">
        <ul>
          <li v-for="month of 12" :key="`month-item-${month}`">
            <s-button
              type="none"
              :class="{ 'date-selected': currentMonth === month }"
              @click="selectMonth(month)"
              >{{ month }} 月</s-button
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Popover } from "packages/popover";
import STimePickerPopover from "packages/time-picker/src/time-picker-popover.vue";
import { DayConfig } from "packages/date-picker";
import { TimeConfig } from "packages/time-picker";
import { dateFormate } from "packages/util";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DateTimeConfig } from "./types";

@Component({
  name: "SDateTimePickerPopover",
  components: {
    SPopover: Popover,
    STimePickerPopover,
  },
})
export default class DateTimePickerPopover extends Vue {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: String; // 高度

  @Prop(Number)
  value?: number; // 值

  @Prop({
    type: String,
    default: "yyyy-MM-dd hh:mm:ss",
  })
  formate?: string; // 格式化字符串

  @Prop({
    type: Number,
    default: 0,
  })
  min!: number; // 最小值

  @Prop({
    type: Number,
    default: 0,
  })
  max!: number; // 最大值

  @Prop({
    type: Number,
    default: 0,
  })
  left!: number; // 左区间

  @Prop({
    type: Number,
    default: 0,
  })
  right!: number; // 右区间

  date: DateTimeConfig = {
    // 当前日期
    date: new Date(Date.now()),
    hour: null,
    minute: null,
    second: null,
  };
  dateSelected = 0; // 选择的日期
  monthDay: DayConfig[] = []; // 每月的号数
  datePickerVisible = true; // 显示日期选择
  yearPickerVisible = false; // 显示年份选择
  yearToChoose = 0; // 当前年份
  yearArray: number[] = []; // 可选的年份号
  monthPickerVisible = false; // 显示月份选择

  /**
   * @description: 同步的值
   * @return {number}
   */
  get syncedValue(): number {
    if (typeof this.value === "number") {
      return this.value;
    }
    return 0;
  }

  /**
   * @description: 同步的值
   * @param {number} val 值
   * @return
   */
  set syncedValue(val: number) {
    this.$emit("update:value", val);
  }

  /**
   * @description: 时间格式化字符串
   * @return {String}
   */
  get timeFormate(): string {
    if (typeof this.formate === "string") {
      const arr: RegExpMatchArray | null = this.formate.match(new RegExp(/[smh:]+/));
      if (arr && arr.length > 0) {
        return arr[0];
      }
      return "";
    }
    return "hh:mm:ss";
  }

  /**
   * @description: 年份字符串
   * @return {String}
   */
  get yearStr(): string | undefined {
    if (this.date.date instanceof Date) {
      return dateFormate(this.date.date, "yyyy");
    }
    return undefined;
  }

  /**
   * @description: 月份格式化字符串
   * @return {String}
   */
  get monthStr(): string | undefined {
    if (this.date.date instanceof Date) {
      return dateFormate(this.date.date, "MM");
    }
    return undefined;
  }

  /**
   * @description: 当前年份
   * @return {Number}
   */
  get currentYear(): number {
    if (this.date.date instanceof Date) {
      return this.date.date.getFullYear();
    }
    return 0;
  }

  /**
   * @description: 当前月份
   * @return {Number}
   */
  get currentMonth(): number {
    if (this.date.date instanceof Date) {
      return this.date.date.getMonth() + 1;
    }
    return 0;
  }

  /**
   * @description: 是否显示年份切换
   * @return {Boolean}
   */
  get yearSwitchVisible(): boolean {
    return this.datePickerVisible || this.yearPickerVisible;
  }

  /**
   * @description: 是否显示月份
   * @return {Boolean}
   */
  get monthSwitchVisible(): boolean {
    return this.datePickerVisible;
  }

  /**
   * @description: 日期字符串
   * @return {String}
   */
  get dateStr(): string | null {
    if (this.dateSelected > 0) {
      return dateFormate(this.dateSelected, "yyyy-MM-dd");
    }
    return null;
  }

  /**
   * @description: 最小时间字符串
   * @return {String}
   */
  get minTimeStr(): string | undefined {
    if (typeof this.min === "number" && this.min > 0) {
      return dateFormate(this.min, "yyyy-MM-dd hh:mm:ss");
    }
    return undefined;
  }

  /**
   * @description: 最大时间字符串
   * @return {String}
   */
  get maxTimeStr(): string | undefined {
    if (typeof this.max === "number" && this.max > 0) {
      return dateFormate(this.max, "yyyy-MM-dd hh:mm:ss");
    }
    return undefined;
  }

  /**
   * @description: 最小日期时间戳
   * @return {Number}
   */
  get minDateTime(): number | undefined {
    if (typeof this.min === "number" && this.min > 0) {
      return new Date(dateFormate(this.min, "yyyy-MM-dd 00:00:00")).getTime();
    }
    return undefined;
  }

  /**
   * @description: 最大日期时间戳
   * @return {Number}
   */
  get maxDateTime(): number | undefined {
    if (typeof this.max === "number" && this.max > 0) {
      return new Date(dateFormate(this.max, "yyyy-MM-dd 00:00:00")).getTime();
    }
    return undefined;
  }

  /**
   * @description: 时间字符串
   * @return {String}
   */
  get timeStr(): string | null {
    const { hour, minute, second } = this.date;
    if (typeof hour === "number") {
      const hourStr: string =
        new Array(2 - hour.toString().length).fill(0).join("") + hour.toString();
      const minuteStr: string =
        new Array(2 - (minute || 0).toString().length).fill(0).join("") + (minute || 0).toString();
      const secondStr: string =
        new Array(2 - (second || 0).toString().length).fill(0).join("") + (second || 0).toString();
      return `${hourStr}:${minuteStr}:${secondStr}`;
    }
    return null;
  }

  /**
   * @description: 时间字符串
   * @return {String}
   */
  get fullTimeStr(): string | null {
    const { hour, minute, second } = this.date;
    if (typeof hour === "number") {
      const hourStr: string =
        new Array(2 - hour.toString().length).fill(0).join("") + hour.toString();
      const minuteStr: string =
        new Array(2 - (minute || 0).toString().length).fill(0).join("") + (minute || 0).toString();
      const secondStr: string =
        new Array(2 - (second || 0).toString().length).fill(0).join("") + (second || 0).toString();
      return `${hourStr}:${minuteStr}:${secondStr}`;
    }
    return null;
  }

  /**
   * @description: 选择的时间日期
   * @return {Number}
   */
  get dateTimeSelected(): number {
    if (this.dateSelected > 0) {
      if (this.timeStr) {
        return new Date(
          `${dateFormate(this.dateSelected, "yyyy-MM-dd")} ${this.fullTimeStr}`,
        ).getTime();
      }
      return this.dateSelected;
    }
    return 0;
  }

  /**
   * @description: 选择的时间日期
   * @param {Number} value 值
   * @return
   */
  set dateTimeSelected(value: number) {
    if (typeof value === "number" && value > 0) {
      let time: Date = new Date(value);
      if (this.minTimeStr && time.getTime() < new Date(this.minTimeStr).getTime()) {
        time = new Date(this.minTimeStr);
      }
      if (this.maxTimeStr && time.getTime() > new Date(this.maxTimeStr).getTime()) {
        time = new Date(this.maxTimeStr);
      }
      this.dateSelected = new Date(time.getFullYear(), time.getMonth(), time.getDate()).getTime();
      this.date = {
        date: time,
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
      };
    } else {
      let time: Date = new Date(Date.now());
      if (this.minTimeStr && time.getTime() < new Date(this.minTimeStr).getTime()) {
        time = new Date(this.minTimeStr);
      }
      if (this.maxTimeStr && time.getTime() > new Date(this.maxTimeStr).getTime()) {
        time = new Date(this.maxTimeStr);
      }
      this.dateSelected = 0;
      this.date = {
        date: time,
        hour: null,
        minute: null,
        second: null,
      };
    }
  }

  /**
   * @description: 监听传入值变化
   * @param {String} timeStr 时间字符串
   * @return
   */
  @Watch("value")
  handleValueChange(): void {
    if (typeof this.syncedValue === "number") {
      if (this.syncedValue > 0) {
        const date: Date = new Date(dateFormate(this.syncedValue, "yyyy-MM-dd hh:mm:ss"));
        this.dateTimeSelected = date.getTime();
      } else if (this.syncedValue === 0) {
        this.dateTimeSelected = 0;
      }
    } else {
      this.dateTimeSelected = 0;
    }
  }

  /**
   * @description: 监听选中值变化
   * @param {Number} time 时间戳
   * @return
   */
  @Watch("dateTimeSelected")
  handleDateTimeSelectedChange(time: number): void {
    if (typeof time === "number") {
      this.calcDateSelect();
      if (time > 0) {
        this.syncedValue = this.dateTimeSelected;
        this.$emit("change", this.dateTimeSelected);
      }
    }
  }

  /**
   * @description: 区间限制
   * @return
   */
  @Watch("min")
  @Watch("max")
  @Watch("left")
  @Watch("right")
  handleIntervalChange(): void {
    let { date } = this.date;
    if (this.minTimeStr && date.getTime() < new Date(this.minTimeStr).getTime()) {
      date = new Date(this.minTimeStr);
    }
    if (this.maxTimeStr && date.getTime() > new Date(this.maxTimeStr).getTime()) {
      date = new Date(this.maxTimeStr);
    }
    this.date.date = date;
    this.calcMonthDay(this.date.date);
  }

  /**
   * @description: 计算当月日期结构
   * @param {Date} 变化的日期
   * @return
   */
  @Watch("date.date", {
    immediate: true,
  })
  handleDataChange(date: Date): void {
    this.calcMonthDay(date);
  }

  /**
   * @description: 点击弹窗
   * @param {Boolean} visible 是否显示
   * @return
   */
  init(): void {
    this.handleValueChange();
    this.handleIntervalChange();
    this.datePickerVisible = true;
    this.yearPickerVisible = false;
    this.monthPickerVisible = false;
  }

  /**
   * @description: 获取选择器的值
   * @return
   */
  getSelectorValue(date?: number): number | undefined {
    if (typeof date === "number" && date > 0) {
      this.dateTimeSelected = date;
    }
    if (typeof this.dateTimeSelected === "number" && this.dateTimeSelected > 0) {
      return this.dateTimeSelected;
    }
  }

  /**
   * @description:

   * @return
   */
  calcMonthDay(date: Date): void {
    if (date instanceof Date) {
      // 计算当月天数
      const dayArray: DayConfig[] = [];
      const oneDay = 24 * 60 * 60 * 1000;
      const today: Date = new Date(dateFormate(date, "yyyy-MM-dd 00:00:00"));
      const dayLength: number = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      const firstDay: number = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
      const weekLength: number = Math.ceil((dayLength + firstDay) / 7);
      let tempDate: Date = new Date(
        new Date(today.getFullYear(), today.getMonth(), 1).getTime() - firstDay * oneDay,
      );
      for (let i = 0; i < weekLength * 7; i++) {
        let enable: boolean = tempDate.getMonth() === today.getMonth();
        if (
          typeof this.minDateTime === "number" &&
          this.minDateTime > 0 &&
          tempDate.getTime() < this.minDateTime
        ) {
          enable = false;
        }
        if (
          typeof this.maxDateTime === "number" &&
          this.maxDateTime > 0 &&
          tempDate.getTime() > this.maxDateTime
        ) {
          enable = false;
        }
        dayArray.push({
          time: tempDate.getTime(),
          date: tempDate.getDate(),
          enable,
        });
        tempDate = new Date(tempDate.getTime() + oneDay);
      }
      this.monthDay = dayArray;
      this.calcDateSelect();
    }
  }

  /**
   * @description: 切换弹窗显示
   * @param {Boolean} visible 是否显示
   * @return
   */
  switchPopover(visible: boolean): void {
    if (visible === true && this.$refs.timePicker instanceof STimePickerPopover) {
      (this.$refs.timePicker as InstanceType<typeof STimePickerPopover>).init();
    }
  }

  /**
   * @description: 计算是否在值域内
   * @return
   */
  calcDateSelect(): void {
    const hasLeft: boolean = typeof this.left === "number" && this.left > 0;
    const hasRight: boolean = typeof this.right === "number" && this.right > 0;
    const dayArray: DayConfig[] = this.monthDay.slice();
    dayArray.forEach((day: DayConfig, index: number) => {
      let select = false;
      if (hasLeft && hasRight) {
        if (day.time <= this.right && day.time >= this.left) {
          select = true;
        }
      } else if (hasLeft) {
        if (this.dateSelected > 0 && day.time >= this.left && day.time <= this.dateTimeSelected) {
          select = true;
        }
      } else if (hasRight) {
        if (this.dateSelected > 0 && day.time <= this.right && day.time >= this.dateTimeSelected) {
          select = true;
        }
      }
      dayArray[index].select = select;
    });
    this.monthDay = dayArray;
  }

  /**
   * @description: 上一年
   * @return
   */
  previousYear(): void {
    if (this.datePickerVisible === true) {
      const date: Date = new Date(
        this.date.date.getFullYear() - 1,
        this.date.date.getMonth(),
        this.date.date.getDate(),
      );
      this.date.date = date;
    } else if (this.yearPickerVisible === true) {
      const yearToChoose: number = this.yearToChoose - 10;
      if (yearToChoose > 0) {
        this.yearToChoose = yearToChoose;
        this.calcSelectYears();
      }
    }
  }

  /**
   * @description: 下一年
   * @return
   */
  nextYear(): void {
    if (this.datePickerVisible === true) {
      const date: Date = new Date(
        this.date.date.getFullYear() + 1,
        this.date.date.getMonth(),
        this.date.date.getDate(),
      );
      this.date.date = date;
    } else if (this.yearPickerVisible === true) {
      const yearToChoose: number = this.yearToChoose + 10;
      if (yearToChoose < 10000) {
        this.yearToChoose = yearToChoose;
        this.calcSelectYears();
      }
    }
  }

  /**
   * @description: 上个月
   * @return
   */
  previousMonth(): void {
    let month: number = this.date.date.getMonth() - 1;
    const date: Date = new Date(
      this.date.date.getFullYear(),
      this.date.date.getMonth(),
      this.date.date.getDate(),
    );
    if (month < 0) {
      month += 12;
      date.setFullYear(date.getFullYear() - 1);
    }
    date.setMonth(month);
    this.date.date = date;
  }

  /**
   * @description: 下个月
   * @return
   */
  nextMonth(): void {
    let month: number = this.date.date.getMonth() + 1;
    const date: Date = new Date(
      this.date.date.getFullYear(),
      this.date.date.getMonth(),
      this.date.date.getDate(),
    );
    if (month > 11) {
      month -= 12;
      date.setFullYear(date.getFullYear() + 1);
    }
    date.setMonth(month);
    this.date.date = date;
  }

  /**
   * @description: 选择日期
   * @param {Number} 时间戳
   * @param {Boolean} 是否可以选择
   * @return
   */
  selectDate(time: number, enable: boolean) {
    const date: Date = new Date(time);
    if (this.date.date.getMonth() === date.getMonth() && enable === true) {
      this.dateSelected = time;
    }
  }

  /**
   * @description: 清空选中的日期
   * @return
   */
  clearValue(): void {
    this.dateSelected = 0;
  }

  /**
   * @description: 显示年份选择
   * @return
   */
  showYearPicker(): void {
    this.datePickerVisible = false;
    this.yearPickerVisible = true;
    if (this.date.date instanceof Date) {
      this.yearToChoose = this.date.date.getFullYear();
      this.calcSelectYears();
    }
  }

  /**
   * @description: 计算当前可选的年份
   * @return
   */
  calcSelectYears(): void {
    if (this.date.date instanceof Date) {
      const date: number = Math.floor(this.yearToChoose / 10) * 10;
      const yearArray: number[] = [];
      for (let i = 0; i < 10; i++) {
        yearArray.push(date + i);
      }
      this.yearArray = yearArray;
    }
  }

  /**
   * @description: 选择年份
   * @param {Number} year 年份
   * @return
   */
  selectYear(year: number): void {
    if (typeof year === "number" && this.date.date instanceof Date) {
      const date: Date = new Date(this.date.date.getTime());
      date.setFullYear(year);
      this.date.date = date;
      this.yearPickerVisible = false;
      this.datePickerVisible = true;
    }
  }

  /**
   * @description: 显示月份选择
   * @return
   */
  showMonthPicker(): void {
    this.datePickerVisible = false;
    this.monthPickerVisible = true;
  }

  /**
   * @description: 选择月份
   * @param {Number} month 月份
   * @return
   */
  selectMonth(month: number): void {
    if (typeof month === "number" && this.date.date instanceof Date) {
      const date: Date = new Date(this.date.date.getTime());
      date.setMonth(month - 1);
      this.date.date = date;
      this.monthPickerVisible = false;
      this.datePickerVisible = true;
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
        this.date.hour = hour;
      }
      if (typeof minute === "number") {
        this.date.minute = minute;
      }
      if (typeof second === "number") {
        this.date.second = second;
      }
    }
    this.closePopover();
  }
}
</script>

<style lang="scss">
.s-date-time-picker-popover {
  user-select: none;

  button.s-button:not(:last-child) {
    margin-right: 0;
  }

  .split-line {
    width: 100%;
    height: 1px;
    background-color: #e1dee2;
    margin: 5px 0;
  }

  .picker-input {
    width: 100%;
    padding: 15px 12px 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .s-input {
      text-align: center;
    }
  }

  .picker-header {
    height: 50px;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .s-button {
      padding: 0 8px;

      i {
        margin: 0;
      }

      &:not(:first-of-type) {
        margin-left: 5px;
      }
    }

    .date-info {
      width: 120px;
      color: #666666;
      font-size: 16px;
      font-weight: 500;
      text-align: center;

      .s-button {
        padding: 0 5px;
        font-size: 16px;
        font-weight: 500;

        &:not(:first-of-type) {
          margin-left: 0;
        }
      }
    }
  }

  .picker-content {
    padding: 0 12px;

    .date-picker ul {
      width: 280px;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;

      li {
        width: 40px;
        height: 40px;
        color: #666666;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          width: 26px;
          height: 26px;
          padding: 0;
          color: #666666;
          font-size: 14px;
          text-align: center;
          border-radius: 13px;
          box-sizing: border-box;
          transition: none;

          &.date-disabled {
            color: #d6e1e5;
            cursor: default;
          }

          &:not(.date-disabled):hover,
          &:not(.date-disabled).date-selected {
            color: #ffffff;
            background-color: #549fff;
          }

          &.date-disabled.inner-range {
            border: 1px solid #d6e1e5;
          }

          &:not(.date-disabled):not(.date-selected).inner-range {
            color: #549fff;
            border: 1px solid #549fff;

            &:hover {
              color: #ffffff;
            }
          }
        }
      }
    }

    .year-picker ul,
    .month-picker ul {
      width: 300px;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      margin: 5px 0 0;

      li {
        width: 100px;
        height: 50px;
        color: #666666;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          padding: 0;
          color: #666666;
          font-size: 14px;
          text-align: center;
          border-radius: 13px;
          transition: none;

          &:hover,
          &.date-selected {
            color: #549fff;
          }
        }
      }
    }
  }
}
</style>
