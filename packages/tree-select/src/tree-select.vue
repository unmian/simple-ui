<!--
 * @Author: Quarter
 * @Date: 2022-04-08 03:35:34
 * @LastEditTime: 2022-12-14 17:27:25
 * @LastEditors: Quarter
 * @Description: 树形下拉框组件
 * @FilePath: /simple-ui/packages/tree-select/src/tree-select.vue
-->
<template>
  <div class="s-tree-select" :class="customClass" :style="customStyle">
    <s-popover
      :hide-arrow="hideArrow"
      :special-class="specialClass"
      :show.sync="expand"
      :disabled="!enabled"
    >
      <template #reference>
        <div
          v-if="hasReference"
          class="s-tree-select__input-container"
          :style="{
            width,
            height,
          }"
          @mouseenter="mouseEneter"
          @mouseleave="mouseLeave"
        >
          <div class="s-tree-select__label">
            <slot name="reference"></slot>
          </div>
          <div v-if="showArrow" class="s-tree-select__arrow" @click="handleClear">
            <icon :name="arrowIconName"></icon>
          </div>
        </div>
        <div
          v-else
          class="s-tree-select__input-container"
          :style="{
            width,
            minHeight: height,
          }"
          @mouseenter="mouseEneter"
          @mouseleave="mouseLeave"
        >
          <div v-if="placeholderVisible" class="s-tree-select__placeholder">
            {{ placeholder }}
          </div>
          <div v-else class="s-tree-select__label">
            <template v-if="multiple">
              <s-tag
                :show-close="!disabled && !readonly"
                external
                v-for="(tag, index) of label"
                :key="`tag-item-${index}`"
                @close="handleTagRemove(index)"
                >{{ tag }}</s-tag
              >
            </template>
            <template v-else>{{ labelName }}</template>
          </div>
          <div v-if="!readonly" class="s-tree-select__arrow" @click="handleClear">
            <icon :name="arrowIconName"></icon>
          </div>
        </div>
      </template>
      <div v-if="hasOption" class="s-tree-select__option-list">
        <s-scroll full show-bar :style="{ 'max-height': listHeight }">
          <s-tree-option
            v-for="node of filterTree"
            :key="`node-item-${node.id}`"
            :node="node"
            :props="props"
            :node-index="0"
          ></s-tree-option>
        </s-scroll>
      </div>
    </s-popover>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Emitter } from "packages/mixins";
import { SelectValue } from "packages/select";
import { TreeProp } from "packages/tree";
import { CustomClass, CustomStyle } from "packages/types";
import STreeOption from "./tree-option.vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { SelectNodeConfig } from "./types";

@Component({
  name: "STreeSelect",
  components: {
    Icon,
    STreeOption,
  },
})
export default class TreeSelect extends Emitter {
  // 宽度
  @Prop(String)
  readonly width?: string;

  // 高度
  @Prop(String)
  readonly height?: string;

  // 列表高度
  @Prop({
    type: String,
    default: "32rem",
  })
  readonly listHeight!: string;

  // 选中值
  @Prop({
    type: [Array, String, Number, Boolean],
    default: () => [],
  })
  readonly value!: SelectValue[] | SelectValue;

  // 参数配置
  @Prop({
    type: Object,
    default: () => ({}),
  })
  readonly props!: TreeProp;

  // 树形结构数据
  @Prop({
    type: Array,
    default: () => [],
  })
  readonly data!: [];

  // 提示文本
  @Prop({
    type: String,
    default: "请选择",
  })
  readonly placeholder!: string;

  // 是否支持复选
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly multiple!: boolean;

  // 是否显示下拉箭头
  @Prop({
    type: Boolean,
    default: true,
  })
  readonly showArrow!: boolean;

  // 是否可以清除
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly clearable!: boolean;

  // 是否禁用
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean;

  // 是否只读
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly readonly!: boolean;

  // 隐藏箭头
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly hideArrow!: boolean;

  // 自定义类名
  @Prop(String)
  readonly specialClass?: string;

  // 标签值
  label: string[] = [];
  // 所有的值域集合
  options: SelectValue[] = [];
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
   * @param {SelectValue[] | SelectValue} val 值
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
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "s-tree-select--expand": this.expand === true,
      "s-tree-select--multiple": this.multiple === true,
      "s-tree-select--clearable": this.clearable === true,
      "s-tree-select--disabled": this.disabled === true,
      "s-tree-select--readonly": this.readonly === true,
    };
  }

  /**
   * @description: 自定义样式表
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
   * @description: 识别符属性
   * @return {String}
   */
  get idProperty(): string {
    if (this.props && typeof this.props.id === "string") {
      return this.props.id;
    }
    return "id";
  }

  /**
   * @description: 标签属性
   * @return {String}
   */
  get labelProperty(): string {
    if (this.props && typeof this.props.label === "string") {
      return this.props.label;
    }
    return "label";
  }

  /**
   * @description: 子节点属性
   * @return {String}
   */
  get childrenProperty(): string {
    if (this.props && typeof this.props.children === "string") {
      return this.props.children;
    }
    return "children";
  }

  /**
   * @description: 过滤树结构数据
   * @return {Array<SelectNodeConfig>}
   */
  get filterTree(): SelectNodeConfig[] {
    if (Array.isArray(this.data)) {
      return this.data.map((node: any, index: number) => {
        if (typeof node === "object") {
          const treeItem: SelectNodeConfig = {
            id: node[this.idProperty] || index,
            label: node[this.labelProperty] || "",
          };
          if (Array.isArray(node[this.childrenProperty])) {
            treeItem.children = node[this.childrenProperty];
          }
          return treeItem;
        }
        return {
          id: index,
          label: "",
        };
      });
    }
    return [];
  }

  /**
   * @description: 是否存在选项
   * @return {Boolean}
   */
  get hasOption(): boolean {
    return Array.isArray(this.filterTree) && this.filterTree.length > 0;
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
   * @description: 标签内容
   * @return {String}
   */
  get labelName(): string {
    const labels: string[] = this.label;
    if (Array.isArray(labels) && labels.length > 0) {
      return labels.join(",");
    }
    return "请选择";
  }

  /**
   * @description: 是否可见提示文字
   * @return {Boolean}
   */
  get placeholderVisible(): boolean {
    return this.label.length === 0 && typeof this.placeholder === "string";
  }

  /**
   * @description: 真实的被选值
   * @return {Array<SelectValue>}
   */
  get realValue(): SelectValue[] {
    if (Array.isArray(this.unsyncedValue) && Array.isArray(this.options)) {
      const arr: SelectValue[] = [];
      const { options } = this;
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
    this.$on(
      "s-tree-select__mount",
      (value: SelectValue, callback: (value: SelectValue[]) => void) => {
        this.handleOptionMount(value);
        callback(this.unsyncedValue);
      },
    );
    this.$on("s-tree-select__unmount", (value: SelectValue) => {
      this.handleOptionUnmount(value);
    });
    this.$on("s-tree-select__check", (value: SelectValue) => {
      this.handleOptionCheck(value);
    });
    this.$on("s-tree-select__remove", (value: SelectValue) => {
      this.handleOptionRemove(value);
    });
    this.$on("s-tree-select__label-check", (label: string) => {
      this.handleLabelCheck(label);
    });
    this.$on("s-tree-select__label-remove", (label: string) => {
      this.handleLabelRmove(label);
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
  handleValueChange(newValue?: SelectValue[]): void {
    if (Array.isArray(newValue)) {
      this.unsyncedValue = newValue;
    } else if (typeof newValue === "string" || typeof newValue === "number" || newValue === null) {
      this.unsyncedValue = [newValue];
    }
    this.broadcast("STreeOption", "s-tree-option__update", [this.unsyncedValue]);
  }

  /**
   * @description: 监听选中项列表发生变化
   * @param {Array<FilterItemValue>} newValue 更改的值
   * @return
   */
  @Watch("realValue", {
    immediate: true,
  })
  handleRealValueChange(newValue?: SelectValue[]): void {
    this.broadcast("STreeOption", "s-tree-option__update", [newValue]);
  }

  /**
   * @description: 监听展开状态
   * @param {Boolean} newValue 更改的值
   * @return
   */
  @Watch("expand")
  handleExpandChaneg(newValue: boolean): void {
    if (newValue === true) {
      this.$emit("expand");
    } else {
      this.$emit("close");
    }
  }

  /**
   * @description: 选项挂载
   * @param {SelectValue} value 选项的值
   * @return
   */
  handleOptionMount(value: SelectValue): void {
    if (Array.isArray(this.options) && this.options.indexOf(value) === -1) {
      this.options.push(value);
    }
  }

  /**
   * @description: 选项卸载
   * @param {SelectValue} value 选项的值
   * @return
   */
  handleOptionUnmount(value: SelectValue): void {
    if (Array.isArray(this.options) && this.options.indexOf(value) !== -1) {
      this.options.splice(this.options.indexOf(value));
    }
  }

  /**
   * @description: 添加某个标签
   * @param {String} 标签
   * @return
   */
  handleLabelCheck(label: string): void {
    if (typeof label === "string" && label !== "") {
      if (this.multiple === true) {
        if (this.label.indexOf(label) === -1) {
          this.label.push(label);
        }
      } else {
        this.label = [label];
      }
    }
  }

  /**
   * @description: 删除某个标签
   * @param {String} 标签
   * @return
   */
  handleLabelRmove(label: string): void {
    if (typeof label === "string" && label !== "" && this.label.indexOf(label) !== -1) {
      let index: number = this.label.indexOf(label);
      while (index !== -1) {
        this.label.splice(index, 1);
        index = this.label.indexOf(label);
      }
    }
  }

  /**
   * @description: 关闭选项标签
   * @param {number} index 下标
   * @return
   */
  handleTagRemove(index: number): void {
    if (this.unsyncedValue.length > index && this.label.length > index) {
      this.handleOptionRemove(this.unsyncedValue[index]);
      this.handleLabelRmove(this.label[index]);
    }
  }

  /**
   * @description: 选中某个数据
   * @param {SelectItemValue} value 选中数值
   * @return
   */
  handleOptionCheck(value: SelectValue): void {
    if (!Array.isArray(this.unsyncedValue) || this.unsyncedValue.includes(value)) {
      return;
    }
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
      const syncedValue: SelectValue = this.unsyncedValue.length > 0 ? this.unsyncedValue[0] : null;
      this.syncedValue = syncedValue;
      this.$emit("input", syncedValue);
      this.$emit("change", syncedValue);
      this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
    } else {
      this.syncedValue = this.unsyncedValue;
      this.$emit("input", this.unsyncedValue);
      this.$emit("change", this.unsyncedValue, value);
      this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
    }
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 删除某个数据
   * @param {CheckboxValue} value 删除数值
   * @return
   */
  handleOptionRemove(value: SelectValue): void {
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
            this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
          } else {
            this.syncedValue = this.unsyncedValue;
            this.$emit("input", this.unsyncedValue);
            this.$emit("change", this.unsyncedValue, value);
            this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
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
      this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
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
.s-tree-select {
  color: var(--s-text-primary);
  display: inline-flex;

  &:not(:last-child) {
    margin-right: var(--s-spacing-12);
  }
}

.s-tree-select__input-container {
  min-width: 5rem;
  min-height: 3.4rem;
  padding: 0 var(--s-spacing-12);
  font-size: 1.4rem;
  cursor: pointer;
  user-select: none;
  border-radius: var(--s-border-radius);
  border: 1px solid var(--s-border-color);
  box-sizing: border-box;
  background-color: var(--s-background-primary);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: var(--s-brand-hover);
  }
}

.s-tree-select__placeholder {
  color: var(--s-text-placeholder);
}

.s-tree-select__arrow {
  width: 2rem;
  height: 2rem;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: var(--s-spacing-12);
}

.s-tree-select--multiple {
  .s-tree-select__label {
    padding: var(--s-spacing-4) 0;
    display: flex;
    flex-wrap: wrap;
  }

  .s-tag {
    margin: 0.2rem;
  }
}

.s-tree-select--disabled {
  cursor: not-allowed;

  .s-tree-select__input-container {
    background-color: var(--s-background-secondary);

    &:hover {
      border-color: var(--s-border-color);
    }
  }

  .s-tree-select__label,
  .s-tree-select__arrow {
    color: var(--s-text-disabled);
  }
}

.s-tree-select--readonly:not(.s-tree-select--disabled) {
  cursor: default;

  .s-tree-select__input-container:hover {
    border-color: var(--s-border-color);
  }
}

.s-tree-select__option-list {
  padding: var(--s-spacing-4);
  border-radius: var(--s-border-radius);
}
</style>
