<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-05 11:21:50
 * @LastEditors: Quarter
 * @Description: 简易的日期时间选择器
 * @FilePath: /simple-ui/packages/date-time-picker/src/date-time-picker.vue
-->
<template>
  <div
    class="s-date-time-picker"
    :class="{ 'status-disabled': disabled, 'status-readonly': readonly }"
  >
    <s-popover
      ref="dateTimePickerPopover"
      border-radius="4px"
      @switch="switchPopover"
      :disabled="!enabled"
    >
      <s-input
        :width="width"
        :height="height"
        :value="dateStr"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        force-clear
        :clearable="enabled"
        slot="reference"
        @clear="clearValue"
      >
        <template #icon>
          <i class="s-icon-time" style="color: #d6e1e5"></i>
        </template>
      </s-input>
      <div class="date-time-picker-popover">
        <s-date-time-picker-popover
          ref="dateTimePicker"
          :value="unsyncedValue"
          :min="min"
          :max="max"
          :formate="standardFormater"
        ></s-date-time-picker-popover>
        <div class="picker-footer">
          <s-button type="cancel" @click="closePopover">取消</s-button>
          <s-button v-if="quick" size="small" type="confirm" @click="confirmNow">此刻</s-button>
          <s-button type="confirm" @click="confirmPopover">确定</s-button>
        </div>
      </div>
    </s-popover>
  </div>
</template>

<script lang="ts">
import SDateTimePickerPopover from "./date-time-picker-popover.vue";
import { Button } from "packages/button";
import { Input } from "packages/input";
import { Emitter } from "packages/mixins";
import { Popover } from "packages/popover";
import { dateFormate } from "packages/util";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SDateTimePicker",
  components: {
    SPopover: Popover,
    SInput: Input,
    SButton: Button,
    SDateTimePickerPopover,
  },
})
export default class SDateTimePicker extends Mixins(Emitter) {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: String; // 高度

  @Prop({
    type: String,
    default: "请选择日期和时间",
  })
  placeholder!: string; // 提示文字

  @Prop(String)
  value?: string; // 值

  @Prop(Array)
  interval?: string[]; // 区间

  @Prop({
    type: String,
    default: "yyyy-MM-dd hh:mm:ss",
  })
  formate!: string; // 格式化字符串

  @Prop({
    type: Boolean,
    default: false,
  })
  quick!: boolean; // 是否显示快捷操作

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

  unsyncedValue = 0; // 非同步的值

  /**
   * @description: 同步的值
   * @author: Quarter
   * @return {string|undefined}
   */
  get syncedValue(): string | undefined {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @author: Quarter
   * @param {string|undefined} val 值
   * @return
   */
  set syncedValue(val: string | undefined) {
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
   * @description: 日期字符串
   * @author: Quarter
   * @return {String}
   */
  get dateStr(): string | undefined {
    if (
      typeof this.unsyncedValue === "number" &&
      this.unsyncedValue > 0 &&
      typeof this.formate === "string"
    ) {
      return dateFormate(this.unsyncedValue, this.formate);
    }
  }

  /**
   * @description: 标准格式化字符串
   * @author: Quarter
   * @return {String}
   */
  get standardFormater(): string {
    if (typeof this.formate === "string") {
      const dateStrArr: string[] = new Array();
      const timeStrArr: string[] = new Array();
      const timeStrMap: any = {
        "y+": "yyyy",
        "M+": "MM",
        "d+": "dd",
        "h+": "hh",
        "m+": "mm",
        "s+": "ss",
      };
      ["y+", "M+", "d+"].forEach((str: string) => {
        if (new RegExp(str).test(this.formate)) {
          dateStrArr.push(timeStrMap[str] || "");
        }
      });
      ["h+", "m+", "s+"].forEach((str: string) => {
        if (new RegExp(str).test(this.formate)) {
          timeStrArr.push(timeStrMap[str] || "");
        }
      });
      return dateStrArr.join("-") + " " + timeStrArr.join(":");
    }
    return "";
  }

  /**
   * @description: 区间最小值
   * @author: Quarter
   * @return
   */
  get min(): number | undefined {
    if (Array.isArray(this.interval) && typeof this.interval[0] === "string") {
      const minStr: string = this.interval[0];
      const dateRegExp: RegExp = new RegExp(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/,
      );
      if (dateRegExp.test(minStr)) {
        return new Date(minStr).getTime();
      }
    }
  }

  /**
   * @description: 区间最大值
   * @author: Quarter
   * @return
   */
  get max(): number | undefined {
    if (Array.isArray(this.interval) && typeof this.interval[1] === "string") {
      const maxStr: string = this.interval[1];
      const dateRegExp: RegExp = new RegExp(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/,
      );
      if (dateRegExp.test(maxStr)) {
        return new Date(maxStr).getTime();
      }
    }
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
  handleValueChange(timeStr: string): void {
    if (typeof timeStr === "string") {
      const date: Date = new Date(this.formateStandardTimeStr(timeStr));
      if (date.getTime() !== this.unsyncedValue) {
        this.unsyncedValue = date.getTime();
      }
    }
  }

  /**
   * @description: 监听选中值变化
   * @author: Quarter
   * @param {Number} timeStamp 时间戳
   * @return
   */
  @Watch("unsyncedValue")
  handleUnsyncedValueChange(timeStamp: number): void {
    if (typeof timeStamp === "number" && typeof this.formate === "string") {
      if (timeStamp === 0) {
        const value: string = "";
        this.syncedValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
      } else {
        const value: string = dateFormate(this.unsyncedValue, this.formate);
        this.syncedValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
      }
      this.dispatch("SFormItem", "s-form-validate", ["change"]);
    }
  }

  /**
   * @description: 格式化标准时间字符串
   * @author: Quarter
   * @param {String} timeStr 时间字符串
   * @return {String}
   */
  formateStandardTimeStr(timeStr: string): string {
    if (typeof this.formate === "string") {
      const dateStrArr: string[] = new Array(3).fill("01");
      const timeStrArr: string[] = new Array(3).fill("00");
      ["yyyy", "MM", "dd"].forEach((str: string, index: number) => {
        if (this.formate.includes(str)) {
          dateStrArr[index] = timeStr.substr(this.formate.indexOf(str), str.length);
        }
      });
      ["hh", "mm", "ss"].forEach((str: string, index: number) => {
        if (this.formate.includes(str)) {
          timeStrArr[index] = timeStr.substr(this.formate.indexOf(str), str.length);
        }
      });
      return dateStrArr.join("-") + " " + timeStrArr.join(":");
    }
    return "";
  }

  /**
   * @description: 清空值
   * @author: Quarter
   * @return
   */
  clearValue(): void {
    this.unsyncedValue = 0;
  }

  /**
   * @description: 切换弹窗显示
   * @author: Quarter
   * @param {Boolean} visible 是否显示
   * @return
   */
  switchPopover(visible: boolean): void {
    if (visible === true && this.$refs.dateTimePicker instanceof SDateTimePickerPopover) {
      (this.$refs.dateTimePicker as InstanceType<typeof SDateTimePickerPopover>).init();
    }
  }

  /**
   * @description: 确认快捷时间
   * @author: Quarter
   * @param {Number} timestamp 时间戳
   * @return
   */
  confirmQuickDate(timestamp?: number): void {
    const date: Date = new Date(timestamp || Date.now());
    const justDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (justDate.getTime() !== this.unsyncedValue) {
      this.unsyncedValue = justDate.getTime();
    }
    if (this.$refs.dateTimePickerPopover instanceof Popover) {
      this.$refs.dateTimePickerPopover.switch(false);
    }
  }

  /**
   * @description: 关闭弹窗
   * @author: Quarter
   * @return
   */
  closePopover(): void {
    if (this.$refs.dateTimePickerPopover instanceof Popover) {
      this.$refs.dateTimePickerPopover.switch(false);
    }
  }

  /**
   * @description: 确认使用此时的时间
   * @author: Quarter
   * @return
   */
  confirmNow(): void {
    if (this.$refs.dateTimePicker instanceof SDateTimePickerPopover) {
      const value: number | undefined = this.$refs.dateTimePicker.getSelectorValue(Date.now());
      if (typeof value === "number") {
        this.unsyncedValue = value;
      } else {
        this.unsyncedValue = 0;
      }
    }
    if (this.$refs.dateTimePickerPopover instanceof Popover) {
      this.$refs.dateTimePickerPopover.switch(false);
    }
  }

  /**
   * @description: 确认弹窗
   * @author: Quarter
   * @return
   */
  confirmPopover(): void {
    if (this.$refs.dateTimePicker instanceof SDateTimePickerPopover) {
      const value: number | undefined = (
        this.$refs.dateTimePicker as InstanceType<typeof SDateTimePickerPopover>
      ).getSelectorValue();
      if (typeof value === "number") {
        this.unsyncedValue = value;
      } else {
        this.unsyncedValue = 0;
      }
    }
    if (this.$refs.dateTimePickerPopover instanceof Popover) {
      this.$refs.dateTimePickerPopover.switch(false);
    }
  }
}
</script>

<style lang="scss">
.s-date-time-picker {
  width: fit-content;

  .s-input .input-content {
    border-color: #d6e1e5;
    background-color: #ffffff;

    .input-icon {
      padding-left: 5px;
    }

    input {
      padding-left: 5px;
      color: #333333;
    }

    &:hover {
      border-color: #b7c1c5;
    }
  }

  &.status-disabled {
    .s-input .input-content {
      cursor: not-allowed;
      background-color: #f9f9f9;

      input {
        color: #666666;
        cursor: not-allowed;
      }

      &:hover {
        border-color: #d6e1e5;
      }
    }
  }

  &:not(.status-disabled).status-readonly {
    .s-input .input-content {
      cursor: default;

      input {
        cursor: default;
      }

      &:hover {
        border-color: #d6e1e5;
      }
    }
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}

.date-time-picker-popover {
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
