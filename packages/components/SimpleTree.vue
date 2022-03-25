<!--
 * @Author: Quarter
 * @Date: 2020-08-11 09:44:28
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:12:26
 * @Description: 简易的树
-->
<template>
  <div class="simple-tree">
    <simple-checkbox-group v-model="checked">
      <fade-transition-group duration="0.2" tag="div">
        <simple-tree-node
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
        </simple-tree-node>
      </fade-transition-group>
    </simple-checkbox-group>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import FadeTransitionGroup from "./FadeTransitionGroup.vue";
import SimpleCheckboxGroup from "./SimpleCheckboxGroup.vue";
import SimpleTreeNode from "./SimpleTreeNode.vue";
import {
  SimpleCheckedNode,
  SimpleIdentifier,
  SimpleLazyLoad,
  SimpleNodeConfig,
  SimpleTreeProp,
} from "../types";
import { deepAssign } from "../expand/tool";
import { PropOptions } from "vue";

export default Emitter.extend({
  name: "SimpleTree",
  components: {
    FadeTransitionGroup,
    SimpleCheckboxGroup,
    SimpleTreeNode,
  },
  props: {
    props: { // 参数配置
      type: Object,
      default: () => ({}),
    } as PropOptions<SimpleTreeProp>,
    data: { // 树数据
      type: Array,
      default: () => [],
    },
    value: { // 值
      type: Array,
      default: () => new Array(),
    } as PropOptions<SimpleIdentifier[]>,
    lazy: { // 是否懒加载
      type: Boolean,
      default: false,
    },
    load: Function as PropOptions<SimpleLazyLoad | undefined>, // 懒加载函数
    initExpand: { // 是否默认展开
      type: Boolean,
      default: false,
    },
    showCheckbox: { // 是否显示复选框
      type: Boolean,
      default: false,
    },
    linkage: { // 是否联动
      type: Boolean,
      default: false,
    },
    select: [String, Number], // 选中值
    canSelect: { // 是否可以选择
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkedNodes: {} as SimpleCheckedNode, // 复选框选中的条目
      checked: [] as SimpleIdentifier[], // 复选框选中的id
      slotVisible: false, // 是否存在放置
      treeData: [] as any[], // 节点数据
      nodeList: [] as SimpleNodeConfig[], // 扁平化节点列表
      selectedNode: -999999 as SimpleIdentifier, // 选中的条目
      expandNodes: [] as SimpleIdentifier[], // 展开的节点
      loadingNodes: [] as SimpleIdentifier[], // 加载的节点
    };
  },
  computed: {
    /**
     * @description: 值
     * @author: Quarter
     * @return {SimpleIdentifier[]}
     */
    syncedValue: {
      get(): SimpleIdentifier[] {
        return this.value;
      },
      set(val: SimpleIdentifier[]): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      },
    },
    /**
     * @description: 同步的选中值
     * @author: Quarter
     * @return {SimpleIdentifier}
     */
    syncSelect: {
      get(): SimpleIdentifier | undefined {
        return this.select;
      },
      set(val: SimpleIdentifier | undefined): void {
        this.$emit("update:select", val);
        this.$emit("input", val);
      },
    },
    /**
     * @description: 过滤的树数据
     * @author: Quarter
     * @return {Array<Object>}
     */
    filterData(): any[] {
      if (Array.isArray(this.data)) {
        return this.data;
      }
      return new Array();
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
     * @description: 是否叶子节点属性
     * @author: Quarter
     * @return {String}
     */
    isLeafProperty(): string {
      if (this.props && typeof this.props.isLeaf === "string") {
        return this.props.isLeaf;
      }
      return "isLeaf";
    },
    /**
     * @description: 过滤的节点列表
     * @author: Quarter
     * @return {Array<SimpleNodeConfig>}
     */
    filterNodeList(): SimpleNodeConfig[] {
      return this.nodeList
        .filter((node: SimpleNodeConfig) => {
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
        .map((node: SimpleNodeConfig) => {
          node.selected = node.id === this.selectedNode;
          node.expand = (node.id &&
            this.expandNodes.indexOf(node.id) > -1) as boolean;
          return node;
        });
    },
  },
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
  },
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
  },
  watch: {
    /**
     * @description: 监听传入选中节点
     * @author: Quarter
     * @return
     */
    syncSelect: {
      immediate: true,
      handler(): void {
        if (
          this.syncSelect !== undefined &&
          this.syncSelect !== this.selectedNode
        ) {
          this.selectedNode = this.syncSelect;
        }
      },
    },
    /**
     * @description: 监听树节点数据变化
     * @author: Quarter
     * @return
     */
    filterData: {
      immediate: true,
      handler(): void {
        this.treeData = this.filterData;
        this.nodeList = this.parseNodeList(this.treeData);
      },
    },
    /**
     * @description: 监传入的值
     * @author: Quarter
     * @return
     */
    syncedValue: {
      immediate: true,
      handler(): void {
        if (Array.isArray(this.syncedValue)) {
          this.checked = this.syncedValue;
        } else if (this.syncedValue === undefined || this.syncedValue === null) {
          this.checked = new Array();
        }
      },
    },
    /**
     * @description: 监听选中的值
     * @author: Quarter
     * @return
     */
    checked(): void {
      this.syncedValue = this.checked;
      this.$emit("input", this.checked);
      this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
    },
  },
  methods: {
    /**
     * @description: 取消选择
     * @author: Quarter
     * @return
     */
    cancelSelect(): void {
      this.selectedNode = -999999;
      this.syncSelect = undefined;
    },
    /**
     * @description: 解析节点列表
     * @author: Quarter
     * @param {Array<Object>} nodes 节点
     * @param {Number} level 节点层级
     * @param {SimpleNodeConfig} parentNode 上级节点
     * @param {Array<SimpleIdentifier>} sequence id序列
     * @param {Array<Number>} position 位置序列
     * @return {Array<SimpleNodeConfig>}
     */
    parseNodeList(
      nodes: any[],
      level: number = 0,
      parentNode?: SimpleNodeConfig,
      sequence: SimpleIdentifier[] = [],
      position: number[] = []
    ): SimpleNodeConfig[] {
      if (Array.isArray(nodes)) {
        let result: SimpleNodeConfig[] = new Array();
        nodes.forEach((node: any, index: number) => {
          let isLeaf: boolean = false;
          if (node[this.isLeafProperty]) {
            isLeaf = true;
          } else if (
            !this.lazy &&
            (!Array.isArray(node[this.childrenProperty]) ||
              node[this.childrenProperty].length === 0)
          ) {
            isLeaf = true;
          }
          const config: SimpleNodeConfig = {
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
    },
    /**
     * @description: 切换节点展开状态
     * @author: Quarter
     * @param {SimpleNodeConfig} node 节点配置
     * @return
     */
    switchNodeExpand(node: SimpleNodeConfig): void {
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
    },
    /**
     * @description: 插入子节点
     * @author: Quarter
     * @return
     */
    insertChildNodes(node: SimpleNodeConfig, nodes: any[]): void {
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
    },
    /**
     * @description: 选择节点
     * @author: Quarter
     * @param {SimpleNodeConfig} node 选中的节点
     * @return
     */
    selectNode(node: SimpleNodeConfig): void {
      if (this.canSelect) {
        this.selectedNode = node.id;
        this.syncSelect = this.selectedNode;
        this.$emit("select", deepAssign(node), deepAssign(this.treeData));
      }
    },
    /**
     * @description: 选中节点
     * @author: Quarter
     * @param {SimpleNodeConfig} node 选中的节点
     * @return
     */
    checkNode(node: SimpleNodeConfig): void {
      if (this.showCheckbox) {
        this.$emit("check", deepAssign(node), deepAssign(this.treeData));
        this.$emit("change", this.checked, deepAssign(node));
      }
    },
  },
})
</script>

<style lang="scss">
.simple-tree {
  width: 100%;
  position: relative;
}
</style>