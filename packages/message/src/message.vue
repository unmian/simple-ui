<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:40:08
 * @LastEditors: Quarter
 * @Description: 简易的消息提示组件
 * @FilePath: /simple-ui/packages/message/src/message.vue
-->
<template>
  <div class="s-message" :class="customClass">
    <!-- 背景颜色 -->
    <div class="s-message__background"></div>
    <!-- 图标 -->
    <div v-if="iconVisible" class="s-message__icon">
      <icon :name="iconName"></icon>
    </div>
    <!-- 消息内容 -->
    <div class="s-message__content">
      <slot></slot>
    </div>
    <!-- 关闭按钮 -->
    <div class="s-message__close" v-if="showClose" @click="closeMessage">
      <button>
        <icon name="close-big"></icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { CustomClass, CommonType } from "packages/types";
import { Component, Prop, Vue } from "vue-property-decorator";

const MESSAGE_THEME_LIST: CommonType[] = ["info", "warning", "success", "error"];

@Component({
  name: "SMessage",
  components: {
    Icon,
  },
})
export default class Message extends Vue {
  @Prop({
    type: String,
    default: "info",
  })
  theme!: CommonType; // 提示类型

  @Prop({
    type: Boolean,
    default: true,
  })
  showIcon?: boolean; // 是否显示图标

  @Prop({
    type: Boolean,
    default: true,
  })
  showClose?: boolean; // 是否显示关闭按钮

  /**
   * @description: 过滤的主题
   * @return {CommonType}
   */
  get filterTheme(): CommonType {
    if (MESSAGE_THEME_LIST.includes(this.theme)) {
      return this.theme;
    }
    return "info";
  }

  /**
   * @description: 自定义类
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classList = [`s-message--theme-${this.filterTheme}`];
    return classList;
  }

  /**
   * @description: 是否显示图标
   * @return {Boolean}
   */
  get iconVisible(): boolean {
    return this.showIcon === true && this.iconName !== null;
  }

  /**
   * @description: 图标的名称
   * @return {String}
   */
  get iconName(): string | null {
    switch (this.theme) {
      case "info":
        return "error";
      case "warning":
        return "error";
      case "success":
        return "circle-check";
      case "error":
        return "off-close";
      default:
        return null;
    }
  }

  /**
   * @description: 关闭弹窗
   * @return
   */
  close(): void {
    this.closeMessage();
  }

  /**
   * @description: 关闭弹窗
   * @return
   */
  closeMessage(): void {
    this.$emit("close");
    this.$nextTick(() => this.$destroy());
    this.$el.parentNode?.removeChild(this.$el);
  }
}
</script>

<style lang="scss">
.s-message {
  width: 100%;
  padding: var(--s-spacing-12) var(--s-spacing-16);
  backdrop-filter: blur(3px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;

  .s-message__background {
    width: 100%;
    height: 100%;
    border-radius: var(--s-border-radius);
    border: 1px solid transparent;
    opacity: 0.36;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .s-message__icon {
    display: flex;
    align-items: center;
    margin-right: var(--s-spacing-8);
  }

  .message-content {
    width: calc(100% - 90px);
    font-size: 14px;
  }

  .s-message__close {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: var(--s-spacing-8);

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

// 信息主题
.s-message--theme-info {
  color: var(--s-text-secondary);

  .s-message__background {
    border-color: var(--s-text-disabled);
    background-color: var(--s-background-primary);
  }
}

.s-message--theme-warning {
  color: var(--s-warning-normal);

  .s-message__background {
    border-color: var(--s-warning-focus);
    background-color: var(--s-warning-light);
  }
}

.s-message--theme-success {
  color: var(--s-success-normal);

  .s-message__background {
    border-color: var(--s-success-focus);
    background-color: var(--s-success-light);
  }
}

.s-message--theme-error {
  color: var(--s-danger-normal);

  .s-message__background {
    border-color: var(--s-danger-focus);
    background-color: var(--s-danger-light);
  }
}
</style>
