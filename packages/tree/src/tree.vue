<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 17:25:08
 * @LastEditors: Quarter
 * @Description: 简易的树型组件
 * @FilePath: /simple-ui/packages/tree/src/tree.vue
-->
<template>
  <div class="s-tree">
    <s-checkbox-group v-model="checked">
      <fade-transition-group duration="0.2" tag="div">
        <s-tree-node
          v-for="node of filterNodeList"
          :key="`tree-node-${node.id}`"
          :data="node"
          :show-checkbox="showCheckbox"
          :can-select="canSelect"
          @expand="switchNodeExpand"
          @select="selectNode"
          @check="checkNode"
        >
          <template v-if="slotVisible">
            <slot :node="node"></slot>
          </template>
        </s-tree-node>
      </fade-transition-group>
    </s-checkbox-group>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { deepAssign } from "packages/util";
import { CheckboxGroup } from "packages/checkbox";
import { Identifier } from "packages/types";
import { FadeTransitionGroup } from "packages/transition";
import STreeNode from "./tree-node.vue";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import {
  TreeCheckedNode,
  TreeLazyLoad,
  TreeNodeConfig,
  TreeProp,
} from "./types";

@Component({
  name: "STree",
  components: {
    FadeTransitionGroup,
    SCheckboxGroup: CheckboxGroup,
    STreeNode,
  },
})
export default class STree extends Mixins(Emitter) {
  @Prop({
    type: Object,
    default: () => ({}),
  })
  props!: TreeProp; // 参数配置

  @Prop({
    type: Array,
    default: () => [],
  })
  data!: object[]; // 树数据

  @Prop({
    type: Array,
    default: () => [],
  })
  value!: Identifier[]; // 值

  @Prop({
    type: Boolean,
    default: false,
  })
  lazy!: boolean; // 是否懒加载

  @Prop(Function)
  load?: TreeLazyLoad; // 懒加载函数

  @Prop({
    type: Boolean,
    default: false,
  })
  initExpand!: boolean; // 是否默认展开

  @Prop({
    type: Boolean,
    default: false,
  })
  showCheckbox!: boolean; // 是否显示复选框

  @Prop({
    type: Boolean,
    default: false,
  })
  linkage!: boolean; // 是否联动

  @Prop([String, Number])
  select!: string | number; // 选中值

  @Prop({
    type: Boolean,
    default: false,
  })
  canSelect!: boolean; // 是否可以选择

  checkedNodes: TreeCheckedNode = {}; // 复选框选中的条目
  checked: Identifier[] = []; // 复选框选中的id
  slotVisible = false; // 是否存在放置
  treeData: any[] = []; // 节点数据
  nodeList: TreeNodeConfig[] = []; // 扁平化节点列表
  selectedNode: Identifier = -999999; // 选中的条目
  expandNodes: Identifier[] = []; // 展开的节点
  loadingNodes: Identifier[] = []; // 加载的节点

  /**
   * @description: 值
   * @author: Quarter
   * @return {Identifier[]}
   */
  get syncedValue(): Identifier[] {
    return this.value;
  }

  /**
   * @description: 值
   * @author: Quarter
   * @param {Identifier[]} val 值
   * @return
   */
  set syncedValue(val: Identifier[]) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 同步的选中值
   * @author: Quarter
   * @return {Identifier}
   */
  get syncSelect(): Identifier | undefined {
    return this.select;
  }

  /**
   * @description: 同步的选中值
   * @author: Quarter
   * @param {Identifier} val 值
   * @return
   */
  set syncSelect(val: Identifier | undefined) {
    this.$emit("update:select", val);
    this.$emit("input", val);
  }

  /**
   * @description: 过滤的树数据
   * @author: Quarter
   * @return {Array<Object>}
   */
  get filterData(): any[] {
    if (Array.isArray(this.data)) {
      return this.data;
    }
    return [];
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
   * @description: 是否叶子节点属性
   * @author: Quarter
   * @return {String}
   */
  get isLeafProperty(): string {
    if (this.props && typeof this.props.isLeaf === "string") {
      return this.props.isLeaf;
    }
    return "isLeaf";
  }

  /**
   * @description: 过滤的节点列表
   * @author: Quarter
   * @return {Array<TreeNodeConfig>}
   */
  get filterNodeList(): TreeNodeConfig[] {
    return this.nodeList
      .filter((node: TreeNodeConfig) => {
        if (node.level === 0) {
          return true;
        } else {
          for (const id of node.sequence.slice(0, node.sequence.length - 1)) {
            if (this.expandNodes.indexOf(id) === -1) {
              return false;
            }
          }
          return true;
        }
      })
      .map((node: TreeNodeConfig) => {
        node.selected = node.id === this.selectedNode;
        node.expand = (node.id &&
          this.expandNodes.indexOf(node.id) > -1) as boolean;
        return node;
      });
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    if (this.$scopedSlots.default) {
      this.slotVisible = true;
    } else {
      this.slotVisible = false;
    }
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  updated(): void {
    if (this.$scopedSlots.default) {
      this.slotVisible = true;
    } else {
      this.slotVisible = false;
    }
  }

  /**
   * @description: 监听传入选中节点
   * @author: Quarter
   * @return
   */
  @Watch("syncSelect", {
    immediate: true,
  })
  handleSyncSelectChange(): void {
    if (
      this.syncSelect !== undefined &&
      this.syncSelect !== this.selectedNode
    ) {
      this.selectedNode = this.syncSelect;
    }
  }

  /**
   * @description: 监听树节点数据变化
   * @author: Quarter
   * @return
   */
  @Watch("filterData", {
    immediate: true,
  })
  handleFilterDataChange(): void {
    this.treeData = this.filterData;
    this.nodeList = this.parseNodeList(this.treeData);
  }

  /**
   * @description: 监传入的值
   * @author: Quarter
   * @return
   */
  @Watch("syncedValue", {
    immediate: true,
  })
  handleSyncedValueChange(): void {
    if (Array.isArray(this.syncedValue)) {
      this.checked = this.syncedValue;
    } else if (this.syncedValue === undefined || this.syncedValue === null) {
      this.checked = new Array();
    }
  }

  /**
   * @description: 监听选中的值
   * @author: Quarter
   * @return
   */
  @Watch("checked")
  handleCheckedChange(): void {
    this.syncedValue = this.checked;
    this.$emit("input", this.checked);
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 取消选择
   * @author: Quarter
   * @return
   */
  cancelSelect(): void {
    this.selectedNode = -999999;
    this.syncSelect = undefined;
  }

  /**
   * @description: 解析节点列表
   * @author: Quarter
   * @param {Array<Object>} nodes 节点
   * @param {Number} level 节点层级
   * @param {TreeNodeConfig} parentNode 上级节点
   * @param {Array<Identifier>} sequence id序列
   * @param {Array<Number>} position 位置序列
   * @return {Array<TreeNodeConfig>}
   */
  parseNodeList(
    nodes: any[],
    level: number = 0,
    parentNode?: TreeNodeConfig,
    sequence: Identifier[] = [],
    position: number[] = []
  ): TreeNodeConfig[] {
    if (Array.isArray(nodes)) {
      let result: TreeNodeConfig[] = new Array();
      nodes.forEach((node: any, index: number) => {
        let isLeaf: boolean = false;
        if (node[this.isLeafProperty]) {
          isLeaf = true;
        } else if (!this.lazy) {
          if (
            Array.isArray(node[this.childrenProperty]) &&
            node[this.childrenProperty].length > 0
          ) {
            isLeaf = true;
          }
        }
        const config: TreeNodeConfig = {
          id: node[this.idProperty],
          parentId: parentNode ? parentNode.id : null,
          sequence: sequence.concat([node[this.idProperty]]),
          position: position.concat([index]),
          label: node[this.labelProperty] || "",
          level,
          isLeaf,
          selected: false,
          expand: false,
          loading: false,
          data: node,
        };
        result.push(config);
        if (
          !config.isLeaf &&
          !this.lazy &&
          this.initExpand &&
          this.expandNodes.indexOf(config.id) === -1
        ) {
          this.expandNodes.push(config.id);
        }
        if (
          typeof node[this.isLeafProperty] === "boolean" &&
          node[this.isLeafProperty]
        ) {
          if (Array.isArray(node[this.childrenProperty])) {
            result = result.concat(
              this.parseNodeList(
                node[this.childrenProperty],
                level + 1,
                config,
                config.sequence,
                config.position
              )
            );
          }
        } else if (Array.isArray(node[this.childrenProperty])) {
          result = result.concat(
            this.parseNodeList(
              node[this.childrenProperty],
              level + 1,
              config,
              config.sequence,
              config.position
            )
          );
        }
      });
      return result;
    }
    return new Array();
  }

  /**
   * @description: 切换节点展开状态
   * @author: Quarter
   * @param {TreeNodeConfig} node 节点配置
   * @return
   */
  switchNodeExpand(node: TreeNodeConfig): void {
    if (node.id) {
      if (this.expandNodes.indexOf(node.id) > -1) {
        this.expandNodes.splice(this.expandNodes.indexOf(node.id), 1);
      } else {
        if (
          this.lazy &&
          typeof this.load === "function" &&
          !node.isLeaf &&
          (!Array.isArray(node.data[this.childrenProperty]) ||
            (Array.isArray(node.data[this.childrenProperty]) &&
              node.data[this.childrenProperty].length === 0))
        ) {
          node.loading = true;
          this.load(node, (nodes: any[] = []) => {
            if (!Array.isArray(nodes)) {
              nodes = new Array();
            }
            this.insertChildNodes(node, nodes);
          });
        } else {
          this.expandNodes.push(node.id);
        }
      }
    }
  }

  /**
   * @description: 插入子节点
   * @author: Quarter
   * @return
   */
  insertChildNodes(node: TreeNodeConfig, nodes: any[]): void {
    let treeData: any[] = this.treeData;
    for (const id of node.position.slice(0, node.position.length - 1)) {
      if (treeData[id] && Array.isArray(treeData[id][this.childrenProperty])) {
        treeData = treeData[id][this.childrenProperty];
      } else {
        node.isLeaf = true;
        node.loading = false;
        return;
      }
    }
    if (treeData[node.position[node.position.length - 1]]) {
      if (nodes.length > 0) {
        treeData[node.position[node.position.length - 1]][
          this.childrenProperty
        ] = nodes;
        this.expandNodes.push(node.id);
      } else {
        treeData[node.position[node.position.length - 1]][this.isLeafProperty] =
          true;
      }
    }
    this.nodeList = this.parseNodeList(this.treeData);
  }

  /**
   * @description: 选择节点
   * @author: Quarter
   * @param {TreeNodeConfig} node 选中的节点
   * @return
   */
  selectNode(node: TreeNodeConfig): void {
    if (this.canSelect) {
      this.selectedNode = node.id;
      this.syncSelect = this.selectedNode;
      this.$emit("select", deepAssign(node), deepAssign(this.treeData));
    }
  }

  /**
   * @description: 选中节点
   * @author: Quarter
   * @param {TreeNodeConfig} node 选中的节点
   * @return
   */
  checkNode(node: TreeNodeConfig): void {
    if (this.showCheckbox) {
      this.$emit("check", deepAssign(node), deepAssign(this.treeData));
      this.$emit("change", this.checked, deepAssign(node));
    }
  }
}
</script>

<style lang="scss">
.s-tree {
  width: 100%;
  position: relative;
}
</style>
