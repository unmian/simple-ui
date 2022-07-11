<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-05 11:18:24
 * @LastEditors: Quarter
 * @Description: 简易的下拉框组件
 * @FilePath: /simple-ui/packages/select/src/select.vue
-->
<template>
  <div class="s-select" :class="customClass" :style="customStyle">
    <s-popover
      :hide-arrow="hideArrow"
      :special-class="specialClass"
      :show.sync="expand"
      :disabled="!enabled"
    >
      <template #reference>
        <div
          v-if="hasReference"
          class="select-name"
          @mouseenter="mouseEneter"
          @mouseleave="mouseLeave"
        >
          <div class="select-label">
            <slot name="reference"></slot>
          </div>
          <div v-if="showArrow" class="select-arrow" @click="clearSelect">
            <i :class="arrowClassName"></i>
          </div>
        </div>
        <div v-else class="select-input" @mouseenter="mouseEneter" @mouseleave="mouseLeave">
          <div v-if="placeholderVisible" class="select-placeholder">
            <template v-if="filter">
              <s-input
                v-model="filterKeyword"
                :placeholder="placeholder"
                @click.native.stop
                @focus="expand = true"
              ></s-input>
            </template>
            <template v-else>{{ placeholder }}</template>
          </div>
          <div v-else class="select-label">
            <template v-if="multiple">
              <ul @click.stop>
                <li v-for="config of optionCheckedList" :key="`tag-${config.id}`">
                  <s-tag
                    mode="light"
                    :show-close="!disabled"
                    external
                    @close="uncheck(config.value)"
                    >{{ config.label }}</s-tag
                  >
                </li>
              </ul>
            </template>
            <template v-else>{{ labelName }}</template>
          </div>
          <div class="select-arrow" @click="clearSelect">
            <i :class="arrowClassName"></i>
          </div>
        </div>
      </template>
      <div v-if="optionList.length > 0" class="s-option-list" style="padding: 2px 0">
        <s-scroll full :style="{ 'max-height': listHeight }">
          <div
            class="s-option"
            :class="{ 'item-checked': config.checked }"
            v-for="config of filterOptionList"
            :key="`s-${config.id}`"
            @click="check(config.value)"
          >
            {{ config.label }}
          </div>
        </s-scroll>
      </div>
      <slot></slot>
    </s-popover>
  </div>
</template>

<script lang="ts">
import { Input, InputValue } from "packages/input";
import { Emitter } from "packages/mixins";
import { CustomClass, CustomStyle } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { SelectValue, OptionConfig, OptionConfigs } from "./types";

@Component({
  name: "SSelect",
})
export default class SSelect extends Mixins(Emitter) {
  @Prop(String)
  width?: string; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop({
    type: String,
    default: "300px",
  })
  listHeight!: string; // 列表高度

  @Prop({
    type: [Array, String, Number, Boolean],
    default: null,
  })
  value!: SelectValue[] | SelectValue; // 选中值

  @Prop({
    type: Boolean,
    default: false,
  })
  filter!: boolean; // 是否可以过滤

  @Prop({
    type: Boolean,
    default: false,
  })
  multiple!: boolean; // 是否支持复选

  @Prop({
    type: String,
    default: "请选择",
  })
  placeholder?: string; // 提示文本

  @Prop({
    type: Boolean,
    default: true,
  })
  showArrow!: boolean; // 是否显示下拉箭头

  @Prop({
    type: Boolean,
    default: false,
  })
  clearable!: boolean; // 是否可以清除

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

  @Prop({
    type: Boolean,
    default: false,
  })
  hideArrow!: boolean; // 隐藏箭头

  @Prop(String)
  specialClass?: string; // 自定义类名

  options: OptionConfigs = {}; // 所有的值域集合
  filterKeyword: InputValue = null; // 筛选词
  expand = false; // 展开
  mouseOver = false; // 鼠标是否在下拉框
  unsyncedValue: SelectValue[] = []; // 不同步的值

  /**
   * @description: 选中值
   * @author: Quarter
   * @return {SelectValue[] | SelectValue}
   */
  get syncedValue(): SelectValue[] | SelectValue {
    return this.value;
  }

  /**
   * @description: 选中值
   * @author: Quarter
   * @param {SelectValue[] | SelectValue} val
   * @return
   */
  set syncedValue(val: SelectValue[] | SelectValue) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 是否有自定义标题
   * @author: Quarter
   * @return {Boolean}
   */
  get hasReference(): boolean {
    return this.$slots.reference !== undefined;
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
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "select-expand": this.expand === true,
      "mode-multiple": this.multiple === true,
      "s-select-clearable": this.clearable === true,
      "status-disabled": this.disabled === true,
      "status-readonly": this.readonly === true,
      "filter-select": this.filter !== false,
    };
  }

  /**
   * @description: 自定义样式表
   * @author: Quarter
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    const styles: CustomStyle = {};
    if (typeof this.width === "string") {
      styles["--select-container-width"] = this.width;
    }
    if (typeof this.height === "string") {
      styles["--select-container-height"] = this.height;
    }
    return styles;
  }

  /**
   * @description: 下拉箭头的类名
   * @author: Quarter
   * @return {String}
   */
  get arrowClassName(): string {
    if (
      this.clearable === true &&
      this.mouseOver === true &&
      this.enabled &&
      this.realValue.length !== 0
    ) {
      return "s-icon-circle-close";
    } else {
      if (this.expand === true) {
        return "s-icon-caret-top";
      } else {
        return "s-icon-caret-bottom";
      }
    }
  }

  /**
   * @description: 是否可见提示文字
   * @author: Quarter
   * @return {Boolean}
   */
  get placeholderVisible(): boolean {
    if (this.optionList.filter((option: OptionConfig) => option.checked).length > 0) {
      return false;
    }
    return true;
  }

  /**
   * @description: 选项列表
   * @author: Quarter
   * @return {Array<OptionConfig>}
   */
  get optionList(): OptionConfig[] {
    return Object.values(this.options).map((option: OptionConfig) => {
      if (Array.isArray(this.unsyncedValue) && this.unsyncedValue.indexOf(option.value) > -1) {
        option.checked = true;
      } else {
        option.checked = false;
      }
      return option;
    });
  }

  /**
   * @description: 可见的选项列表
   * @author: Quarter
   * @return {Array<OptionConfig>}
   */
  get filterOptionList(): OptionConfig[] {
    if (this.filter && typeof this.filterKeyword === "string") {
      const filterRegExp: RegExp = new RegExp(this.filterKeyword);
      return this.optionList.filter((option: OptionConfig) =>
        filterRegExp.test(option.label || ""),
      );
    } else {
      return this.optionList;
    }
  }

  /**
   * @description: 选中项文字列表
   * @author: Quarter
   * @return {Array<String>}
   */
  get optionCheckedList(): OptionConfig[] {
    if (Array.isArray(this.optionList)) {
      return this.optionList.filter((option: OptionConfig) => option.checked);
    }
    return new Array();
  }

  /**
   * @description: 标签内容
   * @author: Quarter
   * @return {String}
   */
  get labelName(): string {
    if (Array.isArray(this.optionList)) {
      const labels: string[] = this.optionCheckedList
        .map((option: OptionConfig) => option.label)
        .filter((label: string | null) => typeof label === "string") as string[];
      if (labels.length > 0) {
        return labels.join(",");
      }
    }
    return "请选择";
  }

  /**
   * @description: 真实的被选值
   * @author: Quarter
   * @return {Array<SelectValue>}
   */
  get realValue(): SelectValue[] {
    if (Array.isArray(this.unsyncedValue) && Array.isArray(this.optionList)) {
      const arr: SelectValue[] = new Array();
      const options: SelectValue[] = this.optionList.map((option: OptionConfig) => option.value);
      this.unsyncedValue.forEach((value: SelectValue) => {
        if (value === null || typeof value === "string" || typeof value === "number") {
          if (options.indexOf(value) !== -1) {
            arr.push(value);
          }
        }
      });
      return arr;
    }
    return new Array();
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.$on("s-select-mount", (config: OptionConfig) => {
      if (config && typeof config.id === "string") {
        this.$set(this.options, config.id, config);
      }
    });
    this.$on("s-select-update", (config: OptionConfig) => {
      if (config && typeof config.id === "string") {
        this.$set(this.options, config.id, config);
      }
    });
    this.$on("s-select-unmount", (config: OptionConfig) => {
      if (config && typeof config.id === "string") {
        this.$delete(this.options, config.id);
      }
    });
  }

  /**
   * @description: 监听传入选中列表发生变化
   * @author: Quarter
   * @param {Array<FilterItemValue>} newValue 更改的值
   * @param {Array<FilterItemValue>} oldValue 原始值
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(newValue?: SelectValue | SelectValue[]): void {
    if (Array.isArray(newValue)) {
      this.unsyncedValue = new Array().concat(newValue);
    } else if (typeof newValue === "string" || typeof newValue === "number" || newValue === null) {
      this.unsyncedValue = [newValue];
    } else {
      this.unsyncedValue = new Array();
    }
    this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
  }

  /**
   * @description: 监听展开状态
   * @author: Quarter
   * @param {Boolean} newValue 更改的值
   * @param {Boolean} oldValue 原始值
   * @return
   */
  @Watch("expand")
  handleExpandChange(newValue: boolean, oldValue: boolean): void {
    if (newValue === true) {
      this.$emit("expand");
    } else {
      this.$emit("close");
    }
  }

  /**
   * @description: 选中某个数据
   * @param {SelectItemValue} value 选中数值
   * @return
   */
  check(value: SelectValue): void {
    if (this.filter) {
      this.filterKeyword = null;
    }
    if (Array.isArray(this.unsyncedValue)) {
      if (this.unsyncedValue.indexOf(value) === -1) {
        if (this.multiple === true) {
          this.unsyncedValue.push(value);
        } else {
          this.unsyncedValue = [value];
          this.expand = false;
        }
        if (
          typeof this.syncedValue === "string" ||
          typeof this.syncedValue === "number" ||
          (this.syncedValue === null && this.multiple === false) ||
          (this.syncedValue === undefined && this.multiple === false)
        ) {
          const syncedValue: SelectValue =
            this.unsyncedValue.length > 0 ? this.unsyncedValue[0] : null;
          this.syncedValue = syncedValue;
          this.$emit("input", syncedValue);
          this.$emit("change", syncedValue);
          this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
        } else {
          this.syncedValue = this.unsyncedValue;
          this.$emit("input", this.unsyncedValue);
          this.$emit("change", this.unsyncedValue, value);
          this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
        }
        this.dispatch("SFormItem", "s-form-validate", ["change"]);
      }
    }
  }

  /**
   * @description: 删除某个数据
   * @param {CheckboxValue} value 删除数值
   * @return
   */
  uncheck(value: SelectValue): void {
    if (Array.isArray(this.unsyncedValue)) {
      if (
        this.unsyncedValue.length > 1 ||
        this.multiple === true ||
        (this.unsyncedValue.length > 0 && this.clearable === true)
      ) {
        while (this.unsyncedValue.indexOf(value) !== -1) {
          const index: number = this.unsyncedValue.indexOf(value);
          this.unsyncedValue.splice(index, 1);
          if (
            typeof this.syncedValue === "string" ||
            typeof this.syncedValue === "number" ||
            (this.syncedValue === null && this.multiple === false) ||
            (this.syncedValue === undefined && this.multiple === false)
          ) {
            const syncedValue: SelectValue =
              this.unsyncedValue.length > 0 ? this.unsyncedValue[0] : null;
            this.syncedValue = syncedValue;
            this.$emit("input", syncedValue);
            this.$emit("change", syncedValue);
            this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
          } else {
            this.syncedValue = this.unsyncedValue;
            this.$emit("input", this.unsyncedValue);
            this.$emit("change", this.unsyncedValue, value);
            this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
          }
          this.dispatch("SFormItem", "s-form-validate", ["change"]);
        }
      }
    }
  }

  /**
   * @description: 鼠标移出
   * @author: Quarter
   * @return
   */
  mouseEneter(): void {
    this.mouseOver = true;
  }

  /**
   * @description: 鼠标移出
   * @author: Quarter
   * @return
   */
  mouseLeave(): void {
    this.mouseOver = false;
  }

  /**
   * @description: 清空下拉框
   * @author: Quarter
   * @return
   */
  clearSelect(event: MouseEvent): void {
    if (this.clearable === true && this.realValue.length > 0) {
      this.unsyncedValue = new Array();
      this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
      let syncedValue: SelectValue[] | SelectValue = null;
      if (this.multiple === true) {
        syncedValue = new Array();
      }
      this.syncedValue = syncedValue;
      this.$emit("input", syncedValue);
      this.$emit("change", syncedValue);
      this.$emit("clear");
      event.stopPropagation();
      event.cancelBubble = true;
    }
  }
}
</script>

<style lang="scss">
.s-select {
  color: inherit;
  display: inline-flex;

  .select-name {
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;

    .select-arrow {
      margin-left: 10px;
    }
  }

  .select-input {
    width: var(--select-container-width, fit-content);
    min-width: 50px;
    height: var(--select-container-height, 36px);
    padding: 0 10px;
    font-size: 14px;
    line-height: initial;
    border-radius: 4px;
    border: 1px solid #d6e1e5;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #ffffff;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select-placeholder {
      color: #d6e1e5;
    }

    .select-label {
      color: #333333;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .select-arrow {
      width: 20px;
      height: 20px;
      color: #666666;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
    }

    &:hover {
      border-color: #b7c1c5;
    }
  }

  &:not(:last-child) {
    margin-right: 10px;
  }

  &.filter-select {
    .s-input {
      margin-left: -10px;

      .input-content,
      .input-content:hover {
        border-color: transparent;
      }
    }
  }

  &.mode-multiple {
    .select-input {
      height: initial;
      min-height: var(--select-container-height, 36px);

      .select-label {
        padding: 5px 0;
        user-select: none;

        ul {
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          margin: 0;

          li {
            margin: 2px;
          }
        }
      }
    }
  }

  &.status-disabled {
    .select-input {
      cursor: default;
      background-color: #f9f9f9;

      .select-label {
        color: #666666;
      }

      .select-arrow {
        color: #d6e1e5;
      }

      &:hover {
        border-color: #d6e1e5;
      }
    }
  }

  &:not(.status-disabled).status-readonly {
    .select-input {
      cursor: not-allowed;

      .select-arrow {
        display: none;
      }

      &:hover {
        border-color: #d6e1e5;
      }
    }
  }
}

.s-option-list {
  padding: 3px 0;

  .s-option {
    padding: 12px 20px;
    color: #999999;
    font-size: 14px;
    cursor: default;

    &:not(.item-checked) {
      cursor: pointer;

      &:hover {
        color: #008cfe;
        background-color: rgba(100, 100, 100, 0.08);
      }
    }

    &.item-checked {
      color: #0079fe;
      background-color: rgba(84, 159, 255, 0.08);
    }
  }
}
</style>
