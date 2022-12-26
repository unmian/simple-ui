<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-14 17:29:27
 * @LastEditors: Quarter
 * @Description: 简易的下拉框组件
 * @FilePath: /simple-ui/packages/select/src/select.vue
-->
<template>
  <div
    class="s-select"
    :class="{
      's-select--expand': expand,
      's-select--multiple': multiple === true,
      's-select-clearable': clearable === true,
      's-select--disabled': disabled === true,
      's-select--readonly': readonly === true,
      's-select--filter': filter,
    }"
  >
    <s-popover
      :hide-arrow="hideArrow"
      :special-class="specialClass"
      :show.sync="expand"
      :disabled="!enabled"
    >
      <template #reference>
        <div
          v-if="hasReference"
          class="s-select__input-container"
          @mouseenter="mouseEneter"
          @mouseleave="mouseLeave"
        >
          <div class="s-select__label">
            <slot name="reference"></slot>
          </div>
          <div v-if="showArrow" class="s-select__arrow" @click="handleClear">
            <icon :name="arrowIconName"></icon>
          </div>
        </div>
        <div
          v-else
          class="s-select__input-container"
          :style="{
            width,
            minHeight: height,
          }"
          @mouseenter="mouseEneter"
          @mouseleave="mouseLeave"
        >
          <div v-if="placeholderVisible" class="s-select__placeholder">
            <template v-if="filter">
              <s-input
                :height="`calc(${height} - 2px)`"
                v-model="filterKeyword"
                :placeholder="readonly ? readonlyPlaceholder : placeholder"
                @click.native.stop
                @focus="expand = true"
              ></s-input>
            </template>
            <template v-else>{{ readonly ? readonlyPlaceholder : placeholder }}</template>
          </div>
          <div v-else class="s-select__label">
            <template v-if="multiple">
              <s-tag
                :show-close="!disabled && !readonly"
                external
                v-for="config of optionCheckedList"
                :key="`tag-${config.id}`"
                @click.native.stop
                @close="handleOptionUncheck(config.value)"
                >{{ config.label }}</s-tag
              >
            </template>
            <template v-else>{{ labelName }}</template>
          </div>
          <div class="s-select__arrow" @click="handleClear">
            <icon :name="arrowIconName"></icon>
          </div>
        </div>
      </template>
      <div v-if="optionList.length > 0" class="s-select__option-list">
        <s-scroll full show-bar :style="{ 'max-height': listHeight }">
          <div
            class="s-select__option-item"
            :class="{ 's-select__option-checked': config.checked }"
            v-for="config of filterOptionList"
            :key="`s-option-${config.id}`"
            @click="handleOptionCheck(config.value)"
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
import { Icon } from "@unmian/simple-icons";
import { InputValue } from "packages/input";
import { Emitter } from "packages/mixins";
import { Component, Prop, Watch } from "vue-property-decorator";
import { SelectValue, OptionConfig, OptionConfigs } from "./types";

@Component({
  name: "SSelect",
  components: {
    Icon,
  },
})
export default class Select extends Emitter {
  // 宽度
  @Prop({
    type: String,
    default: "16rem",
  })
  width!: string;

  // 高度
  @Prop({
    type: String,
    default: "3.4rem",
  })
  height!: string;

  // 列表高度
  @Prop({
    type: String,
    default: "36rem",
  })
  listHeight!: string;

  // 选中值
  @Prop({
    type: [Array, String, Number, Boolean],
    default: null,
  })
  value!: SelectValue[] | SelectValue;

  // 是否可以过滤
  @Prop({
    type: Boolean,
    default: false,
  })
  filter!: boolean;

  // 是否支持复选
  @Prop({
    type: Boolean,
    default: false,
  })
  multiple!: boolean;

  // 提示文本
  @Prop({
    type: String,
    default: "请选择",
  })
  placeholder?: string;

  // 只读提示文本
  @Prop({
    type: String,
    default: "",
  })
  readonlyPlaceholder?: string;

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

  // 隐藏箭头
  @Prop({
    type: Boolean,
    default: false,
  })
  hideArrow!: boolean;

  // 自定义类名
  @Prop(String)
  specialClass?: string;

  // 所有的值域集合
  options: OptionConfigs = {};
  // 筛选词
  filterKeyword: InputValue = null;
  // 展开
  expand = false;
  // 鼠标是否在下拉框
  mouseOver = false;
  // 不同步的值
  unsyncedValue: SelectValue[] = [];

  /**
   * @description: 选中值
   * @return {SelectValue[] | SelectValue}
   */
  get syncedValue(): SelectValue[] | SelectValue {
    return this.value;
  }

  /**
   * @description: 选中值
   * @param {SelectValue[] | SelectValue} val
   * @return
   */
  set syncedValue(val: SelectValue[] | SelectValue) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 是否有自定义标题
   * @return {Boolean}
   */
  get hasReference(): boolean {
    return this.$slots.reference !== undefined;
  }

  /**
   * @description: 是否启用
   * @return {Boolean}
   */
  get enabled(): boolean {
    return this.disabled !== true && this.readonly !== true;
  }

  /**
   * @description: 下拉箭头的类名
   * @return {String}
   */
  get arrowIconName(): string {
    if (
      this.clearable === true &&
      this.mouseOver === true &&
      this.enabled &&
      this.realValue.length !== 0
    ) {
      return "close-circle";
    }
    if (this.expand === true) {
      return "chevron-up";
    }
    return "chevron-down";
  }

  /**
   * @description: 是否可见提示文字
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
   * @return {Array<OptionConfig>}
   */
  get optionList(): OptionConfig[] {
    return Object.values(this.options).map((option: OptionConfig) => {
      if (Array.isArray(this.unsyncedValue) && this.unsyncedValue.indexOf(option.value) > -1) {
        // eslint-disable-next-line no-param-reassign
        option.checked = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        option.checked = false;
      }
      return option;
    });
  }

  /**
   * @description: 可见的选项列表
   * @return {Array<OptionConfig>}
   */
  get filterOptionList(): OptionConfig[] {
    if (this.filter && typeof this.filterKeyword === "string") {
      const filterRegExp = new RegExp(this.filterKeyword);
      return this.optionList.filter((option: OptionConfig) =>
        filterRegExp.test(option.label || ""),
      );
    }
    return this.optionList;
  }

  /**
   * @description: 选中项文字列表
   * @return {Array<String>}
   */
  get optionCheckedList(): OptionConfig[] {
    if (Array.isArray(this.optionList)) {
      return this.optionList.filter((option: OptionConfig) => option.checked);
    }
    return [];
  }

  /**
   * @description: 标签内容
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
   * @return {Array<SelectValue>}
   */
  get realValue(): SelectValue[] {
    if (Array.isArray(this.unsyncedValue) && Array.isArray(this.optionList)) {
      const arr: SelectValue[] = [];
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
    return [];
  }

  /**
   * @description: 生命周期函数
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
   * @param {Array<FilterItemValue>} newValue 更改的值
   * @param {Array<FilterItemValue>} oldValue 原始值
   * @return
   */
  @Watch("value", {
    immediate: true,
  })
  handleValueChange(newValue?: SelectValue | SelectValue[]): void {
    if (Array.isArray(newValue)) {
      this.unsyncedValue = [...newValue];
    } else if (typeof newValue === "string" || typeof newValue === "number" || newValue === null) {
      this.unsyncedValue = [newValue];
    } else {
      this.unsyncedValue = [];
    }
    this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
  }

  /**
   * @description: 监听展开状态
   * @param {Boolean} newValue 更改的值
   * @param {Boolean} oldValue 原始值
   * @return
   */
  @Watch("expand")
  handleExpandChange(newValue: boolean): void {
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
  handleOptionCheck(value: SelectValue): void {
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
  handleOptionUncheck(value: SelectValue): void {
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
   * @return
   */
  mouseEneter(): void {
    this.mouseOver = true;
  }

  /**
   * @description: 鼠标移出
   * @return
   */
  mouseLeave(): void {
    this.mouseOver = false;
  }

  /**
   * @description: 清空下拉框
   * @return
   */
  handleClear(event: MouseEvent): void {
    if (this.clearable === true && this.realValue.length > 0) {
      this.unsyncedValue = [];
      this.broadcast("SOption", "s-select-update", [this.unsyncedValue]);
      let syncedValue: SelectValue[] | SelectValue = null;
      if (this.multiple === true) {
        syncedValue = [];
      }
      this.syncedValue = syncedValue;
      this.$emit("input", syncedValue);
      this.$emit("change", syncedValue);
      this.$emit("clear");
      event.stopPropagation();
    }
  }
}
</script>

<style lang="scss">
.s-select {
  color: inherit;
  display: inline-flex;

  .s-select__arrow {
    margin-left: var(--s-spacing-8);
  }

  .s-select__input-container {
    padding: 0 var(--s-spacing-12);
    font-size: 1.4rem;
    line-height: initial;
    border-radius: var(--s-border-radius);
    border: 1px solid var(--s-border-color);
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      border-color: var(--s-brand-hover);
    }
  }

  .s-select__placeholder {
    color: var(--s-text-placeholder);
  }

  .s-select__label {
    color: var(--s-text-primary);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .s-select__arrow {
    width: 2rem;
    color: var(--s-text-primary);
    font-size: 14px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: var(--s-spacing-8);
  }

  &:not(:last-child) {
    margin-right: var(--s-spacing-12);
  }
}

.s-select--filter {
  .s-select__input-container {
    padding-left: 0;
  }

  .s-select__label {
    padding: 0 var(--s-spacing-12);
  }

  .s-input__content {
    border-width: 0;
  }
}

.s-select--multiple {

  .s-select__label {
    padding: var(--s-spacing-4) 0;
    user-select: none;
    display: flex;
    flex-wrap: wrap;
  }

.s-tag {
  margin: 0.2rem;
}
}

.s-select--disabled {
  .s-select__input-container {
    cursor: not-allowed;
    background-color: var(--s-background-secondary);

    &:hover {
      border-color: var(--s-border-color);
    }
  }

  .s-select__label {
    color: var(--s-text-disabled);
  }

  .s-select__arrow {
    color: var(--s-text-disabled);
  }
}

.s-select--readonly:not(.s-select--disabled) {
  .s-select__input-container {
    cursor: default;

    &:hover {
      border-color: var(--s-border-color);
    }
  }

  .s-select__arrow {
    display: none;
  }
}

.s-select__option-list {
  padding: var(--s-spacing-4);
  box-sizing: border-box;

  .s-select__option-item {
    padding: var(--s-spacing-8) var(--s-spacing-16);
    color: var(--s-text-primary);
    font-size: 1.4rem;
    cursor: default;
    border-radius: var(--s-border-radius);

    &:not(.s-select__option-checked) {
      cursor: pointer;

      &:hover {
        color: var(--s-brand-hover);
        background-color: var(--s-background-secondary);
      }
    }

    &:nth-child(n + 2) {
      margin-top: var(--s-spacing-4);
    }
  }

  .s-select__option-checked {
    color: var(--s-brand-normal);
    background-color: var(--s-background-secondary);
  }
}
</style>
