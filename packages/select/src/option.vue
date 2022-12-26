<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:41:16
 * @LastEditors: Quarter
 * @Description: 下拉框选项
 * @FilePath: /simple-ui/packages/select/src/option.vue
-->
<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
import { OptionConfig, SelectValue } from "./types";

let index = 0;

@Component({
  name: "SOption",
})
export default class Option extends Emitter {
  @Prop({
    type: [String, Number, Boolean],
    default: null,
  })
  value!: SelectValue; // 筛选项值

  selectValue: SelectValue[] = []; // 下拉框选中的值
  option: OptionConfig = {
    // 选项配置
    id: `option-${++index}`,
    label: null,
    value: null,
  };

  /**
   * @description: 获取标签内容
   * @return {String}
   */
  get label(): string {
    const names: VNode[] | undefined = this.$slots.default;
    if (Array.isArray(names) && names.length > 0) {
      const name: VNode = names[0];
      if (typeof name.text === "string") {
        return name.text;
      }
    }
    return "";
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    if (this.value !== undefined) {
      this.option.value = this.value;
    }
    this.option.label = this.label;
    this.dispatch("SSelect", "s-select-mount", [this.option]);
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  updated(): void {
    const value: SelectValue = this.value === undefined ? null : this.value;
    if (this.option.value !== value || this.option.label !== this.label) {
      this.option.value = value;
      this.option.label = this.label;
      this.dispatch("SSelect", "s-select-update", [this.option]);
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    this.dispatch("SSelect", "s-select-unmount", [this.option]);
  }
}
</script>
