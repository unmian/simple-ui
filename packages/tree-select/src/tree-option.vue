<!--
 * @Author: Quarter
 * @Date: 2022-04-08 03:35:33
 * @LastEditTime: 2022-06-07 17:25:40
 * @LastEditors: Quarter
 * @Description: 树形下拉框选项组件
 * @FilePath: /simple-ui/packages/tree-select/src/tree-option.vue
-->
<template>
  <div v-if="node" class="s-tree-option" :class="customClass">
    <div class="current-node" :style="nodeStyle">
      <div class="node-arrow">
        <s-button
          :class="{ 'roll-down': filterExpand }"
          v-if="hasChildren"
          @click="switchNodeList"
        >
          <i class="s-icon-caret-right"></i>
        </s-button>
      </div>
      <div class="node-info" @click="checkOptionItem">{{ node.label }}</div>
    </div>
    <collapse-transition>
      <div class="node-list" v-if="hasChildren" v-show="filterExpand">
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
import { Emitter } from "packages/mixins";
import { SelectValue } from "packages/select";
import { TreeProp } from "packages/tree";
import { CustomClass, CustomStyle } from "packages/types";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { SelectNodeConfig } from "./types";

@Component({
  name: "STreeOption",
})
export default class STreeOption extends Mixins(Emitter) {
  @Prop({
    type: Object,
    default: () => ({}),
  })
  props!: TreeProp; // 参数配置

  @Prop({
    type: Object,
    required: true,
  })
  node!: SelectNodeConfig; // 筛选项值

  @Prop({
    type: Number,
    default: 1,
  })
  nodeIndex!: number; // 子节点层数

  checked = false; // 选中项
  selectValue: SelectValue[] = []; // 下拉框选中的值
  expand = false; // 展开下拉框

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
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "item-checked": this.checked === true,
    };
  }

  /**
   * @description: 过滤的展开值
   * @author: Quarter
   * @return {Boolean}
   */
  get hasChildren(): boolean {
    if (
      this.node &&
      Array.isArray(this.node.children) &&
      this.node.children.length > 0
    ) {
      return true;
    }
    return false;
  }

  /**
   * @description: 过滤子节点
   * @author: Quarter
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
   * @description: 过滤的展开值
   * @author: Quarter
   * @return {Boolean}
   */
  get filterExpand(): boolean {
    return this.hasChildren && this.expand;
  }

  /**
   * @description: 列表样式
   * @author: Quarter
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
   * @author: Quarter
   * @return
   */
  created(): void {
    this.$on("s-select-update", (value: SelectValue[]) => {
      if (Array.isArray(value)) {
        this.selectValue = value;
      }
    });
    if (
      this.node.id === null ||
      typeof this.node.id === "string" ||
      typeof this.node.id === "number"
    ) {
      this.dispatch("STreeSelect", "s-select-mount", [
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
   * @author: Quarter
   * @return
   */
  beforeDestroy(): void {
    if (
      this.node.id === null ||
      typeof this.node.id === "string" ||
      typeof this.node.id === "number"
    ) {
      this.dispatch("STreeSelect", "s-select-unmount", [this.node.id]);
    }
  }

  /**
   * @description: 更新复选框状态
   * @author: Quarter
   * @return
   */
  @Watch("selectValue", {
    immediate: true,
  })
  handlerSelectValueChange(): void {
    if (Array.isArray(this.selectValue)) {
      if (
        typeof this.node.id === "string" ||
        typeof this.node.id === "number" ||
        this.node.id === null
      ) {
        if (this.selectValue.indexOf(this.node.id) === -1) {
          this.checked = false;
          this.dispatch("STreeSelect", "s-select-label-delete", [
            this.node.label,
          ]);
        } else {
          this.checked = true;
          this.dispatch("STreeSelect", "s-select-label-add", [this.node.label]);
        }
      }
    }
  }

  /**
   * @description: 切换子节点列表
   * @author: Quarter
   * @return
   */
  switchNodeList(): void {
    this.expand = !this.expand;
  }

  /**
   * @description: 点击选项
   * @author: Quarter
   * @return
   */
  checkOptionItem(): void {
    if (this.node.id !== undefined) {
      if (this.checked === true) {
        this.dispatch("STreeSelect", "s-select-discheck", [this.node.id]);
      } else {
        this.dispatch("STreeSelect", "s-select-check", [this.node.id]);
      }
    }
  }
}
</script>

<style lang="scss">
.s-tree-option {
  color: #999999;
  font-size: 14px;
  cursor: default;

  .current-node {
    padding: 0 16px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .node-arrow {
      width: 26px;
      height: 26px;

      .s-button {
        width: 26px;
        min-width: initial;
        height: 26px;
        padding: 0;
        color: #666666;
        border-radius: 13px;
        transition: background-color 0.2s ease-in-out,
          transform 0.2s ease-in-out;

        i {
          margin: 0;
        }

        &.roll-down {
          transform: rotate(90deg);
        }

        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.05);
        }
      }
    }

    .node-info {
      width: calc(100% - 36px);
      padding: 12px 0;
      box-sizing: border-box;
    }
  }

  &:not(.item-checked) > .current-node {
    .node-info {
      cursor: pointer;

      &:hover {
        color: #008cfe;
      }
    }

    &:hover {
      background-color: rgba(100, 100, 100, 0.08);
    }
  }

  &.item-checked > .current-node {
    background-color: rgba(84, 159, 255, 0.08);

    .node-info {
      color: #0079fe;
    }
  }
}
</style>
