<!--
 * @Author: Quarter
 * @Date: 2021-06-23 11:36:03
 * @LastEditTime: 2022-03-25 08:09:50
 * @LastEditors: Quarter
 * @Description: 
 * @FilePath: /simple-ui/packages/components/SimpleRadioButton.vue
-->
<template>
  <button class="simple-radio-button" :class="customClass" @click="checkRadio">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import { SimpleCustomClass, SimpleRadioValue, SimpleSize } from "../types";

export default Emitter.extend({
  name: "SimpleRadioButton",
  props: {
    value: { // 选中的值
      default: null,
    } as PropOptions<SimpleRadioValue>,
    label: { // 当前单选框的值
      default: null,
    } as PropOptions<SimpleRadioValue>,
    size: String as PropOptions<SimpleSize | undefined>, // 尺寸大小
    disabled: { // 是否禁用
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      unsyncedValue: null as SimpleRadioValue, // 不同步的值
    };
  },
  computed: {
    /**
     * @description: 选中的值
     * @author: Quarter
     * @return {SimpleRadioValue}
     */
    syncedValue: {
      get(): SimpleRadioValue {
        return this.value;
      },
      set(val: SimpleRadioValue): void {
        this.$emit("update:value", val);
      },
    },
    /**
     * @description: 过滤的尺寸
     * @author: Quarter
     * @return {SimpleSize}
     */
    filterSize(): SimpleSize {
      const sizeList: SimpleSize[] = ["mini", "small", "medium", "large"];
      if (typeof this.size === "string" && sizeList.indexOf(this.size) > -1) {
        return this.size;
      }
      return "medium";
    },
    /**
     * @description: 当前是否选中
     * @author: Quarter
     * @return {Boolean}
     */
    checked(): boolean {
      return this.unsyncedValue === this.label;
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      const classNames: SimpleCustomClass = {
        "status-checked": this.checked === true,
        "status-disabled": this.disabled === true,
      };
      Reflect.set(classNames, "size-" + this.filterSize, true);
      return classNames;
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    if (this.unsyncedValue !== this.syncedValue) {
      this.unsyncedValue = this.syncedValue;
    }
  },
  watch: {
    /**
     * @description: 监听选中值的改变
     * @author: Quarter
     * @param {SimpleRadioValue} newValue 改变的值
     * @param {SimpleRadioValue} oldValue 原来的值
     * @return
     */
    value(
      newValue: SimpleRadioValue,
      oldValue: SimpleRadioValue
    ) {
      if (this.unsyncedValue !== newValue) {
        this.unsyncedValue = newValue;
      }
    },
  },
  methods: {
    /**
     * @description: 选中单选框
     * @author: Quarter
     * @return
     */
    checkRadio(): void {
      if (
        this.disabled === false &&
        this.unsyncedValue !== this.label &&
        this.label !== undefined
      ) {
        this.unsyncedValue = this.label;
        this.syncedValue = this.unsyncedValue;
        this.$emit("input", this.label);
        this.$emit("change", this.label);
        this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
      }
    },
  },
});
</script>

<style lang="scss">
.simple-radio-button {
  color: #666666;
  cursor: default;
  border: 1px solid #d6e1e5;
  background-color: white;
  display: inline-flex;
  align-items: center;
  margin: 0;

  &:not(.status-disabled) {
    &.status-checked {
      color: #ffffff;
      background-color: #549fff;
    }

    &:not(.status-checked) {
      cursor: pointer;

      &:hover {
        color: #549fff;
      }
    }
  }

  &.status-disabled {
    color: #aaaaaa;
    cursor: not-allowed;
    border-color: rgba($color: #d6e1e5, $alpha: 0.5);

    &.status-checked {
      color: white;
      background-color: rgba($color: #549fff, $alpha: 0.5);
    }
  }

  &.size-mini {
    height: 24px;
    min-width: 24px;
    padding: 0 10px;
    font-size: 12px;

    &:first-of-type {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    &:last-of-type {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }

  &.size-small {
    height: 30px;
    min-width: 30px;
    padding: 0 10px;
    font-size: 14px;
  }

  &.size-medium {
    height: 34px;
    min-width: 34px;
    padding: 0 15px;
    font-size: 14px;
  }

  &.size-large {
    height: 40px;
    min-width: 40px;
    padding: 0 18px;
    font-size: 16px;

    &:first-of-type {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-of-type {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:nth-of-type(n + 2) {
    border-left: none;
  }

  &:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
