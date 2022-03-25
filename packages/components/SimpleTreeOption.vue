<!--
 * @Author: Quarter
 * @Date: 2020-07-21 18:30:26
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:08:02
 * @Description: 建议的下拉框单项
--> 
<template>
  <div v-if="node" class="simple-tree-option" :class="customClass">
    <div class="current-node" :style="nodeStyle">
      <div class="node-arrow">
        <simple-button
          :class="{ 'roll-down': filterExpand }"
          v-if="hasChildren"
          @click="switchNodeList"
        >
          <i class="simple-icon-caret-right"></i>
        </simple-button>
      </div>
      <div class="node-info" @click="checkOptionItem">{{ node.label }}</div>
    </div>
    <collapse-transition>
      <div class="node-list" v-if="hasChildren" v-show="filterExpand">
        <simple-tree-option
          v-for="node of filterSubNodes"
          :key="`node-item-${node.id}`"
          :node="node"
          :props="props"
          :node-index="nodeIndex + 1"
        ></simple-tree-option>
      </div>
    </collapse-transition>
  </div>
</template>

<script lang="ts">
import { PropOptions } from "vue";
import { Emitter } from "../mixins";
import {
  SimpleCustomClass,
  SimpleCustomStyle,
  SimpleSelectValue,
  SimpleTreeProp,
  SimpleSelectNodeConfig,
} from "../types";

export default Emitter.extend({
  name: "SimpleTreeOption",
  mixins: [
    Emitter,
  ],
  props: {
    props: { // 参数配置
      type: Object,
      default: () => ({}),
    } as PropOptions<SimpleTreeProp>,
    node: { // 筛选项值
      type: Object,
      required: true,
    } as PropOptions<SimpleSelectNodeConfig>,
    nodeIndex: { // 子节点层数
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      checked: false, // 选中项
      selectValue: new Array<SimpleSelectValue>(), // 下拉框选中的值
      expand: false, // 展开下拉框
    };
  },
  computed: {
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
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "item-checked": this.checked === true,
      };
    },
    /**
     * @description: 过滤的展开值
     * @author: Quarter
     * @return {Boolean}
     */
    hasChildren(): boolean {
      if (
        this.node &&
        Array.isArray(this.node.children) &&
        this.node.children.length > 0
      ) {
        return true;
      }
      return false;
    },
    /**
     * @description: 过滤子节点
     * @author: Quarter
     * @return {Array<SimpleNodeConfig>}
     */
    filterSubNodes(): SimpleSelectNodeConfig[] {
      if (this.hasChildren) {
        return (this.node.children as any[]).map((node: any, index: number) => {
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
     * @description: 过滤的展开值
     * @author: Quarter
     * @return {Boolean}
     */
    filterExpand(): boolean {
      return this.hasChildren && this.expand;
    },
    /**
     * @description: 列表样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    nodeStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {};
      if (typeof this.nodeIndex === "number") {
        styles["padding-left"] = `${10 + 15 * this.nodeIndex}px`;
      }
      return styles;
    },
  },
  created(): void {
    this.$on("simple-select-update", (value: SimpleSelectValue[]) => {
      if (Array.isArray(value)) {
        this.selectValue = value;
      }
    });
    if (
      this.node.id === null ||
      typeof this.node.id === "string" ||
      typeof this.node.id === "number"
    ) {
      this.dispatch("SimpleTreeSelect", "simple-select-mount", [
        this.node.id,
        (value: SimpleSelectValue[]) => {
          if (Array.isArray(value)) {
            this.selectValue = value;
          }
        },
      ]);
    }
  },
  beforeDestroy(): void {
    if (
      this.node.id === null ||
      typeof this.node.id === "string" ||
      typeof this.node.id === "number"
    ) {
      this.dispatch("SimpleTreeSelect", "simple-select-unmount", [
        this.node.id,
      ]);
    }
  },
  methods: {
    /**
     * @description: 切换子节点列表
     * @author: Quarter
     * @return
     */
    switchNodeList(): void {
      this.expand = !this.expand;
    },
    /**
     * @description: 点击选项
     * @author: Quarter
     * @return
     */
    checkOptionItem(): void {
      if (this.node.id !== undefined) {
        if (this.checked === true) {
          this.dispatch("SimpleTreeSelect", "simple-select-discheck", [
            this.node.id,
          ]);
        } else {
          this.dispatch("SimpleTreeSelect", "simple-select-check", [
            this.node.id,
          ]);
        }
      }
    },
  },
  watch: {
    /**
     * @description: 更新复选框状态
     * @author: Quarter
     * @return
     */
    selectValue: {
      immediate: true,
      handler(): void {
        if (Array.isArray(this.selectValue)) {
          if (
            typeof this.node.id === "string" ||
            typeof this.node.id === "number" ||
            this.node.id === null
          ) {
            if (this.selectValue.indexOf(this.node.id) === -1) {
              this.checked = false;
              this.dispatch("SimpleTreeSelect", "simple-select-label-delete", [
                this.node.label,
              ]);
            } else {
              this.checked = true;
              this.dispatch("SimpleTreeSelect", "simple-select-label-add", [
                this.node.label,
              ]);
            }
          }
        }
      },
    },
  },
});
</script>

<style lang="scss">
.simple-tree-option {
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

      .simple-button {
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