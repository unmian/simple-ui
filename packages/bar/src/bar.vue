<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:28:08
 * @LastEditors: Quarter
 * @Description: 简易的进度条
 * @FilePath: /simple-ui/packages/bar/src/bar.vue
-->
<template>
  <div class="s-bar">
    <div
      ref="container"
      class="bar-container"
      :style="containerStyle"
      @resize="calcContainerWidth"
    >
      <div class="bar" :style="barStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomStyle } from "packages/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SBar",
})
export default class SBar extends Vue {
  @Prop({
    type: Number,
    default: 0,
  })
  value?: number; // 值

  @Prop({
    type: Number,
    default: 4,
  })
  height?: number; // 高度

  containerWidth = 0; // 容器大小

  /**
   * @description: 组件自定义样式
   * @author: Quarter
   * @return {String}
   */
  get widthStyle(): string | undefined {
    if (typeof this.value === "number") {
      if (this.value > 0 && this.value <= 100) {
        return `${this.value}%`;
      }
      if (this.value > 100) {
        return "100%";
      }
    }
    return "0%";
  }

  /**
   * @description: 高度样式
   * @author: Quarter
   * @return {String}
   */
  get heightStyle(): string | undefined {
    if (typeof this.height === "number" && this.height > 0) {
      return `${this.height}px`;
    }
  }

  /**
   * @description: 圆角样式
   * @author: Quarter
   * @return {String}
   */
  get borderRadiusStyle(): string | undefined {
    if (typeof this.height === "number" && this.height > 0) {
      return `${this.height / 2}px`;
    }
  }

  /**
   * @description: 容器样式
   * @author: Quarter
   * @return {CustomStyle}
   */
  get containerStyle(): CustomStyle {
    return {
      height: this.heightStyle,
      "border-radius": this.borderRadiusStyle,
    };
  }

  /**
   * @description: 柱子样式
   * @author: Quarter
   * @return {CustomStyle}
   */
  get barStyle(): CustomStyle {
    const styles: CustomStyle = {
      height: this.heightStyle,
      "border-radius": this.borderRadiusStyle,
    };
    if (this.widthStyle) {
      styles[
        "clip-path"
      ] = `polygon(0 0, ${this.widthStyle} 0, ${this.widthStyle} 100%, 0 100%)`;
    }
    return styles;
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    this.calcContainerWidth();
  }

  /**
   * @description: 计算容器宽度
   * @author: Quarter
   * @return
   */
  calcContainerWidth(): void {
    const container: Element | Vue | (Element | Vue)[] | undefined =
      this.$refs.container;
    if (container instanceof HTMLDivElement) {
      this.containerWidth = container.getBoundingClientRect().width;
    }
  }
}
</script>

<style lang="scss">
.s-bar {
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
