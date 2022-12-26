<!--
 * @Author: Quarter
 * @Date: 2022-04-08 03:35:33
 * @LastEditTime: 2022-12-14 17:29:49
 * @LastEditors: Quarter
 * @Description: 树形下拉框选项组件
 * @FilePath: /simple-ui/packages/tree-select/src/tree-option.vue
-->
<template>
  <div
    v-if="node"
    class="s-tree-option"
    :class="{
      's-tree-option--checked': isChecked,
    }"
  >
    <div class="s-tree-option__node" :style="nodeStyle">
      <div class="node-arrow">
        <s-button
          :class="{ 'roll-down': filterExpand }"
          v-if="hasChildren"
          variant="plain"
          shape="circle"
          size="small"
          icon="chevron-right"
          @click="switchNodeList"
        >
        </s-button>
      </div>
      <div class="s-tree-option__node-info" @click="handleOptionCheck">{{ node.label }}</div>
    </div>
    <collapse-transition>
      <div class="s-tree-option__node-list" v-if="hasChildren" v-show="filterExpand">
        <s-tree-option
          v-for="node of filterSubNodes"
          :key="`node-item-${node.id}`"
          :node="node"
          :props="props"
          :node-index="nodeIndex + 1"
        ></s-tree-option>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Emitter } from "packages/mixins";
import { SelectValue } from "packages/select";
import { TreeProp } from "packages/tree";
import { CustomStyle } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";
import { SelectNodeConfig } from "./types";

@Component({
  name: "STreeOption",
  components: {
    Icon,
  },
})
export default class TreeOption extends Emitter {
  // 参数配置
  @Prop({
    type: Object,
    default: () => ({}),
  })
  readonly props!: TreeProp;

  // 筛选项值
  @Prop({
    type: Object,
    required: true,
  })
  readonly node!: SelectNodeConfig;

  // 子节点层数
  @Prop({
    type: Number,
    default: 1,
  })
  readonly nodeIndex!: number;

  // 选中项
  isChecked = false;
  // 下拉框选中的值
  selectValue: SelectValue[] = [];
  // 展开下拉框
  expand = false;

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
   * @description: 过滤的展开值
   * @return {Boolean}
   */
  get hasChildren(): boolean {
    if (this.node && Array.isArray(this.node.children) && this.node.children.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * @description: 过滤子节点
   * @return {Array<TreeNodeConfig>}
   */
  get filterSubNodes(): SelectNodeConfig[] {
    if (this.hasChildren && Array.isArray(this.node.children)) {
      return this.node.children.map((node: any, index: number) => {
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
   * @description: 过滤的展开值
   * @return {Boolean}
   */
  get filterExpand(): boolean {
    return this.hasChildren && this.expand;
  }

  /**
   * @description: 列表样式
   * @return {CustomStyle}
   */
  get nodeStyle(): CustomStyle {
    const styles: CustomStyle = {};
    if (typeof this.nodeIndex === "number") {
      styles["padding-left"] = `${10 + 15 * this.nodeIndex}px`;
    }
    return styles;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    this.$on("s-tree-option__update", (value: SelectValue[]) => {
      if (Array.isArray(value)) {
        this.selectValue = value;
      }
    });
    if (
      this.node.id === null ||
      typeof this.node.id === "string" ||
      typeof this.node.id === "number"
    ) {
      this.dispatch("STreeSelect", "s-tree-select__mount", [
        this.node.id,
        (value: SelectValue[]) => {
          if (Array.isArray(value)) {
            this.selectValue = value;
          }
        },
      ]);
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    if (
      this.node.id === null ||
      typeof this.node.id === "string" ||
      typeof this.node.id === "number"
    ) {
      this.dispatch("STreeSelect", "s-tree-select__unmount", [this.node.id]);
    }
  }

  /**
   * @description: 更新复选框状态
   * @return
   */
  @Watch("selectValue", {
    immediate: true,
  })
  handlerSelectValueChange(selectValue: SelectValue[]): void {
    if (!Array.isArray(selectValue)) {
      return;
    }
    const { id } = this.node;
    if (selectValue.includes(id)) {
      this.isChecked = true;
      this.dispatch("STreeSelect", "s-tree-select__label-check", [this.node.label]);
    } else {
      this.isChecked = false;
      this.dispatch("STreeSelect", "s-tree-select__label-remove", [this.node.label]);
    }
  }

  /**
   * @description: 切换子节点列表
   * @return
   */
  switchNodeList(): void {
    this.expand = !this.expand;
  }

  /**
   * @description: 点击选项
   * @return
   */
  handleOptionCheck(): void {
    if (this.node.id !== undefined) {
      if (this.isChecked === true) {
        this.dispatch("STreeSelect", "s-tree-select__remove", [this.node.id]);
      } else {
        this.dispatch("STreeSelect", "s-tree-select__check", [this.node.id]);
      }
    }
  }
}
</script>

<style lang="scss">
.s-tree-option {
  color: var(--s-text-primary);
  font-size: 1.4rem;
  cursor: default;

  &:nth-child(n + 2) {
    margin-top: var(--s-spacing-4);
  }
}

.s-tree-option__node {
  padding: var(--s-spacing-8) var(--s-spacing-16) var(--s-spacing-8) var(--s-spacing-8);
  border-radius: var(--s-border-radius);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: var(--s-background-secondary);

    .s-tree-option__node-info {
      color: var(--s-brand-hover);
    }
  }

  .node-arrow {
    width: 2.6rem;
    height: 2.6rem;
  }

  .s-button {
    transition: transform 0.2s ease-in-out;

    &.roll-down {
      transform: rotate(90deg);
    }
  }

  .s-tree-option__node-info {
    flex: 1;
    box-sizing: border-box;
  }
}

/* &:not(.s-tree-option--checked) > .s-tree-option__node {
  .s-tree-option__node-info {
    cursor: pointer;

    &:hover {
      color: #008cfe;
    }
  }

  &:hover {
    background-color: rgba(100, 100, 100, 0.08);
  }
} */

.s-tree-option--checked > .s-tree-option__node {
  background-color: var(--s-background-secondary);

  .s-tree-option__node-info {
    color: var(--s-brand-normal);
  }
}
</style>
