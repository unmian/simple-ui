<!--
 * @Author: Quarter
 * @Date: 2020-07-23 19:37:30
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:55:25
 * @Description: 简易的提示栏
--> 
<template>
  <transition name="message-fade">
    <div class="simple-message-box" v-show="visible" :class="customClass" :style="{ zIndex }">
      <div class="message-icon">
        <i :class="iconName"></i>
      </div>
      <div class="message-content">{{ message }}</div>
      <div class="message-close" @click="close">
        <button>
          <i class="simple-icon-close"></i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleType } from "../types";
import variables from "../variables";

export default Vue.extend({
  name: "SimpleMessageBox",
  props: {
    uuid: String, // UUID
    messageType: { // 提示类型
      type: String,
      default: "info",
    } as PropOptions<SimpleType>,
    message: String, // 消息内容
    duration: { // 延迟时间
      type: Number,
      default: 3000,
    },
    topSpacing: { // 顶部间距
      type: Number,
      default: 0,
    },
    onClose: Function, // 回调
  },
  data() {
    return {
      visible: false, // 是否显示
      zIndex: ++variables.zIndex, // 层级
      autoCloseIndex: undefined as ReturnType<typeof setTimeout> | undefined, // 关闭计时器
    };
  },
  computed: {
    /**
     * @description: 安全的类型
     * @author: Quarter
     * @return {SimpleType}
     */
    safeType(): SimpleType {
      const types: SimpleType[] = ["info", "warning", "success", "error"];
      if (
        typeof this.messageType === "string" &&
        types.indexOf(this.messageType) > -1
      ) {
        return this.messageType;
      }
      return "info";
    },
    /**
     * @description: 安全的延迟时间
     * @author: Quarter
     * @return {Number}
     */
    safeDuration(): number {
      if (typeof this.duration === "number" && this.duration >= 0) {
        return this.duration;
      }
      return 3000;
    },
    /**
     * @description: 自定义类
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "type-info": this.messageType === "info",
        "type-warning": this.messageType === "warning",
        "type-success": this.messageType === "success",
        "type-error": this.messageType === "error",
      };
    },
    /**
     * @description: 图标的名称
     * @author: Quarter
     * @return {String}
     */
    iconName(): string | undefined {
      switch (this.messageType) {
        case "info":
          return "simple-icon-info";
        case "warning":
          return "simple-icon-warning";
        case "success":
          return "simple-icon-success";
        case "error":
          return "simple-icon-error";
      }
    },
  },
  mounted() {
    this.visible = true;
    if (this.safeDuration > 0) {
      this.autoCloseIndex = setTimeout(() => {
        this.close();
      }, this.safeDuration);
    }
  },
  beforeDestroy() {
    if (typeof this.autoCloseIndex === "number") {
      clearTimeout(this.autoCloseIndex);
      this.autoCloseIndex = undefined;
    }
  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @author: Quarter
     * @return
     */
    close(): void {
      this.visible = false;
      this.$el.addEventListener("transitionend", this.destroyElement);
      if (typeof this.onClose === "function") {
        this.onClose();
      }
    },
    /**
     * @description: 销毁弹窗
     * @author: Quarter
     * @return
     */
    destroyElement(): void {
      this.$el.removeEventListener("transitionend", this.destroyElement);
      this.$emit("close", this.uuid);
      this.$destroy();
      this.$el.parentNode?.removeChild(this.$el);
    },
  },
});
</script>

<style lang="scss">
.simple-message-box {
  width: 400px;
  height: 50px;
  padding: 0 20px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: opacity 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  position: fixed;
  top: 15px;
  left: 50%;
  margin-left: -200px;

  .message-icon {
    width: 30px;
    display: flex;
    align-items: center;
  }

  .message-content {
    width: calc(100% - 90px);
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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

  &.type-info {
    color: #909399;
    border: 1px solid rgba($color: #909399, $alpha: 0.2);
    background-color: #f4f4f5;
  }

  &.type-warning {
    color: #ffa32e;
    border: 1px solid rgba($color: #ffa32e, $alpha: 0.2);
    background-color: #fef6ec;
  }

  &.type-success {
    color: #67c23a;
    border: 1px solid rgba($color: #67c23a, $alpha: 0.2);
    background-color: #f1f9ec;
  }

  &.type-error {
    color: #f56c6c;
    border: 1px solid rgba($color: #f56c6c, $alpha: 0.2);
    background-color: #fdf1f0;
  }

  &:nth-of-type(n + 2) {
    margin-top: 12px;
  }

  &.message-fade-enter,
  &.message-fade-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  &.message-fade-enter-to,
  &.message-fade-leave {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>