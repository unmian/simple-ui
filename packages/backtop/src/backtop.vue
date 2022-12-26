<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:33:05
 * @LastEditors: Quarter
 * @Description: 返回顶部
 * @FilePath: /simple-ui/packages/backtop/src/backtop.vue
-->
<template>
  <scale-transition>
    <button
      class="s-backtop"
      :class="customClass"
      :style="{ bottom, right }"
      v-show="visible"
      @click="scrollTop"
    >
      <icon :size="iconSize" :name="icon"></icon>
    </button>
  </scale-transition>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { ScaleTransition } from "packages/transition";
import type { CustomClass } from "packages/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import type { BacktopSize } from "./types";

@Component({
  name: "SBacktop",
  components: {
    Icon,
    ScaleTransition,
  },
})
export default class Backtop extends Vue {
  @Prop([Number, String, Array])
  offset?: number | string | Array<number | string | undefined>; // 偏移量

  @Prop({
    type: String,
    default: "medium",
  })
  size!: BacktopSize; // 尺寸

  @Prop([Element, String])
  target?: Element | string; // 参考元素

  @Prop({
    type: String,
    default: "mouse",
  })
  icon?: string; // 图标

  // 是否显示
  visible = false;
  // 参考元素
  targetElement: Element = document.body;
  // 是否已经挂载
  isMounted = false;

  /**
   * @description: 距离底部的距离
   * @return {string}
   */
  get bottom(): string | undefined {
    if (typeof this.offset === "number") {
      return `${this.offset}px`;
    } else if (typeof this.offset === "string") {
      return this.offset;
    } else if (Array.isArray(this.offset) && this.offset.length >= 2) {
      if (typeof this.offset[0] === "number") {
        return `${this.offset[0]}px`;
      } else if (typeof this.offset[0] === "string") {
        return this.offset[0];
      }
    }
    return undefined;
  }

  /**
   * @description: 距离底部的距离
   * @return {string}
   */
  get right(): string | undefined {
    if (typeof this.offset === "number") {
      return `${this.offset}px`;
    } else if (typeof this.offset === "string") {
      return this.offset;
    } else if (Array.isArray(this.offset) && this.offset.length >= 2) {
      if (typeof this.offset[1] === "number") {
        return `${this.offset[1]}px`;
      } else if (typeof this.offset[1] === "string") {
        return this.offset[1];
      }
    }
    return undefined;
  }

  /**
   * @description: 图标尺寸
   * @return
   */
  get iconSize(): number {
    switch (this.size) {
      case "small":
        return 16;
      case "medium":
        return 20;
      case "large":
        return 36;
      default:
        return 20;
    }
  }

  /**
   * @description: 自定义类
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "size-small": this.size === "small",
      "size-medium": this.size === "medium",
      "size-large": this.size === "large",
    };
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    this.isMounted = true;
    this.watchTargetChange();
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    this.isMounted = false;
    this.targetElement.removeEventListener("scroll", this.judgeScrollTopVisible);
  }

  /**
   * @description: 查找目标元素
   * @return {Element}
   */
  queryTargetElement(): Element {
    if (this.target instanceof Element) {
      return this.target;
    }
    if (typeof this.target === "string") {
      const el = document.querySelector(this.target);
      if (el instanceof Element) {
        return el;
      }
    }
    if (this.$el?.parentElement instanceof Element) {
      return this.$el.parentElement;
    }
    return document.body;
  }

  /**
   * @description: 监听目标元素入参的变化
   * @param {Element} el 元素
   * @param {Element|undefined} oldEl 元素
   * @return
   */
  @Watch("target", {
    immediate: true,
  })
  watchTargetChange(): void {
    if (this.isMounted) {
      const el = this.queryTargetElement();
      if (el instanceof Element && el !== this.targetElement) {
        this.targetElement = el;
      }
    }
  }

  /**
   * @description: 监听目标元素的变化
   * @param {Element} el 元素
   * @param {Element|undefined} oldEl 元素
   * @return
   */
  @Watch("targetElement", {
    immediate: true,
  })
  watchTargetElementChange(el: Element, oldEl: Element | undefined): void {
    if (oldEl instanceof Element) {
      oldEl.removeEventListener("scroll", this.judgeScrollTopVisible);
    }
    if (el instanceof Element) {
      el.addEventListener("scroll", this.judgeScrollTopVisible);
    }
  }

  /**
   * @description: 判断是否显示
   * @return
   */
  judgeScrollTopVisible(e: Event): void {
    const {target} = e;
    if (target instanceof Element && target === this.targetElement) {
      if (target.scrollTop < 200) {
        this.visible = false;
      } else {
        this.visible = true;
      }
    }
  }

  /**
   * @description: 滚动到顶层
   * @return
   */
  scrollTop(): void {
    if (this.targetElement instanceof Element) {
      this.targetElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
}
</script>

<style lang="scss">
.s-backtop {
  color: var(--s-primary);
  cursor: pointer;
  border: none;
  border-radius: var(--s-border-radius);
  background: none;
  backdrop-filter: blur(3px);
  box-shadow: var(--s-shadow-3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 80px;
  bottom: 40px;
  z-index: 199;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: var(--s-gray-1);
    opacity: 0.35;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover svg {
    transform: scale(1.25);
  }

  svg {
    transform: scale(1);
    transition: transform 0.2s linear;
    position: relative;
  }

  &.size-small {
    width: var(--s-spacing-32);
    height: var(--s-spacing-32);
  }

  &.size-medium {
    width: var(--s-spacing-48);
    height: var(--s-spacing-48);
  }

  &.size-large {
    width: var(--s-spacing-64);
    height: var(--s-spacing-64);
  }
}
</style>
