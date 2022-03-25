<!--
 * @Author: Quarter
 * @Date: 2021-06-23 11:35:52
 * @LastEditTime: 2022-03-25 06:23:06
 * @LastEditors: Quarter
 * @Description: 
 * @FilePath: /simple-ui/packages/components/SimpleCheckboxButton.vue
-->
<template>
  <button class="simple-checkbox-button" :class="customClass" @click="check">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import { SimpleCheckboxValue, SimpleCustomClass, SimpleSize } from "../types";

export default Emitter.extend({
  name: "SimpleCheckboxButton",
  props: {
    label: {
      type: [String, Number, Boolean],
      default: null,
    } as PropOptions<SimpleCheckboxValue>, // 复选框的值
    size: String as PropOptions<SimpleSize>, // 尺寸大小
    checked: { // 单个使用的时候是否选中
      type: Boolean,
      default: false,
    },
    disabled: { // 是否禁用点击事件
      type: Boolean,
      default: false,
    },
    alone: { // 是否受控
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkStatus: false, // 被选中状态
      checkboxValue: new Array() as SimpleCheckboxValue[], // 复选框组的值
    };
  },
  computed: {
    /**
     * @description: 单个使用的时候是否选中
     * @author: Quarter
     * @return {boolean}
     */
    syncedChecked: {
      get(): boolean {
        return this.checked;
      },
      set(val: boolean): void {
        this.$emit("update:checked", val);
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
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      const classNames: SimpleCustomClass = {
        "status-checked": this.checkStatus === true,
        "status-disabled": this.disabled === true,
      };
      Reflect.set(classNames, "size-" + this.filterSize, true);
      return classNames;
    },
  },
  created(): void {
    if (
      this.checkboxValue !== undefined &&
      typeof this.syncedChecked === "boolean" &&
      this.checkStatus !== this.syncedChecked
    ) {
      this.checkStatus = this.syncedChecked;
    }
    if (this.alone === false) {
      this.$on("simple-checkbox-changed", (value?: SimpleCheckboxValue[]) => {
        if (Array.isArray(value)) {
          this.checkboxValue = value;
        }
      });
      this.dispatch("SimpleCheckboxGroup", "simple-checkbox-register", [
        this.registerCheckbox,
      ]);
    }
  },
  methods: {
    /**
     * @description: 注册复选框组
     * @author: Quarter
     * @param {Array<SimpleCheckboxValue>} value 选中的值
     * @return
     */
    registerCheckbox(value?: SimpleCheckboxValue[]): void {
      if (Array.isArray(value)) {
        this.checkboxValue = value;
        if (
          this.label !== undefined &&
          this.checkboxValue.indexOf(this.label) > -1
        ) {
          this.syncedChecked = true;
        }
      }
    },
    /**
     * @description: 切换选中状态
     * @author: Quarter
     * @return
     */
    check(event?: MouseEvent | boolean): void {
      if (this.disabled !== true) {
        const checkStatus: boolean = !this.checkStatus;
        this.syncedChecked = checkStatus;
        this.$emit("change", checkStatus, this.label);
        if (event !== false) {
          this.$emit("check", this.label);
        }
        if (this.alone === false) {
          if (
            this.label !== undefined &&
            (this.label === null ||
              typeof this.label === "string" ||
              typeof this.label === "number")
          ) {
            if (checkStatus === true) {
              this.dispatch("SimpleCheckboxGroup", "simple-checkbox-checked", [
                this.label,
              ]);
            } else {
              this.dispatch("SimpleCheckboxGroup", "simple-checkbox-dischecked", [
                this.label,
              ]);
            }
          }
          this.checkStatus = checkStatus;
        }
      }
    },
  },
  watch: {
    /**
     * @description: 监听选中变化
     * @author: Quarter
     * @param {Boolean} newValue 变化的值
     * @return
     */
    checked(newValue: boolean): void {
      if (typeof newValue === "boolean" && this.checkStatus !== newValue) {
        this.checkStatus = newValue;
      }
    },
    /**
     * @description: 更新复选框状态
     * @author: Quarter
     * @param {type} newValue 改变的值
     * @return
     */
    checkboxValue: {
      immediate: true,
      handler(newValue?: SimpleCheckboxValue[]): void {
        if (Array.isArray(newValue) && this.alone === false) {
          if (
            typeof this.label === "string" ||
            typeof this.label === "number" ||
            this.label === null
          ) {
            if ((newValue as any[]).indexOf(this.label) === -1) {
              this.checkStatus = false;
            } else {
              this.checkStatus = true;
            }
          }
        }
      },
    },
  },
});
</script>

<style lang="scss">
.simple-checkbox-button {
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
      border-radius: 3px 0 0 3px;
    }

    &:last-of-type {
      border-radius: 0 3px 3px 0;
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
      border-radius: 5px 0 0 5px;
    }

    &:last-of-type {
      border-radius: 0 5px 5px 0;
    }
  }

  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }

  &:nth-of-type(n + 2) {
    border-left: none;
  }

  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }
}
</style>