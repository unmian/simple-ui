<!--
 * @Author: Quarter
 * @Date: 2020-07-21 18:30:14
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:15:11
 * @Description: 简易的下拉框
-->
<template>
  <div class="simple-select" :class="customClass" :style="customStyle">
    <simple-popover
      :hide-arrow="hideArrow"
      :special-class="specialClass"
      :show.sync="expand"
      :disabled="!enabled"
    >
      <div
        v-if="hasReference"
        class="select-name"
        slot="reference"
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
      <div
        v-else
        class="select-input"
        slot="reference"
        @mouseenter="mouseEneter"
        @mouseleave="mouseLeave"
      >
        <div v-if="placeholderVisible" class="select-placeholder">
          <template v-if="filter">
            <simple-input
              v-model="filterKeyword"
              :placeholder="placeholder"
              @click.native.stop
              @focus="expand = true"
            ></simple-input>
          </template>
          <template v-else>{{ placeholder }}</template>
        </div>
        <div v-else class="select-label">
          <template v-if="multiple">
            <ul @click.stop>
              <li v-for="config of optionCheckedList" :key="`tag-${config.id}`">
                <simple-tag
                  mode="light"
                  :show-close="!disabled"
                  external
                  @close="uncheck(config.value)"
                >{{ config.label }}</simple-tag>
              </li>
            </ul>
          </template>
          <template v-else>{{ labelName }}</template>
        </div>
        <div class="select-arrow" @click="clearSelect">
          <i :class="arrowClassName"></i>
        </div>
      </div>
      <div v-if="optionList.length > 0" class="simple-option-list" style="padding: 2px 0">
        <simple-scroll full :style="{ 'max-height': listHeight }">
          <div
            class="simple-option"
            :class="{ 'item-checked': config.checked }"
            v-for="config of filterOptionList"
            :key="`simple-${config.id}`"
            @click="check(config.value)"
          >{{ config.label }}</div>
        </simple-scroll>
      </div>
      <slot></slot>
    </simple-popover>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import SimpleInput from "./SimpleInput.vue";
import {
  SimpleCustomClass,
  SimpleCustomStyle,
  SimpleInputValue,
  SimpleOptionConfig,
  SimpleOptionConfigs,
  SimpleSelectValue,
} from "../types";

export default Emitter.extend({
  name: "SimpleSelect",
  components: {
    SimpleInput,
  },
  props: {
    width: String, // 宽度
    height: String, // 高度
    listHeight: { // 列表高度
      type: String,
      default: "300px",
    },
    value: { // 选中值
      type: [Array, String, Number, Boolean],
      default: null,
    } as PropOptions<SimpleSelectValue[] | SimpleSelectValue>,
    filter: { // 是否可以过滤
      type: Boolean,
      default: false,
    },
    multiple: { // 是否支持复选
      type: Boolean,
      default: false,
    },
    placeholder: { // 提示文本
      type: String,
      default: "请选择",
    },
    showArrow: { // 是否显示下拉箭头
      type: Boolean,
      default: true,
    },
    clearable: { // 是否可以清除
      type: Boolean,
      default: false,
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false,
    },
    readonly: { // 是否只读
      type: Boolean,
      default: false,
    },
    hideArrow: { // 隐藏箭头
      type: Boolean,
      default: false,
    },
    specialClass: String, // 自定义类名
  },
  data() {
    return {
      options: {} as SimpleOptionConfigs, // 所有的值域集合
      filterKeyword: null as SimpleInputValue, // 筛选词
      expand: false, // 展开
      mouseOver: false, // 鼠标是否在下拉框
      unsyncedValue: new Array<SimpleSelectValue>(), // 不同步的值
    };
  },
  computed: {
    /**
     * @description: 选中值
     * @author: Quarter
     * @return {SimpleSelectValue[] | SimpleSelectValue}
     */
    syncedValue: {
      get(): SimpleSelectValue[] | SimpleSelectValue {
        return this.value;
      },
      set(val: SimpleSelectValue[] | SimpleSelectValue): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      },
    },
    /**
     * @description: 是否有自定义标题
     * @author: Quarter
     * @return {Boolean}
     */
    hasReference(): boolean {
      return this.$slots.reference !== undefined;
    },
    /**
     * @description: 是否启用
     * @author: Quarter
     * @return {Boolean}
     */
    enabled(): boolean {
      return this.disabled !== true && this.readonly !== true;
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "select-expand": this.expand === true,
        "mode-multiple": this.multiple === true,
        "simple-select-clearable": this.clearable === true,
        "status-disabled": this.disabled === true,
        "status-readonly": this.readonly === true,
        "filter-select": this.filter !== false,
      };
    },
    /**
     * @description: 自定义样式表
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    customStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {};
      if (typeof this.width === "string") {
        styles["--select-container-width"] = this.width;
      }
      if (typeof this.height === "string") {
        styles["--select-container-height"] = this.height;
      }
      return styles;
    },
    /**
     * @description: 下拉箭头的类名
     * @author: Quarter
     * @return {String}
     */
    arrowClassName(): string {
      if (
        this.clearable === true &&
        this.mouseOver === true &&
        this.enabled &&
        this.realValue.length !== 0
      ) {
        return "simple-icon-circle-close";
      } else {
        if (this.expand === true) {
          return "simple-icon-caret-top";
        } else {
          return "simple-icon-caret-bottom";
        }
      }
    },
    /**
     * @description: 是否可见提示文字
     * @author: Quarter
     * @return {Boolean}
     */
    placeholderVisible(): boolean {
      if (
        this.optionList.filter((option: SimpleOptionConfig) => option.checked)
          .length > 0
      ) {
        return false;
      }
      return true;
    },
    /**
     * @description: 选项列表
     * @author: Quarter
     * @return {Array<SimpleOptionConfig>}
     */
    optionList(): SimpleOptionConfig[] {
      return Object.values(this.options).map((option: SimpleOptionConfig) => {
        if (
          Array.isArray(this.unsyncedValue) &&
          this.unsyncedValue.indexOf(option.value) > -1
        ) {
          option.checked = true;
        } else {
          option.checked = false;
        }
        return option;
      });
    },
    /**
     * @description: 可见的选项列表
     * @author: Quarter
     * @return {Array<SimpleOptionConfig>}
     */
    filterOptionList(): SimpleOptionConfig[] {
      if (this.filter && typeof this.filterKeyword === "string") {
        const filterRegExp: RegExp = new RegExp(this.filterKeyword);
        return this.optionList.filter((option: SimpleOptionConfig) =>
          filterRegExp.test(option.label || "")
        );
      } else {
        return this.optionList;
      }
    },
    /**
     * @description: 选中项文字列表
     * @author: Quarter
     * @return {Array<String>}
     */
    optionCheckedList(): SimpleOptionConfig[] {
      if (Array.isArray(this.optionList)) {
        return this.optionList.filter(
          (option: SimpleOptionConfig) => option.checked
        );
      }
      return new Array();
    },
    /**
     * @description: 标签内容
     * @author: Quarter
     * @return {String}
     */
    labelName(): string {
      if (Array.isArray(this.optionList)) {
        const labels: string[] = this.optionCheckedList
          .map((option: SimpleOptionConfig) => option.label)
          .filter(
            (label: string | null) => typeof label === "string"
          ) as string[];
        if (labels.length > 0) {
          return labels.join(",");
        }
      }
      return "请选择";
    },
    /**
     * @description: 真实的被选值
     * @author: Quarter
     * @return {Array<SimpleSelectValue>}
     */
    realValue(): SimpleSelectValue[] {
      if (Array.isArray(this.unsyncedValue) && Array.isArray(this.optionList)) {
        const arr: SimpleSelectValue[] = new Array();
        const options: SimpleSelectValue[] = this.optionList.map(
          (option: SimpleOptionConfig) => option.value
        );
        this.unsyncedValue.forEach((value: SimpleSelectValue) => {
          if (
            value === null ||
            typeof value === "string" ||
            typeof value === "number"
          ) {
            if (options.indexOf(value) !== -1) {
              arr.push(value);
            }
          }
        });
        return arr;
      }
      return new Array();
    },
  },
  created(): void {
    this.$on("simple-select-mount", (config: SimpleOptionConfig) => {
      if (config && typeof config.id === "string") {
        this.$set(this.options, config.id, config);
      }
    });
    this.$on("simple-select-update", (config: SimpleOptionConfig) => {
      if (config && typeof config.id === "string") {
        this.$set(this.options, config.id, config);
      }
    });
    this.$on("simple-select-unmount", (config: SimpleOptionConfig) => {
      if (config && typeof config.id === "string") {
        this.$delete(this.options, config.id);
      }
    });
  },
  methods: {
    /**
     * @description: 选中某个数据
     * @param {SelectItemValue} value 选中数值
     * @return
     */
    check(value: SimpleSelectValue): void {
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
            const syncedValue: SimpleSelectValue =
              this.unsyncedValue.length > 0 ? this.unsyncedValue[0] : null;
            this.syncedValue = syncedValue;
            this.$emit("input", syncedValue);
            this.$emit("change", syncedValue);
            this.broadcast("SimpleOption", "simple-select-update", [
              this.unsyncedValue,
            ]);
          } else {
            this.syncedValue = this.unsyncedValue;
            this.$emit("input", this.unsyncedValue);
            this.$emit("change", this.unsyncedValue, value);
            this.broadcast("SimpleOption", "simple-select-update", [
              this.unsyncedValue,
            ]);
          }
          this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
        }
      }
    },
    /**
     * @description: 删除某个数据
     * @param {CheckboxValue} value 删除数值
     * @return
     */
    uncheck(value: SimpleSelectValue): void {
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
              const syncedValue: SimpleSelectValue =
                this.unsyncedValue.length > 0 ? this.unsyncedValue[0] : null;
              this.syncedValue = syncedValue;
              this.$emit("input", syncedValue);
              this.$emit("change", syncedValue);
              this.broadcast("SimpleOption", "simple-select-update", [
                this.unsyncedValue,
              ]);
            } else {
              this.syncedValue = this.unsyncedValue;
              this.$emit("input", this.unsyncedValue);
              this.$emit("change", this.unsyncedValue, value);
              this.broadcast("SimpleOption", "simple-select-update", [
                this.unsyncedValue,
              ]);
            }
            this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
          }
        }
      }
    },
    /**
     * @description: 鼠标移出
     * @author: Quarter
     * @return
     */
    mouseEneter(): void {
      this.mouseOver = true;
    },
    /**
     * @description: 鼠标移出
     * @author: Quarter
     * @return
     */
    mouseLeave(): void {
      this.mouseOver = false;
    },
    /**
     * @description: 清空下拉框
     * @author: Quarter
     * @return
     */
    clearSelect(event: MouseEvent): void {
      if (this.clearable === true && this.realValue.length > 0) {
        this.unsyncedValue = new Array();
        this.broadcast("SimpleOption", "simple-select-update", [
          this.unsyncedValue,
        ]);
        let syncedValue: SimpleSelectValue[] | SimpleSelectValue = null;
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
    },
  },
  watch: {
    /**
     * @description: 监听传入选中列表发生变化
     * @author: Quarter
     * @param {Array<FilterItemValue>} newValue 更改的值
     * @param {Array<FilterItemValue>} oldValue 原始值
     * @return
     */
    value: {
      immediate: true,
      handler(newValue?: SimpleSelectValue | SimpleSelectValue[]): void {
        if (Array.isArray(newValue)) {
          this.unsyncedValue = new Array().concat(newValue);
        } else if (
          typeof newValue === "string" ||
          typeof newValue === "number" ||
          newValue === null
        ) {
          this.unsyncedValue = [newValue];
        } else {
          this.unsyncedValue = new Array();
        }
        this.broadcast("SimpleOption", "simple-select-update", [
          this.unsyncedValue,
        ]);
      }
    },
    /**
     * @description: 监听展开状态
     * @author: Quarter
     * @param {Boolean} newValue 更改的值
     * @param {Boolean} oldValue 原始值
     * @return
     */
    expand(newValue: boolean, oldValue: boolean): void {
      if (newValue === true) {
        this.$emit("expand");
      } else {
        this.$emit("close");
      }
    }
  },
});
</script>

<style lang="scss">
.simple-select {
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
    .simple-input {
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

.simple-option-list {
  padding: 3px 0;

  .simple-option {
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
