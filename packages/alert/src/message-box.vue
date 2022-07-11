<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:45:05
 * @LastEditors: Quarter
 * @Description: 消息提示容器组件
 * @FilePath: /simple-ui/packages/message/src/message-box.vue
-->
<template>
  <transition name="message-fade">
    <div
      class="s-message-box"
      v-show="visible"
      :class="customClass"
      :style="{ zIndex }"
    >
      <div class="message-icon">
        <i :class="iconName"></i>
      </div>
      <div class="message-content">{{ message }}</div>
      <div class="message-close" @click="close">
        <button>
          <i class="s-icon-close"></i>
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { CustomClass, CommonType } from "packages/types";
import variables from "packages/variables";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SMessageBox",
})
export default class MessageBox extends Vue {
  @Prop(String)
  uuid?: string; // UUID

  @Prop({
    type: String,
    default: "info",
  })
  messageType?: CommonType; // 提示类型

  @Prop(String)
  message?: string; // 消息内容

  @Prop({
    type: Number,
    default: 3000,
  })
  duration?: number; // 延迟时间

  @Prop({
    type: Number,
    default: 0,
  })
  topSpacing?: number; // 顶部间距

  @Prop(Function)
  onClose?: () => void; // 回调

  visible = false; // 是否显示
  zIndex = ++variables.zIndex; // 层级
  autoCloseIndex: number | undefined = undefined; // 关闭计时器

  /**
   * @description: 安全的类型
   * @author: Quarter
   * @return {CommonType}
   */
  get safeType(): CommonType {
    const types: CommonType[] = ["info", "warning", "success", "error"];
    if (
      typeof this.messageType === "string" &&
      types.indexOf(this.messageType) > -1
    ) {
      return this.messageType;
    }
    return "info";
  }

  /**
   * @description: 安全的延迟时间
   * @author: Quarter
   * @return {Number}
   */
  get safeDuration(): number {
    if (typeof this.duration === "number" && this.duration >= 0) {
      return this.duration;
    }
    return 3000;
  }

  /**
   * @description: 自定义类
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "type-info": this.messageType === "info",
      "type-warning": this.messageType === "warning",
      "type-success": this.messageType === "success",
      "type-error": this.messageType === "error",
    };
  }

  /**
   * @description: 图标的名称
   * @author: Quarter
   * @return {String}
   */
  get iconName(): string | undefined {
    switch (this.messageType) {
      case "info":
        return "s-icon-info";
      case "warning":
        return "s-icon-warning";
      case "success":
        return "s-icon-success";
      case "error":
        return "s-icon-error";
    }
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    this.visible = true;
    if (this.safeDuration > 0) {
      this.autoCloseIndex = setTimeout(() => {
        this.close();
      }, this.safeDuration);
    }
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestroy(): void {
    if (typeof this.autoCloseIndex === "number") {
      clearTimeout(this.autoCloseIndex);
      this.autoCloseIndex = undefined;
    }
  }

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
  }

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
  }
}
</script>

<style lang="scss">
.s-message-box {
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
