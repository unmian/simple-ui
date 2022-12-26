<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:42:11
 * @LastEditors: Quarter
 * @Description: 时间选择器弹窗
 * @FilePath: /simple-ui/packages/time-picker/src/time-picker-popover.vue
-->
<template>
  <div class="s-time-picker-popover">
    <div class="time-selector">
      <s-time-selector
        ref="timeSelector"
        :date="filterDate"
        v-model="insideTime"
        :formate="formate"
        :min="min"
        :max="max"
      ></s-time-selector>
    </div>
    <div class="picker-footer">
      <s-button type="cancel" @click="closePopover">取消</s-button>
      <s-button v-if="quick" type="confirm" @click="confirmNow">此时</s-button>
      <s-button type="confirm" @click="confirmPopover">确定</s-button>
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULT_DATE } from "packages/constants";
import { DateTimeConfig } from "packages/date-time-picker";
import STimeSelector from "./time-selector.vue";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { TimeConfig } from "./types";

@Component({
  name: "STimePickerPopover",
  components: {
    STimeSelector,
  },
})
export default class TimePickerPopover extends Vue {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop({
    type: String,
    default: "hh:mm:ss",
  })
  formate!: string; // 格式化字符串

  @Prop(Object)
  time?: TimeConfig | DateTimeConfig; // 时间

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
   * @description: 监听时间的变化
   * @return
   */
  @Watch("time", {
    immediate: true,
  })
  handleTimeChange(): void {
    if (this.time) {
      const { hour, minute, second } = this.time;
      if (typeof hour === "number") {
        this.insideTime.hour = hour;
      } else {
        this.insideTime.hour = 0;
      }
      if (typeof minute === "number") {
        this.insideTime.minute = minute;
      } else {
        this.insideTime.minute = 0;
      }
      if (typeof second === "number") {
        this.insideTime.second = second;
      } else {
        this.insideTime.second = 0;
      }
    }
  }

  /**
   * @description: 初始化
   * @return
   */
  init(): void {
    this.$nextTick(() => {
      this.handleTimeChange();
      if (this.$refs.timeSelector instanceof STimeSelector) {
        this.$refs.timeSelector.init();
      }
    });
  }

  /**
   * @description: 关闭弹出层
   * @return
   */
  closePopover(): void {
    this.$emit("close");
  }

  /**
   * @description: 确认时间
   * @return
   */
  confirmPopover(): void {
    if (this.$refs.timeSelector instanceof STimeSelector) {
      const time: Date = new Date(this.$refs.timeSelector.confirmValue());
      this.insideTime = {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
      };
    }
    this.$emit("confirm", this.insideTime);
  }

  /**
   * @description: 确认使用此时的时间
   * @return
   */
  confirmNow(): void {
    if (this.$refs.timeSelector instanceof STimeSelector) {
      const time: Date = new Date(this.$refs.timeSelector.confirmValue(Date.now()));
      this.insideTime = {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds(),
      };
    }
    this.$emit("confirm", this.insideTime);
  }
}
</script>

<style lang="scss">
.s-time-picker-popover {
  user-select: none;

  button.s-button:not(:last-child) {
    margin-right: 0;
  }

  .time-selector {
    position: relative;
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

  &.with-insideSecond .picker-content .hour-list,
  &.with-insideSecond .picker-content .minute-list,
  &.with-insideSecond .picker-content .second-list {
    width: 60px;
  }
}
</style>
