<!--
 * @Author: Quarter
 * @Date: 2020-08-11 09:44:28
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:10:32
 * @Description: 简易的树单项
-->
<template>
  <div
    class="simple-tree-node"
    :class="{
      'show-checkbox': showCheckbox,
      'can-select': canSelect,
      selected: data.selected,
      loading: data.loading,
    }"
    :style="customStyle"
  >
    <div class="item-arrow">
      <simple-button
        v-if="!data.isLeaf"
        :class="{ 'roll-down': data.expand }"
        @click="switchSubNodeVisible"
      >
        <i class="simple-icon-caret-right"></i>
      </simple-button>
    </div>
    <div v-if="showCheckbox" class="item-checkbox">
      <simple-checkbox :label="data.id" @change="checkNode"></simple-checkbox>
    </div>
    <div v-if="data.loading" class="item-loading">
      <div class="loading">
        <i class="simple-icon-loading"></i>
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
    >{{ data.label }}</div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { Component, Prop } from "vue-property-decorator";
import { SimpleCustomStyle, SimpleNodeConfig } from "../types";

export default Emitter.extend({
  name: "SimpleTreeNode",
  props: {
    data: Object,  // 节点数据
    showCheckbox: { // 是否显示复选框
      type: Boolean,
      default: false,
    },
    canSelect: { // 是否可以选择
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      hasSlot: false, // 是否存在插槽
    };
  },
  computed: {
    /**
     * @description: 自定义样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    customStyle(): SimpleCustomStyle {
      return {
        "padding-left": this.data.level * 20 + "px",
      };
    },
  },
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
  },
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
  },
  methods: {
    /**
     * @description: 切换下级菜单的显示状态
     * @author: Quarter
     * @return
     */
    switchSubNodeVisible(): void {
      if (!this.data.loading) {
        this.$emit("expand", this.data);
      }
    },
    /**
     * @description: 选中某个节点
     * @author: Quarter
     * @return
     */
    selectNode(): void {
      if (this.canSelect) {
        this.$emit("select", this.data);
      }
    },
    /**
     * @description: 选中节点
     * @author: Quarter
     * @return
     */
    checkNode(): void {
      if (this.showCheckbox) {
        this.$emit("check", this.data);
      }
    },
  },
});
</script>

<style lang="scss">
.simple-tree-node {
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
    height: 100%;
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