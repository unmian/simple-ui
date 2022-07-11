<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:28:53
 * @LastEditors: Quarter
 * @Description: 复选框组组件
 * @FilePath: /simple-ui/packages/checkbox/src/checkbox-group.vue
-->
<template>
  <div class="s-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { deepAssign } from "packages/util";
import { Emitter } from "packages/mixins";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { CheckboxValue } from "./types";

@Component({
  name: "SCheckboxGroup",
})
export default class SCheckboxGroup extends Mixins(Emitter) {
  @Prop({
    type: Array,
    default: () => [],
  })
  value!: CheckboxValue[]; // 双向同步选中值

  unsyncedValue: CheckboxValue[] = []; // 不同步选中值

  /**
   * @description: 双向同步选中值
   * @author: Quarter
   * @return {CheckboxValue[]}
   */
  get syncedValue(): CheckboxValue[] {
    return this.value;
  }

  /**
   * @description: 双向同步选中值
   * @author: Quarter
   * @param {CheckboxValue[]} val 值
   * @return
   */
  set syncedValue(val: CheckboxValue[]) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.$on(
      "s-checkbox-register",
      (register: (value?: CheckboxValue[]) => void) => {
        register(deepAssign(this.unsyncedValue));
      }
    );
    this.$on("s-checkbox-checked", (label: CheckboxValue) => {
      this.check(label);
    });
    this.$on("s-checkbox-dischecked", (label: CheckboxValue) => {
      this.delete(label);
    });
  }

  /**
   * @description: 监听传入选中列表发生变化
   * @author: Quarter
   * @param {Array<CheckboxValue>} newValue 更改的值
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(newValue?: CheckboxValue[]): void {
    let canBroadcast: boolean = false;
    if (Array.isArray(newValue)) {
      if (
        Array.isArray(this.unsyncedValue) &&
        newValue.join(",") !== this.unsyncedValue.join(",")
      ) {
        canBroadcast = true;
      }
    } else {
      if (Array.isArray(this.unsyncedValue) && this.unsyncedValue.length > 0) {
        canBroadcast = true;
      }
    }
    if (Array.isArray(newValue)) {
      this.unsyncedValue = newValue;
    } else {
      this.syncedValue = new Array();
      this.unsyncedValue = new Array();
    }
    if (canBroadcast) {
      this.broadcast("SCheckbox", "s-checkbox-changed", [this.unsyncedValue]);
    }
  }

  /**
   * @description: 选中某个数据
   * @param {CheckboxValue} value 选中数值
   * @return
   */
  check(value: CheckboxValue): void {
    if (Array.isArray(this.unsyncedValue)) {
      if (this.unsyncedValue.indexOf(value) === -1) {
        this.unsyncedValue.push(value);
        this.syncedValue = this.unsyncedValue;
        this.$emit("input", this.unsyncedValue);
        this.$emit("change", this.unsyncedValue);
        this.broadcast("SCheckbox", "s-checkbox-changed", [this.unsyncedValue]);
        this.dispatch("SFormItem", "s-form-validate", ["change"]);
      }
    }
  }

  /**
   * @description: 删除某个数据
   * @param {CheckboxValue} value 删除数值
   * @return
   */
  delete(value: CheckboxValue): void {
    if (Array.isArray(this.unsyncedValue)) {
      while (this.unsyncedValue.indexOf(value) !== -1) {
        const index: number = this.unsyncedValue.indexOf(value);
        this.unsyncedValue.splice(index, 1);
        this.syncedValue = this.unsyncedValue;
        this.$emit("change", this.syncedValue);
        this.$emit("update", this.syncedValue);
        this.broadcast("SCheckbox", "s-checkbox-changed", [this.unsyncedValue]);
        this.dispatch("SFormItem", "s-form-validate", ["change"]);
      }
    }
  }
}
</script>

<style lang="scss">
.s-checkbox-group {
  width: 100%;
  height: 100%;
}
</style>
