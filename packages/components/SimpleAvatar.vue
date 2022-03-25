<!--
 * @Author: Quarter
 * @Date: 2020-07-16 18:49:12
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:50:02
 * @Description: 建议的头像组件
--> 
<template>
  <div class="simple-avatar" :class="customClass">
    <img
      ref="image"
      :src="realSource"
      alt="avatar"
      :style="customStyle"
      @load="resizeImage"
      @error="loadError"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleCustomStyle, SimpleSize } from "packages";
import avatarUrl from "../assets/avatar.png";

export default Vue.extend({
  name: "SimpleAvatar",
  props: { // 尺寸大小
    size: {
      type: String,
      default: "small"
    } as PropOptions<SimpleSize>,
    src: String, // 图片路径
  },
  data() {
    return {
      showBackground: false, // 是否显示背景
      imageWidth: null as null | number, // 图片宽度
      imageHeight: null as null | number, // 图片高度
      imageMarginTop: 0, // 图片上间距
      imageMarginLeft: 0, // 图片左间距
    };
  },
  computed: {
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "size-mini": this.size === "mini",
        "size-small": this.size === "small",
        "size-medium": this.size === "medium",
        "size-large": this.size === "large",
        "show-background": this.showBackground,
      };
    },
    /**
     * @description: 自定义样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    customStyle(): SimpleCustomStyle {
      return {
        width:
          typeof this.imageWidth === "number" ? this.imageWidth + "px" : "auto",
        height:
          typeof this.imageHeight === "number" ? this.imageHeight + "px" : "auto",
        "margin-top": this.imageMarginTop + "px",
        "margin-left": this.imageMarginLeft + "px",
      };
    },
    /**
     * @description: 真实的图片路径
     * @author: Quarter
     * @return {String}
     */
    realSource(): string {
      if (typeof this.src === "string" && this.src.length > 0) {
        return this.src;
      }
      return avatarUrl;
    },
  },
  methods: {
    /**
     * @description: 调整图片的位置
     * @param {Event} e 回调事件
     * @return
     */
    resizeImage(e: Event): void {
      const target: any = e.target;
      if (target) {
        const imageWidth = target.clientWidth;
        const imageHeight = target.clientHeight;
        let targetWidth = 30;
        switch (this.size) {
          case "mini":
            targetWidth = 30;
            break;
          case "small":
            targetWidth = 50;
            break;
          case "medium":
            targetWidth = 70;
            break;
          case "large":
            targetWidth = 90;
            break;
        }
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
    },
    /**
     * @description: 图片加载错误
     * @author: Quarter
     * @return
     */
    loadError(): void {
      this.showBackground = true;
      const image: Vue | Element | (Vue | Element)[] | undefined = this.$refs.image;
      if (image instanceof HTMLImageElement) {
        const boundings: DOMRect = image.getBoundingClientRect();
        this.imageMarginTop = -boundings.width / 2;
        this.imageMarginLeft = -boundings.height / 2;
      }
    },
  },
});
</script>

<style lang="scss">
.simple-avatar {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  display: inline-block;
  position: relative;

  img {
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &.show-background {
    background-color: #d8d8d8;
  }

  &.size-mini {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }

  &.size-small {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  &.size-medium {
    width: 70px;
    height: 70px;
    border-radius: 35px;
  }

  &.size-large {
    width: 90px;
    height: 90px;
    border-radius: 45px;
  }
}
</style>