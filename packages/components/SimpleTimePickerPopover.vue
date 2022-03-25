<!--
 * @Author: Quarter
 * @Date: 2020-08-20 14:20:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-18 08:24:00
 * @Description: 日期选择器弹窗
-->
<template>
  <div class="simple-time-picker-popover">
    <div class="time-selector">
      <simple-time-selector
        ref="timeSelector"
        :date="filterDate"
        v-model="insideTime"
        :formate="formate"
        :min="min"
        :max="max"
      ></simple-time-selector>
    </div>
    <div class="picker-footer">
      <simple-button type="cancel" @click="closePopover">取消</simple-button>
      <simple-button v-if="quick" type="confirm" @click="confirmNow">此时</simple-button>
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
  name: "SimpleTimePickerPopover",
  components: {
    SimpleTimeSelector,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    formate: { // 格式化字符串
      type: String,
      default: "hh:mm:ss",
    },
    time: Object as PropOptions<SimpleTimeConfig | SimpleDateTimeConfig>, // 时间
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
        if (this.$refs.timeSelector instanceof SimpleTimeSelector) {
          (this.$refs.timeSelector as any).init();
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
      if (this.$refs.timeSelector instanceof SimpleTimeSelector) {
        const time: Date = new Date((this.$refs.timeSelector as any).confirmValue());
        this.insideTime = {
          hour: time.getHours(),
          minute: time.getMinutes(),
          second: time.getSeconds(),
        };
      }
      this.$emit("confirm", this.insideTime);
    },
    /**
     * @description: 确认使用此时的时间
     * @author: Quarter
     * @return
     */
    confirmNow(): void {
      if (this.$refs.timeSelector instanceof SimpleTimeSelector) {
        const time: Date = new Date(
          (this.$refs.timeSelector as any).confirmValue(Date.now())
        );
        this.insideTime = {
          hour: time.getHours(),
          minute: time.getMinutes(),
          second: time.getSeconds(),
        };
      }
      this.$emit("confirm", this.insideTime);
    },
    /**
     * @description: 处理时间变化
     * @author: Quarter
     * @return
     */
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
    },
  },
  watch: {
    /**
     * @description: 监听时间的变化
     * @author: Quarter
     * @return
     */
    time: {
      immediate: true,
      handler(): void {
        this.handleTimeChange();
      },
    },
  },
});
</script>

<style lang="scss">
.simple-time-picker-popover {
  user-select: none;

  button.simple-button:not(:last-child) {
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