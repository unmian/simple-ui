<!--
 * @Author: Quarter
 * @Date: 2020-07-15 14:42:34
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:03:20
 * @Description: 建议的进度条
--> 
<template>
  <div class="simple-bar">
    <div ref="container" class="bar-container" :style="containerStyle" @resize="calcContainerWidth">
      <div class="bar" :style="barStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SimpleCustomStyle } from "../types";

export default Vue.extend({
  name: "SimpleBar",
  props: {
    value: { // 值
      type: Number,
      default: 0,
    },
    height: { // 高度
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      containerWidth: 0, // 容器大小
    };
  },
  computed: {
    /**
     * @description: 组件自定义样式
     * @author: Quarter
     * @return {String}
     */
    widthStyle(): string | undefined {
      if (typeof this.value === "number") {
        if (this.value > 0 && this.value <= 100) {
          return `${this.value}%`;
        }
        if (this.value > 100) {
          return "100%";
        }
      }
      return "0%";
    },
    /**
     * @description: 高度样式
     * @author: Quarter
     * @return {String}
     */
    heightStyle(): string | undefined {
      if (typeof this.height === "number" && this.height > 0) {
        return `${this.height}px`;
      }
    },
    /**
     * @description: 圆角样式
     * @author: Quarter
     * @return {String}
     */
    borderRadiusStyle(): string | undefined {
      if (typeof this.height === "number" && this.height > 0) {
        return `${this.height / 2}px`;
      }
    },
    /**
     * @description: 容器样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    containerStyle(): SimpleCustomStyle {
      return {
        height: this.heightStyle,
        "border-radius": this.borderRadiusStyle,
      };
    },
    /**
     * @description: 柱子样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    barStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {
        height: this.heightStyle,
        "border-radius": this.borderRadiusStyle,
      };
      if (this.widthStyle) {
        styles[
          "clip-path"
        ] = `polygon(0 0, ${this.widthStyle} 0, ${this.widthStyle} 100%, 0 100%)`;
      }
      return styles;
    },
  },
  mounted() {
    this.calcContainerWidth();
  },
  methods: {
    /**
     * @description: 计算容器宽度
     * @author: Quarter
     * @return
     */
    calcContainerWidth(): void {
      const container: Element | Vue | (Element | Vue)[] | undefined = this.$refs.container;
      if (container instanceof HTMLDivElement) {
        this.containerWidth = container.getBoundingClientRect().width;
      }
    },
  },
});
</script>

<style lang="scss">
.simple-bar {
  width: 100%;
  padding: 5px 0;

  .bar-container {
    background: var(--background-color, none);
    position: relative;

    .bar {
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: var(--bar-color, linear-gradient(to right, #e11864, #fe7c0a));
      transition: clip 0.2s ease-in-out;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>