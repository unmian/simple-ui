<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:41:11
 * @LastEditors: Quarter
 * @Description: 简易的滚动条
 * @FilePath: /simple-ui/packages/scroll/src/scroll.vue
-->
<template>
  <div
    class="s-scroll"
    :key="key"
    :class="{ 's-scroll-full': full, 'show-scroll-bar': showBar }"
    :style="{ height: heightStr }"
  >
    <div
      ref="container"
      class="s-scroll-content"
      :style="{ height: heightStr }"
      @scroll="emitScroll"
    >
      <slot></slot>
    </div>
    <div
      v-if="ifHorizontalBar"
      class="horizontal-bar-wrap"
      :class="{ 'bar-drag': horizontalBarDrag }"
    >
      <div
        class="horizontal-bar"
        :class="{ 'bar-show': horizontalBarVisible }"
        :style="{
          width: horizontalBarWidth + 'px',
          left: horizontalBarDistance + 'px',
          backgroundColor: safeColor,
        }"
        @mousedown="horizontalBarClickHander"
      ></div>
    </div>
    <div v-if="ifVerticalBar" class="vertical-bar-wrap" :class="{ 'bar-drag': verticalBarDrag }">
      <div
        class="vertical-bar"
        :class="{ 'bar-show': verticalBarVisible }"
        :style="{
          height: verticalBarWidth + 'px',
          top: verticalBarDistance + 'px',
          backgroundColor: safeColor,
        }"
        @mousedown="verticalBarClickHander"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ANIMATION_INDEX_DB } from "packages/constants";
import { UUID } from "packages/util";
import { AnimationIndex } from "packages/types";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SScroll",
})
export default class Scroll extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  full!: boolean; // 是否填充

  @Prop({
    type: Boolean,
    default: false,
  })
  showBar!: boolean; // 显示滚动条

  @Prop(String)
  color?: string; // 滚动条颜色

  height = 0; // 容器高度
  ifHorizontalBar = false; // 是否需要横向滚动条
  horizontalBarCounter = 0; // 横向滚动条计数器
  horizontalBarVisible = false; // 是否显示横向滚动条
  horizontalBarWidth = 0; // 横向滚动条宽度
  horizontalBarDistance = 0; // 横向滚动条位置
  horizontalBarDrag = false; // 横向滚动条是否拖动
  ifVerticalBar = false; // 是否需要纵向滚动条
  verticalBarCounter = 0; // 纵向滚动条计数器
  verticalBarVisible = false; // 是否显示纵向滚动条
  verticalBarWidth = 0; // 纵向滚动条宽度
  verticalBarDistance = 0; // 纵向滚动条位置
  verticalBarDrag = false; // 纵向滚动条是否拖动
  visibleCounter = 100; // 滚动条消失延时
  key = UUID(); // 帧数动画
  scrollBarMousedownPosition: MouseEvent | null = null; // 滚动条点击起始位置
  timeout = -1; // 延时器
  resizeObserver: ResizeObserver | null = null; // 大小监听器
  mutationObserver: MutationObserver | null = null; // 属性监听器

  /**
   * @description: 高度字符串
   * @return {String|undefined}
   */
  get heightStr(): string | undefined {
    if (typeof this.height === "number" && this.height > 0) {
      return `${this.height}px`;
    }
    return undefined;
  }

  /**
   * @description: 安全的颜色
   * @return
   */
  get safeColor(): string {
    const hexColor = new RegExp(/^#[0-9a-fA-F]{6}$/);
    const rgbColor = new RegExp(/^rgb\(([0-9]{1,3},){2}[0-9]{1,3}\)$/);
    const rgbaColor = new RegExp(/^rgba\(([0-9]{1,3},){3}((0(\.[0-9]+){0,1})|1)\)$/);
    if (typeof this.color === "string" && this.color) {
      const color: string = this.color.replace(/\s/g, "");
      if (hexColor.test(color) || rgbColor.test(color) || rgbaColor.test(color)) {
        return color;
      }
    }
    return "#898989";
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created() {
    if (!Reflect.has(window, ANIMATION_INDEX_DB)) {
      Reflect.set(window, ANIMATION_INDEX_DB, {});
    }
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted() {
    if (this.showBar) {
      this.horizontalBarVisible = true;
      this.verticalBarVisible = true;
    }
    this.initObserver();
    this.calcBarSizeAndPosition();
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    window.document.removeEventListener("mousemove", this.horizontalBarMousemoveHander);
    window.document.removeEventListener("mouseup", this.horizontalBarMouseupHander);
    window.document.removeEventListener("mousemove", this.verticalBarMousemoveHander);
    window.document.removeEventListener("mouseup", this.verticalBarMouseupHander);
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    const index: number | undefined = db[this.key];
    if (typeof index === "number") {
      cancelAnimationFrame(index);
    }
  }

  /**
   * @description: 滚动
   * @param {Number} top 上侧滚动
   * @param {Number} left 左侧滚动
   * @return
   */
  scroll(top?: number, left?: number): void {
    if (
      (typeof top === "number" || typeof left === "number") &&
      this.$refs.container instanceof HTMLDivElement
    ) {
      const options: ScrollToOptions = {};
      if (typeof top === "number") {
        options.top = top;
      }
      if (typeof left === "number") {
        options.left = left;
      }
      this.$refs.container.scrollTo(options);
    }
  }

  /**
   * @description: 初始化观察器
   * @return
   */
  initObserver(): void {
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target === this.$el.parentNode) {
          this.resetHeight();
        } else {
          this.calcContainerSize();
        }
      }
    });
    this.mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        if (mutation.target === this.$el.parentNode) {
          this.resetHeight();
        } else {
          this.calcContainerSize();
        }
      }
    });
    if (this.$el.parentElement instanceof Element) {
      this.resizeObserver.observe(this.$el.parentElement);
      this.mutationObserver.observe(this.$el.parentElement, {
        attributes: true,
        attributeFilter: ["id", "style", "class"],
      });
    }
    if (this.$refs.container instanceof HTMLDivElement) {
      this.resizeObserver.observe(this.$refs.container);
    }
  }

  /**
   * @description: 高度重置
   * @return
   */
  resetHeight(): void {
    this.height = 0;
  }

  /**
   * @description: 计算容器和滚动条尺寸
   * @return
   */
  calcContainerSize(): void {
    const { container } = this.$refs;
    const parentContainer: HTMLElement | null = this.$el.parentElement;
    if (container instanceof Element && parentContainer instanceof HTMLElement) {
      const parentStyle: CSSStyleDeclaration = getComputedStyle(parentContainer);
      const parentHeight: number =
        parentContainer.clientHeight -
        parseFloat(parentStyle.paddingTop) -
        parseFloat(parentStyle.paddingBottom);
      if (container.clientHeight > parentHeight) {
        this.height = parentHeight;
      }
    }
  }

  /**
   * @description: 计算滚动条位置
   * @return
   */
  calcBarSizeAndPosition(): void {
    const { container } = this.$refs;
    if (container instanceof Element) {
      // 判断并计算横向滚动条
      if (container.scrollWidth > container.clientWidth) {
        this.ifHorizontalBar = true;
        this.horizontalBarWidth = Math.floor(
          (container.clientWidth / container.scrollWidth) * container.clientWidth,
        );
        const horizontalBarDistance: number = Math.floor(
          (container.scrollLeft / container.scrollWidth) * container.clientWidth,
        );
        if (horizontalBarDistance !== this.horizontalBarDistance) {
          this.horizontalBarVisible = true;
          this.horizontalBarCounter = 0;
          this.horizontalBarDistance = horizontalBarDistance;
        } else if (this.horizontalBarCounter < this.visibleCounter) {
          this.horizontalBarCounter++;
        }
        if (this.horizontalBarCounter >= this.visibleCounter && !this.showBar) {
          this.horizontalBarVisible = false;
        }
      } else {
        this.ifHorizontalBar = false;
      }
      // 判断并计算纵向滚动条
      if (container.scrollHeight > container.clientHeight) {
        this.ifVerticalBar = true;
        this.verticalBarWidth = Math.floor(
          (container.clientHeight / container.scrollHeight) * container.clientHeight,
        );
        const verticalBarDistance: number = Math.floor(
          (container.scrollTop / container.scrollHeight) * container.clientHeight,
        );
        if (verticalBarDistance !== this.verticalBarDistance) {
          this.verticalBarVisible = true;
          this.verticalBarCounter = 0;
          this.verticalBarDistance = verticalBarDistance;
        } else if (this.verticalBarCounter < this.visibleCounter) {
          this.verticalBarCounter++;
        }
        if (this.verticalBarCounter >= this.visibleCounter && !this.showBar) {
          this.verticalBarVisible = false;
        }
      } else {
        this.ifVerticalBar = false;
      }
    }
    const db: AnimationIndex = Reflect.get(window, ANIMATION_INDEX_DB);
    db[this.key] = requestAnimationFrame(this.calcBarSizeAndPosition);
  }

  /**
   * @description: 横向滚动条拖拽事件
   * @param {MouseEvent} event 事件
   * @return {type}
   */
  horizontalBarClickHander(event: MouseEvent): void {
    this.horizontalBarDrag = true;
    this.scrollBarMousedownPosition = event;
    window.document.onselectstart = () => false;
    window.document.addEventListener("mousemove", this.horizontalBarMousemoveHander);
    window.document.addEventListener("mouseup", this.horizontalBarMouseupHander);
  }

  /**
   * @description: 横向滚动条鼠标移动事件
   * @param {MouseEvent} event 事件
   * @return
   */
  horizontalBarMousemoveHander(event: MouseEvent): void {
    const moveDistance: number = event.screenX - (this.scrollBarMousedownPosition?.screenX || 0);
    const { container } = this.$refs;
    if (container instanceof Element) {
      const scrollDistance: number = (moveDistance / container.clientWidth) * container.scrollWidth;
      container.scrollLeft += scrollDistance;
    }
    this.scrollBarMousedownPosition = event;
  }

  /**
   * @description: 横向滚动条鼠标抬起事件
   * @return
   */
  horizontalBarMouseupHander(): void {
    this.horizontalBarDrag = false;
    window.document.onselectstart = null;
    window.document.removeEventListener("mousemove", this.horizontalBarMousemoveHander);
    window.document.removeEventListener("mouseup", this.horizontalBarMouseupHander);
  }

  /**
   * @description: 纵向滚动条拖拽事件
   * @param {MouseEvent} event 事件
   * @return
   */
  verticalBarClickHander(event: MouseEvent): void {
    this.verticalBarDrag = true;
    this.scrollBarMousedownPosition = event;
    window.document.onselectstart = () => false;
    window.document.addEventListener("mousemove", this.verticalBarMousemoveHander);
    window.document.addEventListener("mouseup", this.verticalBarMouseupHander);
  }

  /**
   * @description: 纵向滚动条鼠标移动事件
   * @param {MouseEvent} event 事件
   * @return
   */
  verticalBarMousemoveHander(event: MouseEvent): void {
    const moveDistance: number = event.screenY - (this.scrollBarMousedownPosition?.screenY || 0);
    const { container } = this.$refs;
    if (container instanceof Element) {
      const scrollDistance: number =
        (moveDistance / container.clientHeight) * container.scrollHeight;
      container.scrollTop += scrollDistance;
    }
    this.scrollBarMousedownPosition = event;
  }

  /**
   * @description: 纵向滚动条鼠标抬起事件
   * @return
   */
  verticalBarMouseupHander(): void {
    this.verticalBarDrag = false;
    window.document.onselectstart = null;
    window.document.removeEventListener("mousemove", this.verticalBarMousemoveHander);
    window.document.removeEventListener("mouseup", this.verticalBarMouseupHander);
  }

  /**
   * @description: 滚动事件
   * @param {UIEvent} e 事件
   * @return
   */
  emitScroll(e: UIEvent): void {
    e.stopPropagation();
    this.$emit("scroll", e);
    window.dispatchEvent(new Event("s-scroll"));
  }
}
</script>

<style lang="scss">
.s-scroll {
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
  position: relative;

  .s-scroll-content {
    width: 100%;
    overflow: auto;
    scrollbar-width: none;
    scrollbar-color: transparent transparent;
    scrollbar-track-color: transparent;
    -ms-scrollbar-track-color: transparent;

    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
  }

  .horizontal-bar-wrap,
  .vertical-bar-wrap {
    position: absolute;
    z-index: 199;

    .horizontal-bar,
    .vertical-bar {
      border-radius: 4px;
      background-color: #393939;
      transition: width 0.2s ease-in-out, height 0.2s ease-in-out, border-radius 0.2s ease-in-out,
        background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
      opacity: 0;
      position: absolute;

      &.bar-show {
        opacity: 0.32;
      }

      &:hover {
        border-radius: 5px;
        opacity: 0.58;
      }
    }

    &.bar-drag .horizontal-bar,
    &.bar-drag .vertical-bar {
      opacity: 0.58;
      border-radius: 5px;
      opacity: 1;
    }
  }

  .horizontal-bar-wrap {
    width: 100%;
    height: 10px;
    bottom: 0;
    left: 0;

    .horizontal-bar {
      height: 8px;
      bottom: 2px;

      &:hover {
        height: 10px;
      }
    }

    &.bar-drag {
      height: 12px;

      .horizontal-bar {
        height: 10px;
      }
    }

    &:hover {
      height: 12px;
    }
  }

  .vertical-bar-wrap {
    width: 10px;
    height: 100%;
    top: 0;
    right: 0;

    .vertical-bar {
      width: 8px;
      right: 2px;

      &:hover {
        width: 10px;
      }
    }

    &.bar-drag {
      width: 12px;

      .vertical-bar {
        width: 10px;
      }
    }

    &:hover {
      width: 14px;
    }
  }

  &.s-scroll-full {
    width: 100%;
    height: 100%;

    .s-scroll-content {
      height: 100%;
    }
  }

  &.show-bar .horizontal-bar-wrap .horizontal-bar,
  &.show-bar .vertical-bar-wrap .vertical-bar {
    opacity: 1;
  }
}
</style>
