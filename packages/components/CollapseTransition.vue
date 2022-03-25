<!--
 * @Author: Quarter
 * @Date: 2020-07-31 09:30:43
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:13:27
 * @Description: 展开过渡
--> 
<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleDirection, SimpleTransitionType } from "../types";

export default Vue.extend({
  name: "CollapseTransition",
  props: {
    align: { // 动画方向
      type: String,
      default: "vertical",
    } as PropOptions<SimpleDirection>,
    transition: { // 动画方式
      type: String,
      default: "linear",
    } as PropOptions<SimpleTransitionType>,
    duration: [Number, String], // 持续时间
  },
  computed: {
    /**
     * @description: 过滤的排列方式
     * @author: Quarter
     * @return {String}
     */
    filterAlign(): SimpleDirection {
      if (this.align === "horizontal") {
        return this.align;
      }
      return "vertical";
    },
    /**
     * @description: 过滤的过渡方式
     * @author: Quarter
     * @return {String}
     */
    filterTransition(): SimpleTransitionType {
      const transition: SimpleTransitionType[] = [
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
    },
    /**
     * @description: 过滤的持续时间
     * @author: Quarter
     * @return {Number}
     */
    filterDuration(): number {
      if (typeof this.duration === "number" && this.duration > 0) {
        return this.duration;
      } else if (typeof this.duration === "string") {
        const numRegExp: RegExp = new RegExp(/^[0-9]+(\.[0-9]+){0,1}$/);
        if (numRegExp.test(this.duration)) {
          const duration: number = parseFloat(this.duration);
          if (duration > 0) {
            return duration;
          }
        }
      }
      return 0.2;
    },
  },
  methods: {
    /**
     * @description: 载入之前
     * @param {HTMLElement} el 元素
     * @return
     */
    beforeEnter(el: HTMLElement): void {
      el.style.transitionProperty =
        this.filterAlign === "horizontal" ? "width" : "height";
      el.style.transitionTimingFunction = this.filterTransition;
      el.style.transitionDuration = this.filterDuration + "s";
      if (!el.dataset) {
        (el as any).dataset = {};
      }
      if (this.filterAlign === "horizontal") {
        el.style.width = "0";
      } else {
        el.style.height = "0";
      }
    },
    /**
     * @description: 载入之前
     * @param {HTMLElement} el 元素
     * @return
     */
    enter(el: HTMLElement) {
      if (this.filterAlign === "horizontal") {
        el.style.width = `${el.scrollWidth}px`;
      } else {
        el.style.height = `${el.scrollHeight}px`;
      }
      el.style.overflow = "hidden";
    },
    /**
     * @description: 载入之前
     * @param {HTMLElement} el 元素
     * @return
     */
    afterEnter(el: HTMLElement) {
      el.style.transitionProperty = "";
      el.style.transitionTimingFunction = "";
      el.style.transitionDuration = "";
      el.style.width = "";
      el.style.height = "";
      this.$emit("enter-end");
    },
    /**
     * @description: 载入之前
     * @param {HTMLElement} el 元素
     * @return
     */
    beforeLeave(el: HTMLElement) {
      el.style.transitionProperty =
        this.filterAlign === "horizontal" ? "width" : "height";
      el.style.transitionTimingFunction = this.filterTransition;
      el.style.transitionDuration = this.filterDuration + "s";
      if (!el.dataset) {
        (el as any).dataset = {};
      }
      if (this.filterAlign === "horizontal") {
        el.style.width = `${el.scrollWidth}px`;
      } else {
        el.style.height = `${el.scrollHeight}px`;
      }
      el.style.overflow = "hidden";
    },
    /**
     * @description: 载入之前
     * @param {HTMLElement} el 元素
     * @return
     */
    leave(el: HTMLElement) {
      if (this.filterAlign === "horizontal") {
        if (el.scrollWidth !== 0) {
          el.style.width = "0";
        }
      } else {
        if (el.scrollHeight !== 0) {
          el.style.height = "0";
        }
      }
    },
    /**
     * @description: 载入之前
     * @param {Any} el 元素
     * @return
     */
    afterLeave(el: HTMLElement) {
      el.style.transitionProperty = "";
      el.style.transitionTimingFunction = "";
      el.style.transitionDuration = "";
      el.style.width = "";
      el.style.height = "";
      this.$emit("leave-end");
    },
  },
});
</script>