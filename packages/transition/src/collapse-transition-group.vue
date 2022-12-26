<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:42:43
 * @LastEditors: Quarter
 * @Description: 展开过渡
 * @FilePath: /simple-ui/packages/transition/src/collapse-transition-group.vue
-->
<template>
  <transition-group
    :tag="tag"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition-group>
</template>

<script lang="ts">
import { CommonDirection } from "packages/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import { TransitionType } from "./types";

@Component({
  name: "CollapseTransitionGroup",
})
export default class CollapseTransitionGroup extends Vue {
  @Prop({
    type: String,
    default: "vertical",
  })
  align!: CommonDirection; // 动画方向

  @Prop({
    type: String,
    default: "linear",
  })
  transition!: TransitionType; // 动画方式

  @Prop([Number, String])
  duration?: number | string; // 持续时间

  @Prop({
    type: String,
    required: true,
  })
  tag!: string; // 标签

  /**
   * @description: 过滤的排列方式
   * @return {String}
   */
  get filterAlign(): string {
    if (this.align === "horizontal") {
      return this.align;
    }
    return "vertical";
  }

  /**
   * @description: 过滤的过渡方式
   * @return {String}
   */
  get filterTransition(): TransitionType {
    const transition: TransitionType[] = [
      "linear",
      "ease",
      "ease-in",
      "ease-out",
      "ease-in-out",
      "revert",
    ];
    if (transition.indexOf(this.transition) !== -1) {
      return this.transition;
    }
    return transition[0];
  }

  /**
   * @description: 过滤的持续时间
   * @return {Number}
   */
  get filterDuration(): number {
    if (typeof this.duration === "number" && this.duration > 0) {
      return this.duration;
    } else if (typeof this.duration === "string") {
      const numRegExp = new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/);
      if (numRegExp.test(this.duration)) {
        const duration: number = parseFloat(this.duration);
        if (duration > 0) {
          return duration;
        }
      }
    }
    return 0.2;
  }

  /**
   * @description: 载入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  beforeEnter(el: HTMLElement): void {
    // eslint-disable-next-line no-param-reassign
    el.style.transitionProperty = this.filterAlign === "horizontal" ? "width" : "height";
    // eslint-disable-next-line no-param-reassign
    el.style.transitionTimingFunction = this.filterTransition;
    // eslint-disable-next-line no-param-reassign
    el.style.transitionDuration = `${this.filterDuration}s`;
    if (!el.dataset) {
      Reflect.set(el, "dataset", {});
    }
    if (this.filterAlign === "horizontal") {
      // eslint-disable-next-line no-param-reassign
      el.style.width = "0";
    } else {
      // eslint-disable-next-line no-param-reassign
      el.style.height = "0";
    }
  }

  /**
   * @description: 载入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  enter(el: HTMLElement) {
    if (this.filterAlign === "horizontal") {
      if (el.scrollWidth !== 0) {
        // eslint-disable-next-line no-param-reassign
        el.style.width = `${el.scrollWidth}px`;
      } else {
        // eslint-disable-next-line no-param-reassign
        el.style.width = "";
      }
    } else if (el.scrollHeight !== 0) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight}px`;
    } else {
      // eslint-disable-next-line no-param-reassign
      el.style.height = "";
    }
    // eslint-disable-next-line no-param-reassign
    el.style.overflow = "hidden";
  }

  /**
   * @description: 载入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  afterEnter(el: HTMLElement) {
    // eslint-disable-next-line no-param-reassign
    el.style.transitionProperty = "";
    // eslint-disable-next-line no-param-reassign
    el.style.transitionTimingFunction = "";
    // eslint-disable-next-line no-param-reassign
    el.style.transitionDuration = "";
    // eslint-disable-next-line no-param-reassign
    el.style.width = "";
    // eslint-disable-next-line no-param-reassign
    el.style.height = "";
  }

  /**
   * @description: 载入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  beforeLeave(el: HTMLElement) {
    // eslint-disable-next-line no-param-reassign
    el.style.transitionProperty = this.filterAlign === "horizontal" ? "width" : "height";
    // eslint-disable-next-line no-param-reassign
    el.style.transitionTimingFunction = this.filterTransition;
    // eslint-disable-next-line no-param-reassign
    el.style.transitionDuration = `${this.filterDuration}s`;
    if (!el.dataset) {
      Reflect.set(el, "dataset", {});
    }
    if (this.filterAlign === "horizontal") {
      // eslint-disable-next-line no-param-reassign
      el.style.width = `${el.scrollWidth}px`;
    } else {
      // eslint-disable-next-line no-param-reassign
      el.style.height = `${el.scrollHeight}px`;
    }
    // eslint-disable-next-line no-param-reassign
    el.style.overflow = "hidden";
  }

  /**
   * @description: 载入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  leave(el: HTMLElement) {
    if (this.filterAlign === "horizontal") {
      if (el.scrollWidth !== 0) {
        // eslint-disable-next-line no-param-reassign
        el.style.width = "0";
      }
    } else if (el.scrollHeight !== 0) {
      // eslint-disable-next-line no-param-reassign
      el.style.height = "0";
    }
  }

  /**
   * @description: 载入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  afterLeave(el: HTMLElement) {
    // eslint-disable-next-line no-param-reassign
    el.style.transitionProperty = "";
    // eslint-disable-next-line no-param-reassign
    el.style.transitionTimingFunction = "";
    // eslint-disable-next-line no-param-reassign
    el.style.transitionDuration = "";
    // eslint-disable-next-line no-param-reassign
    el.style.width = "";
    // eslint-disable-next-line no-param-reassign
    el.style.height = "";
  }
}
</script>
