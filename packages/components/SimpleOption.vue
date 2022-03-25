<!--
 * @Author: Quarter
 * @Date: 2020-07-21 18:30:26
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:21:18
 * @Description: 建议的下拉框单项
--> 
<template></template>

<script lang="ts">
import { PropOptions, VNode } from "vue";
import { Emitter } from "../mixins";
import { SimpleOptionConfig, SimpleSelectValue } from "../types";

let index: number = 0;

export default Emitter.extend({
  name: "SimpleOption",
  props: {
    value: { // 筛选项值
      type: [String, Number, Boolean],
      default: null,
    } as PropOptions<SimpleSelectValue>,
  },
  data() {
    return {
      selectValue: new Array<SimpleSelectValue>(), // 下拉框选中的值
      option: { // 选项配置
        id: `option-${++index}`,
        label: null,
        value: null,
      } as SimpleOptionConfig,
    };
  },
  computed: {
    /**
     * @description: 获取标签内容
     * @author: Quarter
     * @return {String}
     */
    label(): string {
      const names: VNode[] | undefined = this.$slots.default;
      if (Array.isArray(names) && names.length > 0) {
        const name: VNode = names[0];
        if (typeof name.text === "string") {
          return name.text;
        }
      }
      return "";
    },
  },
  created(): void {
    if (this.value !== undefined) {
      this.option.value = this.value;
    }
    this.option.label = this.label;
    this.dispatch("SimpleSelect", "simple-select-mount", [this.option]);
  },
  updated(): void {
    const value: SimpleSelectValue =
      this.value === undefined ? null : this.value;
    if (this.option.value !== value || this.option.label !== this.label) {
      this.option.value = value;
      this.option.label = this.label;
      this.dispatch("SimpleSelect", "simple-select-update", [this.option]);
    }
  },
  beforeDestroy(): void {
    this.dispatch("SimpleSelect", "simple-select-unmount", [this.option]);
  },
});
</script>