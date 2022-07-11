<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-07-05 11:17:14
 * @LastEditors: Quarter
 * @Description: 简易的头像组件
 * @FilePath: /simple-ui/packages/avatar/src/avatar.vue
-->
<template>
  <div ref="avatar" class="s-avatar" :class="customClass">
    <img
      v-if="url"
      ref="image"
      :src="url"
      alt="avatar"
      :style="customStyle"
      @load="handleLoad"
      @error="handleLoadError"
    />
    <div class="s-avatar__text" v-else>
      <slot>A</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CustomClass, CustomStyle } from "@quarter/simple-ui";
import { AvatarSize } from "./types";

@Component({
  name: "SAvatar",
})
export default class SAvatar extends Vue {
  $refs!: {
    avatar: HTMLDivElement; // 头像
    image: HTMLImageElement; // 头像图片
  };

  @Prop({
    type: [String, Number],
    default: "small",
  })
  size?: AvatarSize; // 尺寸大小

  @Prop(String)
  url?: string; // 图片路径

  // 是否显示背景
  loadError = false;
  // 图片宽度
  imageWidth: null | number = null;
  // 图片高度
  imageHeight: null | number = null;
  // 图片上间距
  imageMarginTop = 0;
  // 图片左间距
  imageMarginLeft = 0;

  /**
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "size-mini": this.size === "mini",
      "size-small": this.size === "small",
      "size-medium": this.size === "medium",
      "size-large": this.size === "large",
      "show-background": this.loadError,
    };
  }

  /**
   * @description: 自定义样式
   * @author: Quarter
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    return {
      width: typeof this.imageWidth === "number" ? this.imageWidth + "px" : "auto",
      height: typeof this.imageHeight === "number" ? this.imageHeight + "px" : "auto",
      "margin-top": this.imageMarginTop + "px",
      "margin-left": this.imageMarginLeft + "px",
    };
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return {*}
   */
  mounted(): void {}

  /**
   * @description: 处理加载完成逻辑
   * @param {Event} e 回调事件
   * @return
   */
  handleLoad(e: Event): void {
    const avatar = this.$refs.avatar;
    const target = e.target as HTMLImageElement;
    if (avatar instanceof HTMLDivElement && target instanceof HTMLImageElement) {
      const targetWidth = avatar.clientWidth;
      const imageWidth = target.clientWidth;
      const imageHeight = target.clientHeight;
      if (imageWidth < imageHeight) {
        this.imageWidth = targetWidth;
        this.imageHeight = (targetWidth / imageWidth) * imageHeight;
      } else {
        this.imageHeight = targetWidth;
        this.imageWidth = (targetWidth / imageHeight) * imageWidth;
      }
      this.imageMarginTop = -this.imageWidth / 2;
      this.imageMarginLeft = -this.imageHeight / 2;
    }
  }

  /**
   * @description: 图片加载错误
   * @author: Quarter
   * @return
   */
  handleLoadError(): void {
    this.loadError = true;
    const image: Vue | Element | (Vue | Element)[] | undefined = this.$refs.image;
    if (image instanceof HTMLImageElement) {
      const boundings: DOMRect = image.getBoundingClientRect();
      this.imageMarginTop = -boundings.width / 2;
      this.imageMarginLeft = -boundings.height / 2;
    }
  }
}
</script>

<style lang="scss">
.s-avatar {
  border-radius: 50%;
  background-color: var(--s-gray-2);
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  position: relative;

  img {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .s-avatar__text {
    color: var(--s-primary);
    text-align: center;
  }

  &.show-background {
    background-color: #d8d8d8;
  }

  &.size-mini {
    width: var(--s-spacing-24);
    height: var(--s-spacing-24);

    .s-avatar__text {
      font-size: var(--s-font-5);
    }
  }

  &.size-small {
    width: var(--s-spacing-32);
    height: var(--s-spacing-32);

    .s-avatar__text {
      font-size: var(--s-font-4);
    }
  }

  &.size-medium {
    width: var(--s-spacing-48);
    height: var(--s-spacing-48);

    .s-avatar__text {
      font-size: var(--s-font-2);
    }
  }

  &.size-large {
    width: var(--s-spacing-64);
    height: var(--s-spacing-64);

    .s-avatar__text {
      font-size: var(--s-font-1);
    }
  }
}
</style>
