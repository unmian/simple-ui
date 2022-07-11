<!--
 * @Author: Quarter
 * @Date: 2022-04-08 03:35:34
 * @LastEditTime: 2022-07-05 11:19:00
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
            {{ placeholder }}
          </div>
          <div v-else class="select-label">
            <template v-if="multiple">
              <ul @click.stop>
                <li v-for="(tag, index) of label" :key="`tag-item-${index}`">
                  <s-tag
                    mode="light"
                    :show-close="!disabled"
                    external
                    @close="closeOptionTag(index)"
                    >{{ tag }}</s-tag
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
      <div v-if="hasOption" class="option-list" style="padding: 2px 0">
        <s-scroll full :style="{ 'max-height': listHeight }">
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
import { Emitter } from "packages/mixins";
import { SelectValue } from "packages/select";
import { TreeProp } from "packages/tree";
import { CustomClass, CustomStyle } from "packages/types";
import STreeOption from "./tree-option.vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { SelectNodeConfig } from "./types";

@Component({
  name: "STreeSelect",
  components: {
    STreeOption,
  },
})
export default class STreeSelect extends Mixins(Emitter) {
  @Prop(String)
  width?: String; // 宽度

  @Prop(String)
  height?: string; // 高度

  @Prop({
    type: String,
    default: "300px",
  })
  listHeight!: string; // 列表高度

  @Prop({
    type: [Array, String, Number, Boolean],
    default: () => [],
  })
  value!: SelectValue[] | SelectValue; // 选中值

  @Prop({
    type: Object,
    default: () => ({}),
  })
  props!: TreeProp; // 参数配置

  @Prop({
    type: Array,
    default: () => [],
  })
  data!: []; // 树形结构数据

  @Prop({
    type: String,
    default: "请选择",
  })
  placeholder!: string; // 提示文本

  @Prop({
    type: Boolean,
    default: false,
  })
  multiple!: boolean; // 是否支持复选

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

  label: string[] = []; // 标签值
  options: SelectValue[] = []; // 所有的值域集合
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
   * @param {SelectValue[] | SelectValue} val 值
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
   * @description: 识别符属性
   * @author: Quarter
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
   * @author: Quarter
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
   * @author: Quarter
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
   * @author: Quarter
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
        } else {
          return {
            id: index,
            label: "",
          };
        }
      });
    }
    return new Array();
  }

  /**
   * @description: 是否存在选项
   * @author: Quarter
   * @return {Boolean}
   */
  get hasOption(): boolean {
    return Array.isArray(this.filterTree) && this.filterTree.length > 0;
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
   * @description: 标签内容
   * @author: Quarter
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
   * @author: Quarter
   * @return {Boolean}
   */
  get placeholderVisible(): boolean {
    return this.label.length === 0 && typeof this.placeholder === "string";
  }

  /**
   * @description: 真实的被选值
   * @author: Quarter
   * @return {Array<SelectValue>}
   */
  get realValue(): SelectValue[] {
    if (Array.isArray(this.unsyncedValue) && Array.isArray(this.options)) {
      const arr: SelectValue[] = new Array();
      const options: SelectValue[] = this.options;
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
    this.$on("s-select-mount", (value: SelectValue, callback: (value: SelectValue[]) => void) => {
      this.mountOption(value);
      callback(this.unsyncedValue);
    });
    this.$on("s-select-unmount", (value: SelectValue) => {
      this.unmountOption(value);
    });
    this.$on("s-select-check", (value: SelectValue) => {
      this.check(value);
    });
    this.$on("s-select-discheck", (value: SelectValue) => {
      this.delete(value);
    });
    this.$on("s-select-label-add", (label: string) => {
      this.addLabel(label);
    });
    this.$on("s-select-label-delete", (label: string) => {
      this.deleteLabel(label);
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
  handleValueChange(newValue?: SelectValue[], oldValue?: SelectValue[]): void {
    if (Array.isArray(newValue)) {
      this.unsyncedValue = newValue;
    } else if (typeof newValue === "string" || typeof newValue === "number" || newValue === null) {
      this.unsyncedValue = [newValue];
    }
    this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
  }

  /**
   * @description: 监听展开状态
   * @author: Quarter
   * @param {Boolean} newValue 更改的值
   * @param {Boolean} oldValue 原始值
   * @return
   */
  @Watch("expand")
  handleExpandChaneg(newValue: boolean, oldValue: boolean): void {
    if (newValue === true) {
      this.$emit("expand");
    } else {
      this.$emit("close");
    }
  }

  /**
   * @description: 选项挂载
   * @author: Quarter
   * @param {SelectValue} value 选项的值
   * @return
   */
  mountOption(value: SelectValue): void {
    if (Array.isArray(this.options) && this.options.indexOf(value) === -1) {
      this.options.push(value);
    }
  }

  /**
   * @description: 选项卸载
   * @author: Quarter
   * @param {SelectValue} value 选项的值
   * @return
   */
  unmountOption(value: SelectValue): void {
    if (Array.isArray(this.options) && this.options.indexOf(value) !== -1) {
      this.options.splice(this.options.indexOf(value));
    }
  }

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
  }

  /**
   * @description: 删除某个标签
   * @author: Quarter
   * @param {String} 标签
   * @return
   */
  deleteLabel(label: string): void {
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
   * @author: Quarter
   * @param {number} index 下标
   * @return
   */
  closeOptionTag(index: number): void {
    if (this.unsyncedValue.length > index && this.label.length > index) {
      this.delete(this.unsyncedValue[index]);
      this.deleteLabel(this.label[index]);
    }
  }

  /**
   * @description: 选中某个数据
   * @param {SelectItemValue} value 选中数值
   * @return
   */
  check(value: SelectValue): void {
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

  /**
   * @description: 删除某个数据
   * @param {CheckboxValue} value 删除数值
   * @return
   */
  delete(value: SelectValue): void {
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
      this.broadcast("STreeOption", "s-select-update", [this.unsyncedValue]);
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
.s-tree-select {
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
