<!--
 * @Author: Quarter
 * @Date: 2020-08-20 14:20:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 15:26:56
 * @Description: 日期选择器弹窗
-->
<template>
  <div class="simple-date-time-picker-popover">
    <div class="picker-input">
      <simple-input width="140px" :value="dateStr" placeholder="选择日期" readonly></simple-input>
      <simple-popover ref="popover" border-radius="4px" @switch="switchPopover">
        <simple-input width="130px" slot="reference" :value="timeStr" placeholder="选择时间" readonly></simple-input>
        <div ref="123" class="date-picker-popover">
          <simple-time-picker-popover
            ref="timePicker"
            :date="dateStr"
            :time="date"
            :min="minTimeStr"
            :max="maxTimeStr"
            :formate="timeFormate"
            @close="closePopover"
            @confirm="confirmPopover"
          ></simple-time-picker-popover>
        </div>
      </simple-popover>
    </div>
    <div class="split-line"></div>
    <div class="picker-header">
      <div class="left-operation">
        <simple-button type="normal" v-show="yearSwitchVisible" @click="previousYear">
          <i class="simple-icon-d-arrow-left"></i>
        </simple-button>
        <simple-button type="normal" v-show="monthSwitchVisible" @click="previousMonth">
          <i class="simple-icon-arrow-left"></i>
        </simple-button>
      </div>
      <div class="date-info">
        <simple-button
          type="normal"
          v-show="datePickerVisible"
          @click="showYearPicker"
        >{{ yearStr }} 年</simple-button>
        <simple-button
          type="normal"
          v-show="datePickerVisible"
          @click="showMonthPicker"
        >{{ monthStr }} 月</simple-button>
        <span v-show="yearPickerVisible">{{ yearStr }} 年</span>
        <span v-show="monthPickerVisible">{{ monthStr }} 月</span>
      </div>
      <div class="right-operation">
        <simple-button type="normal" v-show="monthSwitchVisible" @click="nextMonth">
          <i class="simple-icon-arrow-right"></i>
        </simple-button>
        <simple-button type="normal" v-show="yearSwitchVisible" @click="nextYear">
          <i class="simple-icon-d-arrow-right"></i>
        </simple-button>
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
            <simple-button
              type="none"
              :class="{
                'date-disabled': !item.enable,
                'inner-range': item.select,
                'date-selected': dateSelected === item.time,
              }"
              @click="selectDate(item.time, item.enable)"
            >{{ item.date }}</simple-button>
          </li>
        </ul>
      </div>
      <div class="year-picker" v-show="yearPickerVisible">
        <ul>
          <li v-for="year of yearArray" :key="`year-item-${year}`">
            <simple-button
              type="none"
              :class="{ 'date-selected': currentYear === year }"
              @click="selectYear(year)"
            >{{ year }} 年</simple-button>
          </li>
        </ul>
      </div>
      <div class="month-picker" v-show="monthPickerVisible">
        <ul>
          <li v-for="month of 12" :key="`month-item-${month}`">
            <simple-button
              type="none"
              :class="{ 'date-selected': currentMonth === month }"
              @click="selectMonth(month)"
            >{{ month }} 月</simple-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  SimpleDateTimeConfig,
  SimpleDayConfig,
  SimpleTimeConfig,
} from "../types";
import SimplePopover from "./SimplePopover.vue";
import SimpleTimePickerPopover from "./SimpleTimePickerPopover.vue";

export default Vue.extend({
  name: "SimpleDateTimePickerPopover",
  components: {
    SimpleTimePickerPopover,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    value: Number, // 值
    formate: { // 格式化字符串
      type: String,
      default: "yyyy-MM-dd hh:mm:ss",
    },
    min: { // 最小值
      type: Number,
      default: 0,
    },
    max: { // 最大值
      type: Number,
      default: 0,
    },
    left: { // 左区间
      type: Number,
      default: 0,
    },
    right: { // 右区间
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      date: { // 当前日期
        date: new Date(Date.now()),
        hour: null,
        minute: null,
        second: null,
      } as SimpleDateTimeConfig,
      dateSelected: 0, // 选择的日期
      monthDay: [] as SimpleDayConfig[], // 每月的号数
      datePickerVisible: true, // 显示日期选择
      yearPickerVisible: false, // 显示年份选择
      yearToChoose: 0, // 当前年份
      yearArray: [] as number[], // 可选的年份号
      monthPickerVisible: false, // 显示月份选择
    };
  },
  computed: {
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {number}
     */
    syncedValue: {
      get(): number {
        return this.value;
      },
      set(val: number): void {
        this.$emit("update:value", val);
      },
    },
    /**
     * @description: 时间格式化字符串
     * @author: Quarter
     * @return {String}
     */
    timeFormate(): string {
      if (typeof this.formate === "string") {
        const arr: RegExpMatchArray | null = this.formate.match(
          new RegExp(/[smh:]+/)
        );
        if (arr && arr.length > 0) {
          return arr[0];
        } else {
          return "";
        }
      }
      return "hh:mm:ss";
    },
    /**
     * @description: 年份字符串
     * @author: Quarter
     * @return {String}
     */
    yearStr(): string | undefined {
      if (this.date.date instanceof Date) {
        return this.date.date.formate("yyyy");
      }
    },
    /**
     * @description: 月份格式化字符串
     * @author: Quarter
     * @return {String}
     */
    monthStr(): string | undefined {
      if (this.date.date instanceof Date) {
        return this.date.date.formate("MM");
      }
    },
    /**
     * @description: 当前年份
     * @author: Quarter
     * @return {Number}
     */
    currentYear(): number {
      if (this.date.date instanceof Date) {
        return this.date.date.getFullYear();
      }
      return 0;
    },
    /**
     * @description: 当前月份
     * @author: Quarter
     * @return {Number}
     */
    currentMonth(): number {
      if (this.date.date instanceof Date) {
        return this.date.date.getMonth() + 1;
      }
      return 0;
    },
    /**
     * @description: 是否显示年份切换
     * @author: Quarter
     * @return {Boolean}
     */
    yearSwitchVisible(): boolean {
      return this.datePickerVisible || this.yearPickerVisible;
    },
    /**
     * @description: 是否显示月份
     * @author: Quarter
     * @return {Boolean}
     */
    monthSwitchVisible(): boolean {
      return this.datePickerVisible;
    },
    /**
     * @description: 日期字符串
     * @author: Quarter
     * @return {String}
     */
    dateStr(): string | null {
      if (this.dateSelected > 0) {
        return new Date(this.dateSelected).formate("yyyy-MM-dd");
      }
      return null;
    },
    /**
     * @description: 最小时间字符串
     * @author: Quarter
     * @return {String}
     */
    minTimeStr(): string | undefined {
      if (typeof this.min === "number" && this.min > 0) {
        return new Date(this.min).formate("yyyy-MM-dd hh:mm:ss");
      }
    },
    /**
     * @description: 最大时间字符串
     * @author: Quarter
     * @return {String}
     */
    maxTimeStr(): string | undefined {
      if (typeof this.max === "number" && this.max > 0) {
        return new Date(this.max).formate("yyyy-MM-dd hh:mm:ss");
      }
    },
    /**
     * @description: 最小日期时间戳
     * @author: Quarter
     * @return {Number}
     */
    minDateTime(): number | undefined {
      if (typeof this.min === "number" && this.min > 0) {
        return new Date(
          new Date(this.min).formate("yyyy-MM-dd 00:00:00")
        ).getTime();
      }
    },
    /**
     * @description: 最大日期时间戳
     * @author: Quarter
     * @return {Number}
     */
    maxDateTime(): number | undefined {
      if (typeof this.max === "number" && this.max > 0) {
        return new Date(
          new Date(this.max).formate("yyyy-MM-dd 00:00:00")
        ).getTime();
      }
    },
    /**
     * @description: 时间字符串
     * @author: Quarter
     * @return {String}
     */
    timeStr(): string | null {
      const { hour, minute, second } = this.date;
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
        return `${hourStr}:${minuteStr}:${secondStr}`;
      }
      return null;
    },
    /**
     * @description: 时间字符串
     * @author: Quarter
     * @return {String}
     */
    fullTimeStr(): string | null {
      const { hour, minute, second } = this.date;
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
        return `${hourStr}:${minuteStr}:${secondStr}`;
      }
      return null;
    },
    /**
     * @description: 选择的时间日期
     * @author: Quarter
     * @return {Number}
     */
    dateTimeSelected: {
      get(): number {
        if (this.dateSelected > 0) {
          if (this.timeStr) {
            return new Date(
              new Date(this.dateSelected).formate("yyyy-MM-dd") +
              " " +
              this.fullTimeStr
            ).getTime();
          } else {
            return this.dateSelected;
          }
        }
        return 0;
      },
      set(value: number) {
        if (typeof value === "number" && value > 0) {
          let time: Date = new Date(value);
          if (
            this.minTimeStr &&
            time.getTime() < new Date(this.minTimeStr).getTime()
          ) {
            time = new Date(this.minTimeStr);
          }
          if (
            this.maxTimeStr &&
            time.getTime() > new Date(this.maxTimeStr).getTime()
          ) {
            time = new Date(this.maxTimeStr);
          }
          this.dateSelected = new Date(
            time.getFullYear(),
            time.getMonth(),
            time.getDate()
          ).getTime();
          this.date = {
            date: time,
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds(),
          };
        } else {
          let time: Date = new Date(Date.now());
          if (
            this.minTimeStr &&
            time.getTime() < new Date(this.minTimeStr).getTime()
          ) {
            time = new Date(this.minTimeStr);
          }
          if (
            this.maxTimeStr &&
            time.getTime() > new Date(this.maxTimeStr).getTime()
          ) {
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
      },
    },
  },
  watch: {
    /**
     * @description: 监听传入值变化
     * @author: Quarter
     * @param {String} timeStr 时间字符串
     * @return
     */
    value(): void {
      this.watchValueChange();
    },
    /**
     * @description: 监听选中值变化
     * @author: Quarter
     * @param {Number} time 时间戳
     * @return
     */
    dateTimeSelected(time: number): void {
      if (typeof time === "number") {
        this.calcDateSelect();
        if (time > 0) {
          this.syncedValue = this.dateTimeSelected;
          this.$emit("change", this.dateTimeSelected);
        }
      }
    },
    /**
     * @description: 区间限制
     * @author: Quarter
     * @return
     */
    min(): void {
      this.watchIntervalChange();
    },
    /**
     * @description: 区间限制
     * @author: Quarter
     * @return
     */
    max(): void {
      this.watchIntervalChange();
    },
    /**
     * @description: 区间限制
     * @author: Quarter
     * @return
     */
    left(): void {
      this.watchIntervalChange();
    },
    /**
     * @description: 区间限制
     * @author: Quarter
     * @return
     */
    right(): void {
      this.watchIntervalChange();
    },
    /**
     * @description: 计算当月日期结构
     * @author: Quarter
     * @param {Date} 变化的日期
     * @return
     */
    "date.date": {
      immediate: true,
      handler(date: Date): void {
        this.calcMonthDay(date);
      }
    },
  },
  methods: {
    /**
     * @description: 点击弹窗
     * @author: Quarter
     * @param {Boolean} visible 是否显示
     * @return
     */
    init(): void {
      this.watchValueChange();
      this.watchIntervalChange();
      this.datePickerVisible = true;
      this.yearPickerVisible = false;
      this.monthPickerVisible = false;
    },
    /**
     * @description: 监听传入值变化
     * @author: Quarter
     * @param {String} timeStr 时间字符串
     * @return
     */
    watchValueChange(): void {
      if (typeof this.syncedValue === "number") {
        if (this.syncedValue > 0) {
          const date: Date = new Date(
            new Date(this.syncedValue).formate("yyyy-MM-dd hh:mm:ss")
          );
          this.dateTimeSelected = date.getTime();
        } else if (this.syncedValue === 0) {
          this.dateTimeSelected = 0;
        }
      } else {
        this.dateTimeSelected = 0;
      }
    },
    /**
     * @description: 区间限制
     * @author: Quarter
     * @return
     */
    watchIntervalChange(): void {
      let date: Date = this.date.date;
      if (
        this.minTimeStr &&
        date.getTime() < new Date(this.minTimeStr).getTime()
      ) {
        date = new Date(this.minTimeStr);
      }
      if (
        this.maxTimeStr &&
        date.getTime() > new Date(this.maxTimeStr).getTime()
      ) {
        date = new Date(this.maxTimeStr);
      }
      this.date.date = date;
      this.calcMonthDay(this.date.date);
    },
    /**
     * @description: 
     * @author: Quarter
     * @return
     */
    calcMonthDay(date: Date): void {
      if (date instanceof Date) {
        // 计算当月天数
        const dayArray: SimpleDayConfig[] = new Array();
        const oneDay = 24 * 60 * 60 * 1000;
        const today: Date = new Date(date.formate("yyyy-MM-dd 00:00:00"));
        const dayLength: number = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        ).getDate();
        const firstDay: number = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        ).getDay();
        const weekLength: number = Math.ceil((dayLength + firstDay) / 7);
        let tempDate: Date = new Date(
          new Date(today.getFullYear(), today.getMonth(), 1).getTime() -
          firstDay * oneDay
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
    },
    /**
     * @description: 获取选择器的值
     * @author: Quarter
     * @return
     */
    getSelectorValue(date?: number): number | undefined {
      if (typeof date === "number" && date > 0) {
        this.dateTimeSelected = date;
      }
      if (
        typeof this.dateTimeSelected === "number" &&
        this.dateTimeSelected > 0
      ) {
        return this.dateTimeSelected;
      }
    },
    /**
     * @description: 切换弹窗显示
     * @author: Quarter
     * @param {Boolean} visible 是否显示
     * @return
     */
    switchPopover(visible: boolean): void {
      if (visible === true && this.$refs.timePicker instanceof SimpleTimePickerPopover) {
        (this.$refs.timePicker as InstanceType<typeof SimpleTimePickerPopover>).init();
      }
    },
    /**
     * @description: 计算是否在值域内
     * @author: Quarter
     * @return
     */
    calcDateSelect(): void {
      const hasLeft: boolean = typeof this.left === "number" && this.left > 0;
      const hasRight: boolean = typeof this.right === "number" && this.right > 0;
      const dayArray: SimpleDayConfig[] = this.monthDay.slice();
      dayArray.forEach((day: SimpleDayConfig, index: number) => {
        let select: boolean = false;
        if (hasLeft && hasRight) {
          if (day.time <= this.right && day.time >= this.left) {
            select = true;
          }
        } else if (hasLeft) {
          if (
            this.dateSelected > 0 &&
            day.time >= this.left &&
            day.time <= this.dateTimeSelected
          ) {
            select = true;
          }
        } else if (hasRight) {
          if (
            this.dateSelected > 0 &&
            day.time <= this.right &&
            day.time >= this.dateTimeSelected
          ) {
            select = true;
          }
        }
        dayArray[index].select = select;
      });
      this.monthDay = dayArray;
    },
    /**
     * @description: 上一年
     * @author: Quarter
     * @return
     */
    previousYear(): void {
      if (this.datePickerVisible === true) {
        const date: Date = new Date(
          this.date.date.getFullYear() - 1,
          this.date.date.getMonth(),
          this.date.date.getDate()
        );
        this.date.date = date;
      } else if (this.yearPickerVisible === true) {
        const yearToChoose: number = this.yearToChoose - 10;
        if (yearToChoose > 0) {
          this.yearToChoose = yearToChoose;
          this.calcSelectYears();
        }
      }
    },
    /**
     * @description: 下一年
     * @author: Quarter
     * @return
     */
    nextYear(): void {
      if (this.datePickerVisible === true) {
        const date: Date = new Date(
          this.date.date.getFullYear() + 1,
          this.date.date.getMonth(),
          this.date.date.getDate()
        );
        this.date.date = date;
      } else if (this.yearPickerVisible === true) {
        const yearToChoose: number = this.yearToChoose + 10;
        if (yearToChoose < 10000) {
          this.yearToChoose = yearToChoose;
          this.calcSelectYears();
        }
      }
    },
    /**
     * @description: 上个月
     * @author: Quarter
     * @return
     */
    previousMonth(): void {
      let month: number = this.date.date.getMonth() - 1;
      const date: Date = new Date(
        this.date.date.getFullYear(),
        this.date.date.getMonth(),
        this.date.date.getDate()
      );
      if (month < 0) {
        month = month + 12;
        date.setFullYear(date.getFullYear() - 1);
      }
      date.setMonth(month);
      this.date.date = date;
    },
    /**
     * @description: 下个月
     * @author: Quarter
     * @return
     */
    nextMonth(): void {
      let month: number = this.date.date.getMonth() + 1;
      const date: Date = new Date(
        this.date.date.getFullYear(),
        this.date.date.getMonth(),
        this.date.date.getDate()
      );
      if (month > 11) {
        month = month - 12;
        date.setFullYear(date.getFullYear() + 1);
      }
      date.setMonth(month);
      this.date.date = date;
    },
    /**
     * @description: 选择日期
     * @author: Quarter
     * @param {Number} 时间戳
     * @param {Boolean} 是否可以选择
     * @return
     */
    selectDate(time: number, enable: boolean) {
      const date: Date = new Date(time);
      if (this.date.date.getMonth() === date.getMonth() && enable === true) {
        this.dateSelected = time;
      }
    },
    /**
     * @description: 清空选中的日期
     * @author: Quarter
     * @return
     */
    clearValue(): void {
      this.dateSelected = 0;
    },
    /**
     * @description: 显示年份选择
     * @author: Quarter
     * @return
     */
    showYearPicker(): void {
      this.datePickerVisible = false;
      this.yearPickerVisible = true;
      if (this.date.date instanceof Date) {
        this.yearToChoose = this.date.date.getFullYear();
        this.calcSelectYears();
      }
    },
    /**
     * @description: 计算当前可选的年份
     * @author: Quarter
     * @return
     */
    calcSelectYears(): void {
      if (this.date.date instanceof Date) {
        const date: number = Math.floor(this.yearToChoose / 10) * 10;
        const yearArray: number[] = new Array();
        for (let i = 0; i < 10; i++) {
          yearArray.push(date + i);
        }
        this.yearArray = yearArray;
      }
    },
    /**
     * @description: 选择年份
     * @author: Quarter
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
    },
    /**
     * @description: 显示月份选择
     * @author: Quarter
     * @return
     */
    showMonthPicker(): void {
      this.datePickerVisible = false;
      this.monthPickerVisible = true;
    },
    /**
     * @description: 选择月份
     * @author: Quarter
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
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closePopover(): void {
      if (this.$refs.popover instanceof SimplePopover) {
        (this.$refs.popover as InstanceType<typeof SimplePopover>).switch(false);
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
    },
  },
});
</script>

<style lang="scss">
.simple-date-time-picker-popover {
  user-select: none;

  button.simple-button:not(:last-child) {
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

    .simple-input {
      text-align: center;
    }
  }

  .picker-header {
    height: 50px;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .simple-button {
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

      .simple-button {
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