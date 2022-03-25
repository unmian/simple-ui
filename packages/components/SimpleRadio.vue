<!--
 * @Author: Quarter
 * @Date: 2020-07-23 18:51:47
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:15:03
 * @Description: 
--> 
<template>
  <div class="simple-radio" :class="customClass" @click="checkRadio">
    <div class="radio">
      <div class="inactive-view"></div>
      <div class="active-view"></div>
    </div>
    <div v-if="hasSlot" class="radio-label">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import { SimpleCustomClass, SimpleRadioValue } from "../types";

export default Emitter.extend({
  name: "SimpleRadio",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    } as PropOptions<SimpleRadioValue>,
    label: {
      type: [String, Number, Boolean],
      default: null,
    } as PropOptions<SimpleRadioValue>, // 当前单选框的值
    disabled: { // 是否禁用
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
        this.$emit("input", val);
      },
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
      return {
        "status-checked": this.checked === true,
        "status-disabled": this.disabled === true,
        "status-readonly": this.readonly === true,
      };
    },
  },
  created(): void {
    if (this.unsyncedValue !== this.syncedValue) {
      this.unsyncedValue = this.syncedValue;
    }
  },
  methods: {
    /**
     * @description: 选中单选框
     * @author: Quarter
     * @return
     */
    checkRadio(): void {
      if (
        this.enabled &&
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
  watch: {
    /**
     * @description: 监听选中值的改变
     * @author: Quarter
     * @return
     */
    value(): void {
      if (this.unsyncedValue !== this.syncedValue) {
        this.unsyncedValue = this.syncedValue;
      }
    },
  },
});
</script>

<style lang="scss">
.simple-radio {
  cursor: default;
  display: inline-flex;
  align-items: center;

  .radio {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ffffff;
    position: relative;

    .inactive-view,
    .active-view {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-sizing: border-box;
      transition: transform 0.2s ease;
      position: absolute;
      top: 0;
      left: 0;
    }

    .inactive-view {
      border: 1px solid #d6e1e5;
    }

    .active-view {
      border: 5px solid #549fff;
      transform: scale(0);
    }
  }

  .radio-label {
    color: #333333;
    font-size: 14px;
    margin-left: 10px;
  }

  &.status-checked .active-view {
    transform: scale(1);
  }

  &.status-disabled {
    cursor: not-allowed;

    .inactive-view {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .active-view {
      border-color: rgba(0, 0, 0, 0.2);
    }
  }

  &:not(.status-disabled).status-readonly {
    cursor: not-allowed;

    .inactive-view {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.status-checked .radio-label {
      color: #549fff;
    }
  }

  &:not(:last-of-type) {
    margin-right: 30px;
  }
}
</style>
