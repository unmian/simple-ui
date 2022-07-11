<!--
 * @Author: Quarter
 * @Date: 2020-08-20 14:20:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-07 16:32:30
 * @Description: 日期选择器弹窗
-->
<template>
  <div class="s-date-picker-popover">
    <div class="day-picker" v-if="dayPicker">
      <div class="picker-header">
        <div class="left-operation">
          <s-button
            type="normal"
            v-show="yearSwitchVisible"
            @click="previousYear"
          >
            <i class="s-icon-d-arrow-left"></i>
          </s-button>
          <s-button
            type="normal"
            v-show="monthSwitchVisible"
            @click="previousMonth"
          >
            <i class="s-icon-arrow-left"></i>
          </s-button>
        </div>
        <div class="date-info">
          <s-button
            type="normal"
            v-show="datePickerVisible"
            @click="showYearPicker"
            >{{ yearStr }} 年</s-button
          >
          <s-button
            type="normal"
            v-show="datePickerVisible"
            @click="showMonthPicker"
            >{{ monthStr }} 月</s-button
          >
          <span v-show="yearPickerVisible">{{ yearStr }} 年</span>
          <span v-show="monthPickerVisible">{{ monthStr }} 月</span>
        </div>
        <div class="right-operation">
          <s-button
            type="normal"
            v-show="monthSwitchVisible"
            @click="nextMonth"
          >
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
    <div v-else>
      <div class="picker-header">
        <div class="left-operation">
          <s-button type="normal" @click="previousYear">
            <i class="s-icon-arrow-left"></i>
          </s-button>
        </div>
        <div class="date-info">
          <s-button
            type="normal"
            v-show="monthPickerVisible"
            @click="showYearPicker"
            >{{ yearStr }} 年</s-button
          >
          <span v-show="yearPickerVisible">{{ yearStr }} 年</span>
        </div>
        <div class="right-operation">
          <s-button type="normal" @click="nextYear">
            <i class="s-icon-arrow-right"></i>
          </s-button>
        </div>
      </div>
      <div class="picker-content">
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
                :class="{ 'date-selected': dateSelectedMonth === month }"
                @click="selectMonth(month)"
                >{{ month }} 月</s-button
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { dateFormate } from "packages/util";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DayConfig } from "./types";

@Component({
  name: "SDatePickerPopover",
})
export default class SDatePickerPopover extends Vue {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop(Number)
  value?: number; // 值

  @Prop(Boolean)
  dayPicker?: boolean; // 日选择

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

  date = new Date(); // 当前日期
  dateSelected = 0; // 选择的日期
  monthDay: DayConfig[] = []; // 每月的号数
  datePickerVisible = true; // 显示日期选择
  yearPickerVisible = false; // 显示年份选择
  yearToChoose = 0; // 当前年份
  yearArray: number[] = []; // 可选的年份号
  monthPickerVisible = false; // 显示月份选择

  /**
   * @description: 过滤的日选择
   * @author: Quarter
   * @return {Boolean}
   */
  get filterDayPicker(): boolean {
    return this.dayPicker === true;
  }

  /**
   * @description: 年份字符串
   * @author: Quarter
   * @return {String}
   */
  get yearStr(): string | undefined {
    if (this.date instanceof Date) {
      return dateFormate(this.date, "yyyy");
    }
  }

  /**
   * @description: 月份格式化字符串
   * @author: Quarter
   * @return {String}
   */
  get monthStr(): string | undefined {
    if (this.date instanceof Date) {
      return dateFormate(this.date, "MM");
    }
  }

  /**
   * @description: 当前年份
   * @author: Quarter
   * @return {Number}
   */
  get currentYear(): number {
    if (this.date instanceof Date) {
      return this.date.getFullYear();
    }
    return 0;
  }

  /**
   * @description: 当前月份
   * @author: Quarter
   * @return {Number}
   */
  get currentMonth(): number {
    if (this.date instanceof Date) {
      return this.date.getMonth() + 1;
    }
    return 0;
  }

  /**
   * @description: 选择的月份
   * @author: Quarter
   * @return
   */
  get dateSelectedMonth(): number | null {
    if (this.dateSelected > 0) {
      return new Date(this.dateSelected).getMonth() + 1;
    }
    return null;
  }

  /**
   * @description: 是否显示年份切换
   * @author: Quarter
   * @return {Boolean}
   */
  get yearSwitchVisible(): boolean {
    return this.datePickerVisible || this.yearPickerVisible;
  }

  /**
   * @description: 是否显示月份
   * @author: Quarter
   * @return {Boolean}
   */
  get monthSwitchVisible(): boolean {
    return this.datePickerVisible;
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
  handleValueChange(): void {
    if (typeof this.value === "number") {
      if (this.value > 0) {
        const date: Date = new Date(this.value);
        if (typeof date.getTime() === "number") {
          const justDate: Date = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          if (justDate.getTime() !== this.dateSelected) {
            this.dateSelected = justDate.getTime();
            this.date = justDate;
          }
        }
      } else if (this.value === 0) {
        this.dateSelected = 0;
      }
    }
  }

  /**
   * @description: 监听选中值变化
   * @author: Quarter
   * @param {Number} time 时间戳
   * @return
   */
  @Watch("dateSelected")
  handleDateSelectedChange(time: number): void {
    if (typeof time === "number") {
      this.calcDateSelect();
      if (time > 0) {
        this.$emit("change", this.dateSelected);
      }
    }
  }

  /**
   * @description: 监听范围变化
   * @author: Quarter
   * @return
   */
  @Watch("min")
  @Watch("max")
  @Watch("left")
  @Watch("right")
  handleEdgeChange(): void {
    let date: Date = this.date;
    if (this.min > 0 && this.date.getTime() < this.min) {
      date = new Date(this.min);
    }
    if (this.max > 0 && this.date.getTime() > this.max) {
      date = new Date(this.max);
    }
    this.calcMonthDay(date);
  }

  /**
   * @description: 计算当月日期结构
   * @author: Quarter
   * @param {Date} date 变化的日期
   * @return
   */
  @Watch("date", {
    immediate: true,
  })
  handleDateChange(date: Date): void {
    this.calcMonthDay(date);
  }

  /**
   * @description: 点击弹窗
   * @author: Quarter
   * @param {Boolean} visible 是否显示
   * @return
   */
  init(): void {
    this.handleValueChange();
    let date: Date = new Date(Date.now());
    if (this.dateSelected !== 0) {
      date = new Date(this.dateSelected);
    }
    if (this.min > 0 && this.date.getTime() < this.min) {
      date = new Date(this.min);
    }
    if (this.max > 0 && this.date.getTime() > this.max) {
      date = new Date(this.max);
    }
    this.date = new Date(dateFormate(date, "yyyy-MM-dd") + " 00:00:00");
    if (this.filterDayPicker) {
      this.datePickerVisible = true;
      this.monthPickerVisible = false;
      this.yearPickerVisible = false;
    } else {
      this.datePickerVisible = false;
      this.monthPickerVisible = true;
      this.yearPickerVisible = false;
    }
  }

  /**
   * @description: 获取选择器的值
   * @author: Quarter
   * @return
   */
  getSelectorValue(): number | undefined {
    if (typeof this.dateSelected === "number" && this.dateSelected > 0) {
      return this.dateSelected;
    }
  }

  /**
   * @description: 计算是否在值域内
   * @author: Quarter
   * @return
   */
  calcDateSelect(): void {
    const hasLeft: boolean = typeof this.left === "number" && this.left > 0;
    const hasRight: boolean = typeof this.right === "number" && this.right > 0;
    const dayArray: DayConfig[] = this.monthDay.slice();
    dayArray.forEach((day: DayConfig, index: number) => {
      let select: boolean = false;
      if (hasLeft && hasRight) {
        if (day.time <= this.right && day.time >= this.left) {
          select = true;
        }
      } else if (hasLeft) {
        if (
          this.dateSelected > 0 &&
          day.time >= this.left &&
          day.time <= this.dateSelected
        ) {
          select = true;
        }
      } else if (hasRight) {
        if (
          this.dateSelected > 0 &&
          day.time <= this.right &&
          day.time >= this.dateSelected
        ) {
          select = true;
        }
      }
      dayArray[index].select = select;
    });
    this.monthDay = dayArray;
  }

  /**
   * @description: 上一年
   * @author: Quarter
   * @return
   */
  previousYear(): void {
    if (this.filterDayPicker) {
      if (this.datePickerVisible === true) {
        const date: Date = new Date(
          this.date.getFullYear() - 1,
          this.date.getMonth(),
          this.date.getDate()
        );
        this.date = date;
      } else if (this.yearPickerVisible === true) {
        const yearToChoose: number = this.yearToChoose - 10;
        if (yearToChoose > 0) {
          this.yearToChoose = yearToChoose;
          this.calcSelectYears();
        }
      }
    } else {
      if (this.monthPickerVisible === true) {
        const date: Date = new Date(
          this.date.getFullYear() - 1,
          this.date.getMonth(),
          1
        );
        this.date = date;
        this.dateSelected = date.getTime();
      } else if (this.yearPickerVisible === true) {
        const yearToChoose: number = this.yearToChoose - 10;
        if (yearToChoose > 0) {
          this.yearToChoose = yearToChoose;
          this.calcSelectYears();
        }
      }
    }
  }

  /**
   * @description: 下一年
   * @author: Quarter
   * @return
   */
  nextYear(): void {
    if (this.filterDayPicker) {
      if (this.datePickerVisible === true) {
        const date: Date = new Date(
          this.date.getFullYear() + 1,
          this.date.getMonth(),
          this.date.getDate()
        );
        this.date = date;
      } else if (this.yearPickerVisible === true) {
        const yearToChoose: number = this.yearToChoose + 10;
        if (yearToChoose < 10000) {
          this.yearToChoose = yearToChoose;
          this.calcSelectYears();
        }
      }
    } else {
      if (this.monthPickerVisible === true) {
        const date: Date = new Date(
          this.date.getFullYear() + 1,
          this.date.getMonth(),
          1
        );
        this.date = date;
        this.dateSelected = date.getTime();
      } else if (this.yearPickerVisible === true) {
        const yearToChoose: number = this.yearToChoose + 10;
        if (yearToChoose < 10000) {
          this.yearToChoose = yearToChoose;
          this.calcSelectYears();
        }
      }
    }
  }

  /**
   * @description: 上个月
   * @author: Quarter
   * @return
   */
  previousMonth(): void {
    let month: number = this.date.getMonth() - 1;
    const date: Date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    if (month < 0) {
      month = month + 12;
      date.setFullYear(date.getFullYear() - 1);
    }
    date.setMonth(month);
    this.date = date;
  }

  /**
   * @description: 下个月
   * @author: Quarter
   * @return
   */
  nextMonth(): void {
    let month: number = this.date.getMonth() + 1;
    const date: Date = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate()
    );
    if (month > 11) {
      month = month - 12;
      date.setFullYear(date.getFullYear() + 1);
    }
    date.setMonth(month);
    this.date = date;
  }

  /**
   * @description: 选择日期
   * @author: Quarter
   * @param {Number} 时间戳
   * @param {Boolean} 是否可以选择
   * @return
   */
  selectDate(time: number, enable: boolean) {
    const date: Date = new Date(time);
    if (this.date.getMonth() === date.getMonth() && enable === true) {
      this.dateSelected = time;
    }
  }

  /**
   * @description: 清空选中的日期
   * @author: Quarter
   * @return
   */
  clearValue(): void {
    this.dateSelected = 0;
  }

  /**
   * @description: 显示年份选择
   * @author: Quarter
   * @return
   */
  showYearPicker(): void {
    if (this.filterDayPicker) {
      this.datePickerVisible = false;
      this.yearPickerVisible = true;
    } else {
      this.monthPickerVisible = false;
      this.yearPickerVisible = true;
    }
    if (this.date instanceof Date) {
      this.yearToChoose = this.date.getFullYear();
      this.calcSelectYears();
    }
  }

  /**
   * @description: 计算当前可选的年份
   * @author: Quarter
   * @return
   */
  calcSelectYears(): void {
    if (this.date instanceof Date) {
      const date: number = Math.floor(this.yearToChoose / 10) * 10;
      const yearArray: number[] = new Array();
      for (let i = 0; i < 10; i++) {
        yearArray.push(date + i);
      }
      this.yearArray = yearArray;
    }
  }

  /**
   * @description: 选择年份
   * @author: Quarter
   * @param {Number} year 年份
   * @return
   */
  selectYear(year: number): void {
    if (typeof year === "number" && this.date instanceof Date) {
      const date: Date = new Date(this.date.getTime());
      date.setFullYear(year);
      this.date = date;
      if (this.filterDayPicker) {
        this.yearPickerVisible = false;
        this.datePickerVisible = true;
      } else {
        this.dateSelected = date.getTime();
        this.yearPickerVisible = false;
        this.monthPickerVisible = true;
      }
    }
  }

  /**
   * @description: 显示月份选择
   * @author: Quarter
   * @return
   */
  showMonthPicker(): void {
    this.datePickerVisible = false;
    this.monthPickerVisible = true;
  }

  /**
   * @description: 选择月份
   * @author: Quarter
   * @param {Number} month 月份
   * @return
   */
  selectMonth(month: number): void {
    if (typeof month === "number" && this.date instanceof Date) {
      const date: Date = new Date(this.date.getTime());
      date.setMonth(month - 1);
      if (this.filterDayPicker) {
        this.date = date;
        this.monthPickerVisible = false;
        this.datePickerVisible = true;
      } else {
        date.setDate(1);
        this.dateSelected = date.getTime();
      }
    }
  }

  /**
   * @description: 计算每月天数
   * @author: Quarter
   * @param {Date} date 日期
   * @return
   */
  calcMonthDay(date: Date): void {
    if (date instanceof Date) {
      // 计算当月天数
      const dayArray: DayConfig[] = new Array();
      const oneDay = 24 * 60 * 60 * 1000;
      const today: Date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
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
        const hasMin: boolean = typeof this.min === "number" && this.min > 0;
        const hasMax: boolean = typeof this.max === "number" && this.max > 0;
        if (hasMin && tempDate.getTime() < this.min) {
          enable = false;
        }
        if (hasMax && tempDate.getTime() > this.max) {
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
}
</script>

<style lang="scss">
.s-date-picker-popover {
  user-select: none;

  button.s-button:not(:last-child) {
    margin-right: 0;
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

    .split-line {
      width: 100%;
      height: 1px;
      background-color: #e1dee2;
      margin: 5px 0;
    }
  }
}
</style>
