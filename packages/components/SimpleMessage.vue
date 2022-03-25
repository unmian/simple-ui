<!--
 * @Author: Quarter
 * @Date: 2020-07-23 19:37:30
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:49:54
 * @Description: 简易的提示栏
--> 
<template>
  <div class="simple-message" :class="customClass">
    <div v-if="iconVisible" class="message-icon">
      <i :class="iconName"></i>
    </div>
    <div class="message-content">
      <slot></slot>
    </div>
    <div class="message-close" v-if="showClose" @click="closeMessage">
      <button>
        <i class="simple-icon-close"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleType } from "../types";

export default Vue.extend({
  name: "SimpleMessage",
  props: {
    type: { // 提示类型
      type: String,
      default: "info",
    } as PropOptions<SimpleType>,
    showIcon: { // 是否显示图标
      type: Boolean,
      default: true,
    },
    showClose: { // 是否显示关闭按钮
      type: Boolean,
      default: true,
    },
  },
  computed: {
    /**
     * @description: 自定义类
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "type-info": this.type === "info",
        "type-warning": this.type === "warning",
        "type-success": this.type === "success",
        "type-error": this.type === "error",
        "icon-hidden": this.iconVisible === false,
        "close-hidden": this.showClose !== true,
      };
    },
    /**
     * @description: 是否显示图标
     * @author: Quarter
     * @return {Boolean}
     */
    iconVisible(): boolean {
      return this.showIcon === true && this.iconName !== null;
    },
    /**
     * @description: 图标的名称
     * @author: Quarter
     * @return {String}
     */
    iconName(): string | null {
      switch (this.type) {
        case "info":
          return "simple-icon-info";
        case "warning":
          return "simple-icon-warning";
        case "success":
          return "simple-icon-success";
        case "error":
          return "simple-icon-error";
      }
      return null;
    },
  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    close(): void {
      this.closeMessage();
    },
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    closeMessage(): void {
      this.$emit("close");
      this.$nextTick(() => this.$destroy());
      this.$el.parentNode?.removeChild(this.$el);
    },
  },
});
</script>

<style lang="scss">
.simple-message {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .message-icon {
    width: 30px;
    display: flex;
    align-items: center;
  }

  .message-content {
    width: calc(100% - 90px);
    font-size: 14px;
  }

  .message-close {
    width: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      padding: 2px 5px;
      color: inherit;
      border: none;
      cursor: pointer;
      background: none;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.3);
      }
    }
  }

  &.icon-hidden .message-content {
    width: calc(100% - 60px);
  }

  &.close-hidden .message-content {
    width: calc(100% - 30px);
  }

  &.icon-hidden.close-hidden .message-content {
    width: 100%;
  }

  &.type-info {
    color: #909399;
    background-color: rgba($color: #909399, $alpha: 0.1);
  }

  &.type-warning {
    color: #ffa32e;
    background-color: rgba($color: #ffa32e, $alpha: 0.1);
  }

  &.type-success {
    color: #67c23a;
    background-color: rgba($color: #67c23a, $alpha: 0.1);
  }

  &.type-error {
    color: #f56c6c;
    background-color: rgba($color: #f56c6c, $alpha: 0.1);
  }
}
</style>