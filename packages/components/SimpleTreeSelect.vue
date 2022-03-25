<!--
 * @Author: Quarter
 * @Date: 2020-07-21 18:30:14
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:19:25
 * @Description: 简易的下拉框
-->
<template>
  <div class="simple-tree-select" :class="customClass" :style="customStyle">
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
        <div v-if="placeholderVisible" class="select-placeholder">{{ placeholder }}</div>
        <div v-else class="select-label">
          <template v-if="multiple">
            <ul @click.stop>
              <li v-for="(tag, index) of label" :key="`tag-item-${index}`">
                <simple-tag
                  mode="light"
                  :show-close="!disabled"
                  external
                  @close="closeOptionTag(index)"
                >{{ tag }}</simple-tag>
              </li>
            </ul>
          </template>
          <template v-else>{{ labelName }}</template>
        </div>
        <div class="select-arrow" @click="clearSelect">
          <i :class="arrowClassName"></i>
        </div>
      </div>
      <div v-if="hasOption" class="option-list" style="padding: 2px 0">
        <simple-scroll full :style="{ 'max-height': listHeight }">
          <simple-tree-option
            v-for="node of filterTree"
            :key="`node-item-${node.id}`"
            :node="node"
            :props="props"
            :node-index="0"
          ></simple-tree-option>
        </simple-scroll>
      </div>
    </simple-popover>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import SimpleTreeOption from "./SimpleTreeOption.vue";
import {
  SimpleCustomClass,
  SimpleCustomStyle,
  SimpleSelectValue,
  SimpleTreeProp,
  SimpleIdentifier,
  SimpleSelectNodeConfig,
} from "../types";

export default Emitter.extend({
  name: "SimpleTreeSelect",
  components: {
    SimpleTreeOption,
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
      default: () => [],
    } as PropOptions<SimpleSelectValue[] | SimpleSelectValue>,
    props: { // 参数配置
      type: Object,
      default: () => ({}),
    } as PropOptions<SimpleTreeProp>,
    data: { // 树形结构数据
      type: Array,
      default: () => new Array(),
    },
    placeholder: { // 提示文本
      type: String,
      default: "请选择",
    },
    multiple: { // 是否支持复选
      type: Boolean,
      default: false,
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
      label: new Array<string>(), // 标签值
      options: new Array<SimpleSelectValue>(), // 所有的值域集合
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
      }
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
     * @description: 识别符属性
     * @author: Quarter
     * @return {String}
     */
    idProperty(): string {
      if (this.props && typeof this.props.id === "string") {
        return this.props.id;
      }
      return "id";
    },
    /**
     * @description: 标签属性
     * @author: Quarter
     * @return {String}
     */
    labelProperty(): string {
      if (this.props && typeof this.props.label === "string") {
        return this.props.label;
      }
      return "label";
    },
    /**
     * @description: 子节点属性
     * @author: Quarter
     * @return {String}
     */
    childrenProperty(): string {
      if (this.props && typeof this.props.children === "string") {
        return this.props.children;
      }
      return "children";
    },
    /**
     * @description: 过滤树结构数据
     * @author: Quarter
     * @return {Array<SimpleSelectNodeConfig>}
     */
    filterTree(): SimpleSelectNodeConfig[] {
      if (Array.isArray(this.data)) {
        return this.data.map((node: any, index: number) => {
          if (typeof node === "object") {
            const treeItem: SimpleSelectNodeConfig = {
              id: node[this.idProperty] || index,
              label: node[this.labelProperty] || "",
            };
            if (Array.isArray(node[this.childrenProperty])) {
              treeItem.children = node[this.childrenProperty];
            }
            return treeItem;
          } else {
            return {
              id: index,
              label: "",
            };
          }
        });
      }
      return new Array();
    },
    /**
     * @description: 是否存在选项
     * @author: Quarter
     * @return {Boolean}
     */
    hasOption(): boolean {
      return Array.isArray(this.filterTree) && this.filterTree.length > 0;
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
     * @description: 标签内容
     * @author: Quarter
     * @return {String}
     */
    labelName(): string {
      const labels: string[] = this.label;
      if (Array.isArray(labels) && labels.length > 0) {
        return labels.join(",");
      }
      return "请选择";
    },
    /**
     * @description: 是否可见提示文字
     * @author: Quarter
     * @return {Boolean}
     */
    placeholderVisible(): boolean {
      return this.label.length === 0 && typeof this.placeholder === "string";
    },
    /**
     * @description: 真实的被选值
     * @author: Quarter
     * @return {Array<SimpleSelectValue>}
     */
    realValue(): SimpleSelectValue[] {
      if (Array.isArray(this.unsyncedValue) && Array.isArray(this.options)) {
        const arr: SimpleSelectValue[] = new Array();
        const options: SimpleSelectValue[] = this.options;
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
    this.$on(
      "simple-select-mount",
      (
        value: SimpleSelectValue,
        callback: (value: SimpleSelectValue[]) => void
      ) => {
        this.mountOption(value);
        callback(this.unsyncedValue);
      }
    );
    this.$on("simple-select-unmount", (value: SimpleSelectValue) => {
      this.unmountOption(value);
    });
    this.$on("simple-select-check", (value: SimpleSelectValue) => {
      this.check(value);
    });
    this.$on("simple-select-discheck", (value: SimpleSelectValue) => {
      this.delete(value);
    });
    this.$on("simple-select-label-add", (label: string) => {
      this.addLabel(label);
    });
    this.$on("simple-select-label-delete", (label: string) => {
      this.deleteLabel(label);
    });
  },
  methods: {
    /**
     * @description: 选项挂载
     * @author: Quarter
     * @param {SimpleSelectValue} value 选项的值
     * @return
     */
    mountOption(value: SimpleSelectValue): void {
      if (Array.isArray(this.options) && this.options.indexOf(value) === -1) {
        this.options.push(value);
      }
    },
    /**
     * @description: 选项卸载
     * @author: Quarter
     * @param {SimpleSelectValue} value 选项的值
     * @return
     */
    unmountOption(value: SimpleSelectValue): void {
      if (Array.isArray(this.options) && this.options.indexOf(value) !== -1) {
        this.options.splice(this.options.indexOf(value));
      }
    },
    /**
     * @description: 添加某个标签
     * @author: Quarter
     * @param {String} 标签
     * @return
     */
    addLabel(label: string): void {
      if (typeof label === "string" && label !== "") {
        if (this.multiple === true) {
          if (this.label.indexOf(label) === -1) {
            this.label.push(label);
          }
        } else {
          this.label = [label];
        }
      }
    },
    /**
     * @description: 删除某个标签
     * @author: Quarter
     * @param {String} 标签
     * @return
     */
    deleteLabel(label: string): void {
      if (
        typeof label === "string" &&
        label !== "" &&
        this.label.indexOf(label) !== -1
      ) {
        let index: number = this.label.indexOf(label);
        while (index !== -1) {
          this.label.splice(index, 1);
          index = this.label.indexOf(label);
        }
      }
    },
    /**
     * @description: 关闭选项标签
     * @author: Quarter
     * @param {number} index 下标
     * @return
     */
    closeOptionTag(index: number): void {
      if (this.unsyncedValue.length > index && this.label.length > index) {
        this.delete(this.unsyncedValue[index]);
        this.deleteLabel(this.label[index]);
      }
    },
    /**
     * @description: 选中某个数据
     * @param {SelectItemValue} value 选中数值
     * @return
     */
    check(value: SimpleSelectValue): void {
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
            this.broadcast("SimpleTreeOption", "simple-select-update", [
              this.unsyncedValue,
            ]);
          } else {
            this.syncedValue = this.unsyncedValue;
            this.$emit("input", this.unsyncedValue);
            this.$emit("change", this.unsyncedValue, value);
            this.broadcast("SimpleTreeOption", "simple-select-update", [
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
    delete(value: SimpleSelectValue): void {
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
              this.broadcast("SimpleTreeOption", "simple-select-update", [
                this.unsyncedValue,
              ]);
            } else {
              this.syncedValue = this.unsyncedValue;
              this.$emit("input", this.unsyncedValue);
              this.$emit("change", this.unsyncedValue, value);
              this.broadcast("SimpleTreeOption", "simple-select-update", [
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
        this.broadcast("SimpleTreeOption", "simple-select-update", [
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
      handler(newValue?: SimpleSelectValue[],
        oldValue?: SimpleSelectValue[]): void {
        if (Array.isArray(newValue)) {
          this.unsyncedValue = newValue;
        } else if (
          typeof newValue === "string" ||
          typeof newValue === "number" ||
          newValue === null
        ) {
          this.unsyncedValue = [newValue];
        }
        this.broadcast("SimpleTreeOption", "simple-select-update", [
          this.unsyncedValue,
        ]);
      },
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
    },
  },
});
</script>

<style lang="scss">
.simple-tree-select {
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

  .option-list {
    padding: 3px 0;
  }

  &:not(:last-child) {
    margin-right: 10px;
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
</style>
