<!--
 * @Author: Quarter
 * @Date: 2020-08-24 13:47:17
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 11:11:32
 * @Description: 简易的滚动吸附
-->
<template>
  <div
    ref="container"
    class="simple-sticky"
    :class="{
      'status-sticky': isSticky,
      'full-width': full || fullWidth,
      'full-height': full || fullHeight,
    }"
    :style="{ width: containerWidth, height: containerHeight }"
  >
    <div ref="content" class="sticky-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ANIMATION_INDEX_DB } from "../constants";
import { generateUUID } from "../expand/tool";
import { AnimationIndex, SimpleCustomStyle, SimplePosition } from "../types";

export default Vue.extend({
  name: "SimpleSticky",
  props: {
    full: { // 全屏
      type: Boolean,
      default: false,
    },
    fullWidth: { // 全宽度
      type: Boolean,
      default: false,
    },
    fullHeight: { // 全部高度
      type: Boolean,
      default: false,
    },
    position: { // 位置
      type: String,
      default: "top",
    } as PropOptions<SimplePosition>,
  },
  data() {
    return {
      key: generateUUID(), // 帧动画标号
      isSticky: false, // 依据容器
      scrollContainer: window.document.documentElement as Element, // 依据容器
      containerWidth: "", // 容器宽度
      containerHeight: "", // 容器高度
      width: "", // 宽度
      height: "", // 高度
      left: "", // 具体左侧的位置
      top: "", // 具体顶部的位置
      bottom: "", // 具体底部的位置
    };
  },
  computed: {
    /**
     * @description: 内容样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    contentStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {
        width: this.width,
        height: this.height,
        position: this.isSticky ? "fixed" : "",
        left: this.left,
        top: this.top,
        bottom: this.bottom,
      };
      return styles;
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    this.querySimpleScroll();
    this.judgeStickState();
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestroy() {
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    const index: number | undefined = db[this.key];
    if (typeof index === "number") {
      cancelAnimationFrame(index);
    }
  },
  methods: {
    /**
     * @description: 查找最近的SimpleScroll
     * @author: Quarter
     * @return
     */
    querySimpleScroll(): void {
      let parent: Vue = this.$parent;
      while (parent) {
        if (parent.$options.name === "SimpleScroll") {
          this.scrollContainer = parent.$el;
          break;
        }
        parent = parent.$parent;
      }
    },
    /**
     * @description: 判断吸附状态
     * @author: Quarter
     * @return
     */
    judgeStickState(): void {
      const scrollContainer: Element = this.scrollContainer;
      const container: Element | Vue | Array<Element | Vue> | undefined =
        this.$refs.container;
      const content: Element | Vue | Array<Element | Vue> | undefined =
        this.$refs.content;
      if (container instanceof Element && content instanceof Element) {
        const scrollContainerBounding: DOMRect =
          scrollContainer.getBoundingClientRect();
        const containerBounding: DOMRect = container.getBoundingClientRect();
        const contentBounding: DOMRect = content.getBoundingClientRect();
        if (this.position === "top") {
          if (
            scrollContainerBounding.top > containerBounding.top &&
            this.isSticky === false
          ) {
            this.setTopStick(
              scrollContainerBounding,
              containerBounding,
              contentBounding
            );
          } else if (
            scrollContainerBounding.top < containerBounding.top &&
            this.isSticky === true
          ) {
            this.resetStick();
          }
        } else {
          if (
            scrollContainerBounding.bottom > containerBounding.bottom &&
            this.isSticky === false
          ) {
            this.setBottomStick(
              scrollContainerBounding,
              containerBounding,
              contentBounding
            );
          } else if (
            scrollContainerBounding.bottom < containerBounding.bottom &&
            this.isSticky === true
          ) {
            this.resetStick();
          }
        }
      }
      const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
      db[this.key] = requestAnimationFrame(this.judgeStickState);
    },
    /**
     * @description: 设置顶部吸附
     * @author: Quarter
     * @param {DOMRect} scroll 滚动区域尺寸
     * @param {DOMRect} container 容器尺寸
     * @param {DOMRect} content 内容尺寸
     * @return
     */
    setTopStick(
      scroll: DOMRect,
      container: DOMRect,
      content: DOMRect
    ): void {
      this.containerWidth = container.width + "px";
      this.containerHeight = container.height + "px";
      this.width = content.width + "px";
      this.height = content.height + "px";
      this.top = scroll.top + "px";
      this.bottom = "";
      this.left = content.left + "px";
      this.isSticky = true;
    },
    /**
     * @description: 设置底部吸附
     * @author: Quarter
     * @param {DOMRect} scroll 滚动区域尺寸
     * @param {DOMRect} container 容器尺寸
     * @param {DOMRect} content 内容尺寸
     * @return
     */
    setBottomStick(
      scroll: DOMRect,
      container: DOMRect,
      content: DOMRect
    ): void {
      this.containerWidth = container.width + "px";
      this.containerHeight = container.height + "px";
      this.width = content.width + "px";
      this.height = content.height + "px";
      this.top = "";
      this.bottom = scroll.bottom + "px";
      this.left = content.left + "px";
      this.isSticky = true;
    },
    /**
     * @description: 重置吸附
     * @author: Quarter
     * @return
     */
    resetStick(): void {
      this.containerWidth = "";
      this.containerHeight = "";
      this.width = "";
      this.height = "";
      this.top = "";
      this.bottom = "";
      this.left = "";
      this.isSticky = false;
    },
  },
});
</script>

<style lang="scss">
.simple-sticky {
  .sticky-content {
    width: fit-content;
    height: fit-content;
    transition: box-shadow 0.2s ease-in-out;
  }

  &.status-sticky .sticky-content {
    box-shadow: 0px 4px 15px 0px rgba(214, 220, 234, 1);
  }

  &.full-width {
    width: 100%;

    .sticky-content {
      width: 100%;
    }
  }

  &.full-height {
    height: 100%;

    .sticky-content {
      height: 100%;
    }
  }
}
</style>