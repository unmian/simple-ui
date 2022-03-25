<!--
 * @Author: Quarter
 * @Date: 2020-07-17 14:51:13
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:23:54
 * @Description: 复选框组件
--> 
<template>
  <div class="simple-checkbox" :class="customClass" @click="check">
    <div class="checkbox-icon">
      <div class="inactive-view"></div>
      <div class="active-view">
        <i class="simple-icon-check"></i>
      </div>
    </div>
    <div v-if="hasSlot" class="checkbox-text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import { SimpleCheckboxValue, SimpleCustomClass } from "../types";

export default Emitter.extend({
  name: "SimpleCheckbox",
  props: {
    label: { // 复选框的值
      type: [String, Number, Boolean],
      default: null,
    } as PropOptions<SimpleCheckboxValue>,
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
    readonly: { // 是否只读
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
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "status-checked": this.checkStatus === true,
        "status-disabled": this.disabled === true,
        "status-readonly": this.readonly === true,
      };
    },
    /**
     * @description: 是否有插槽内容
     * @author: Quarter
     * @return {Boolean}
     */
    hasSlot(): boolean {
      return !!this.$slots.default;
    },
    /**
     * @description: 是否可用
     * @author: Quarter
     * @return
     */
    enabled(): boolean {
      return this.disabled !== true && this.readonly !== true;
    },
  }, created(): void {
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
      if (this.enabled) {
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
    checked: {
      immediate: true,
      handler(newValue: boolean): void {
        if (typeof newValue === "boolean" && this.checkStatus !== newValue) {
          this.checkStatus = newValue;
        }
      },
    },
    /**
     * @description: 监听值的变化
     * @author: Quarter
     * @return
     */
    label: {
      immediate: true,
      handler(): void {
        if (Array.isArray(this.checkboxValue) && this.alone === false) {
          if (
            typeof this.label === "string" ||
            typeof this.label === "number" ||
            this.label === null
          ) {
            if ((this.checkboxValue as any[]).indexOf(this.label) === -1) {
              this.checkStatus = false;
            } else {
              this.checkStatus = true;
            }
          }
        }
      },
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
.simple-checkbox {
  color: #333333;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  .checkbox-icon {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;

    .inactive-view,
    .active-view {
      width: 100%;
      height: 100%;
      font-size: 14px;
      font-weight: bolder;
      border-radius: 2px;
      box-sizing: border-box;
      transition: transform 0.2s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
    }

    .inactive-view {
      border: 1px solid #d6e1e5;
      background-color: #ffffff;
      transform: scale(1);
    }

    .active-view {
      color: #ffffff;
      background-color: #549fff;
      transform: scale(0);
    }
  }

  .checkbox-text {
    color: inherit;
    font-size: inherit;
    margin-left: 10px;
  }

  &.status-checked {
    .active-view {
      transform: scale(1);
    }
  }

  &.status-disabled {
    cursor: not-allowed;

    .inactive-view,
    .active-view {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .active-view {
      color: rgba(0, 0, 0, 0.3);
    }
  }

  &:not(.status-disabled).status-readonly {
    cursor: not-allowed;

    &.status-checked .checkbox-text {
      color: #549fff;
    }

    .inactive-view {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  &:not(:last-of-type) {
    margin-right: 30px;
  }
}
</style>