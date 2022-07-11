<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 17:25:12
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
        :class="{ 'roll-down': data.expand }"
        @click="switchSubNodeVisible"
      >
        <i class="s-icon-caret-right"></i>
      </s-button>
    </div>
    <div v-if="showCheckbox" class="item-checkbox">
      <s-checkbox :label="data.id" @change="checkNode"></s-checkbox>
    </div>
    <div v-if="data.loading" class="item-loading">
      <div class="loading">
        <i class="s-icon-loading"></i>
      </div>
    </div>
    <div v-if="hasSlot" class="item-label" @click="selectNode">
      <slot :node="data"></slot>
    </div>
    <div
      v-else
      class="item-label static-label"
      :title="data.label"
      @click="selectNode"
    >
      {{ data.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "packages/mixins";
import { Button as SButton, Checkbox, type CustomStyle } from "packages";
import { Component, Prop, Mixins } from "vue-property-decorator";
import { TreeNodeConfig } from "./types";

@Component({
  name: "STreeNode",
  components: {
    SButton,
    SCheckbox: Checkbox,
  },
})
export default class STreeNode extends Mixins(Emitter) {
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
   * @author: Quarter
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    return {
      "padding-left": (this.data.level || 0) * 20 + "px",
    };
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
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
   * @author: Quarter
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
   * @author: Quarter
   * @return
   */
  switchSubNodeVisible(): void {
    if (!this.data.loading) {
      this.$emit("expand", this.data);
    }
  }

  /**
   * @description: 选中某个节点
   * @author: Quarter
   * @return
   */
  selectNode(): void {
    if (this.canSelect) {
      this.$emit("select", this.data);
    }
  }

  /**
   * @description: 选中节点
   * @author: Quarter
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
  height: 35px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .item-arrow {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 26px;
      height: 26px;
      min-width: initial;
      padding: 0;
      color: #666666;
      font-size: 10px;
      text-align: center;
      border-radius: 13px;
      transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

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
      animation: loadingRotate 2s linear infinite;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .item-label {
    width: calc(100% - 40px);
    color: #333333;
    font-size: 14px;

    &.static-label {
      white-space: nowrap;
      line-height: 35px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  &.show-checkbox .item-label {
    width: calc(100% - 64px);
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

  &.loading {
    .item-label {
      width: calc(100% - 70px);
    }

    &.show-checkbox .item-label {
      width: calc(100% - 94px);
    }
  }
}

@keyframes loadingRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
