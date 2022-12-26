<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-14 19:43:05
 * @LastEditors: Quarter
 * @Description: 树型组件节点项
 * @FilePath: /simple-ui/packages/tree/src/tree-node.vue
-->
<template>
  <div
    class="s-tree-node"
    :class="{
      'show-checkbox': showCheckbox,
      'can-select': canSelect,
      selected: data.selected,
      loading: data.loading,
    }"
    :style="customStyle"
  >
    <div class="item-arrow">
      <s-button
        v-if="!data.isLeaf"
        variant="plain"
        icon="chevron-right"
        shape="circle"
        size="small"
        :class="{ 'roll-down': data.expand }"
        @click="switchSubNodeVisible"
      ></s-button>
    </div>
    <div v-if="showCheckbox" class="item-checkbox">
      <s-checkbox :label="data.id" @change="checkNode"></s-checkbox>
    </div>
    <div v-if="data.loading" class="item-loading">
      <div class="loading">
        <icon name="loading"></icon>
      </div>
    </div>
    <div v-if="hasSlot" class="item-label" @click="selectNode">
      <slot :node="data"></slot>
    </div>
    <div v-else class="item-label static-label" :title="data.label" @click="selectNode">
      {{ data.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Emitter } from "packages/mixins";
import { Button as SButton, Checkbox, type CustomStyle } from "packages";
import { Component, Prop } from "vue-property-decorator";
import { TreeNodeConfig } from "./types";

@Component({
  name: "STreeNode",
  components: {
    Icon,
    SButton,
    SCheckbox: Checkbox,
  },
})
export default class TreeNode extends Emitter {
  @Prop({
    type: Object,
    required: true,
  })
  data!: TreeNodeConfig; // 节点数据

  @Prop({
    type: Boolean,
    default: false,
  })
  showCheckbox!: boolean; // 是否显示复选框

  @Prop({
    type: Boolean,
    default: false,
  })
  canSelect!: boolean; // 是否可以选择

  hasSlot = false; // 是否存在插槽

  /**
   * @description: 自定义样式
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    return {
      "padding-left": `calc(${(this.data.level || 0) * 2}rem + 0.4rem)`,
    };
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    if (this.$scopedSlots.default) {
      this.hasSlot = true;
    } else {
      this.hasSlot = false;
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  updated(): void {
    if (this.$scopedSlots.default) {
      this.hasSlot = true;
    } else {
      this.hasSlot = false;
    }
  }

  /**
   * @description: 切换下级菜单的显示状态
   * @return
   */
  switchSubNodeVisible(): void {
    if (!this.data.loading) {
      this.$emit("expand", this.data);
    }
  }

  /**
   * @description: 选中某个节点
   * @return
   */
  selectNode(): void {
    if (this.canSelect) {
      this.$emit("select", this.data);
    }
  }

  /**
   * @description: 选中节点
   * @return
   */
  checkNode(): void {
    if (this.showCheckbox) {
      this.$emit("check", this.data);
    }
  }
}
</script>

<style lang="scss">
.s-tree-node {
  width: 100%;
  padding: var(--s-spacing-4);
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .item-arrow {
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .roll-down {
    transform: rotate(90deg);
  }

  .item-checkbox {
    width: 24px;
    display: flex;
    align-items: center;
  }

  .item-loading {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;

    .loading {
      width: 20px;
      height: 20px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .item-label {
    color: var(--s-text-priamry);
    font-size: 1.4rem;
    flex: 1;

    &.static-label {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &.can-select {
    cursor: default;

    &.selected,
    &.selected:hover {
      background-color: #e2ecfa;
    }

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
  }
}
</style>
