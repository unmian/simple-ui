<!--
 * @Author: Quarter
 * @Date: 2020-07-17 14:20:09
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:20:10
 * @Description: 
--> 
<template>
  <div class="simple-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { deepAssign } from "../expand/tool";
import { SimpleCheckboxValue } from "../types";
import { PropOptions } from "vue";

export default Emitter.extend({
  name: "SimpleCheckboxGroup",
  props: {
    value: { // 双向同步选中值
      type: Array,
      default: () => [],
    } as PropOptions<SimpleCheckboxValue[]>,
  },
  data() {
    return {
      unsyncedValue: new Array() as SimpleCheckboxValue[], // 不同步选中值
    };
  },
  computed: {
    /**
     * @description: 双向同步选中值
     * @author: Quarter
     * @return {SimpleCheckboxValue[]}
     */
    syncedValue: {
      get(): SimpleCheckboxValue[] {
        return this.value;
      },
      set(val: SimpleCheckboxValue[]): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      },
    },
  },
  created(): void {
    this.$on(
      "simple-checkbox-register",
      (register: (value?: SimpleCheckboxValue[]) => void) => {
        register(deepAssign(this.unsyncedValue));
      }
    );
    this.$on("simple-checkbox-checked", (label: SimpleCheckboxValue) => {
      this.check(label);
    });
    this.$on("simple-checkbox-dischecked", (label: SimpleCheckboxValue) => {
      this.delete(label);
    });
  },
  methods: {
    /**
     * @description: 选中某个数据
     * @param {SimpleCheckboxValue} value 选中数值
     * @return
     */
    check(value: SimpleCheckboxValue): void {
      if (Array.isArray(this.unsyncedValue)) {
        if (this.unsyncedValue.indexOf(value) === -1) {
          this.unsyncedValue.push(value);
          this.syncedValue = this.unsyncedValue;
          this.$emit("input", this.unsyncedValue);
          this.$emit("change", this.unsyncedValue);
          this.broadcast("SimpleCheckbox", "simple-checkbox-changed", [
            this.unsyncedValue,
          ]);
          this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
        }
      }
    },
    /**
     * @description: 删除某个数据
     * @param {SimpleCheckboxValue} value 删除数值
     * @return
     */
    delete(value: SimpleCheckboxValue): void {
      if (Array.isArray(this.unsyncedValue)) {
        while (this.unsyncedValue.indexOf(value) !== -1) {
          const index: number = this.unsyncedValue.indexOf(value);
          this.unsyncedValue.splice(index, 1);
          this.syncedValue = this.unsyncedValue;
          this.$emit("change", this.syncedValue);
          this.$emit("update", this.syncedValue);
          this.broadcast("SimpleCheckbox", "simple-checkbox-changed", [
            this.unsyncedValue,
          ]);
          this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
        }
      }
    },
  },
  watch: {
    /**
     * @description: 监听传入选中列表发生变化
     * @author: Quarter
     * @param {Array<SimpleCheckboxValue>} newValue 更改的值
     * @return
     */
    value: {
      immediate: true,
      handler(newValue?: SimpleCheckboxValue[]): void {
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
          this.broadcast("SimpleCheckbox", "simple-checkbox-changed", [
            this.unsyncedValue,
          ]);
        }
      },
    },
  },
});
</script>

<style lang="scss">
.simple-checkbox-group {
  width: 100%;
  height: 100%;
}
</style>
