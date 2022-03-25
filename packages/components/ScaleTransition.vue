<!--
 * @Author: Quarter
 * @Date: 2020-07-31 09:30:43
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-23 07:39:25
 * @Description: 展开过渡
--> 
<template>
  <transition
    name="scale-transition"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleTransitionType } from "../types";

export default Vue.extend({
  name: "ScaleTransition",
  props: {
    transition: { // 动画方式
      type: String,
      default: "linear",
    } as PropOptions<SimpleTransitionType>,
    duration: [Number, String], // 持续时间
  },
  computed: {
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
     * @description: 进入之前
     * @param {HTMLElement} el 元素
     * @return
     */
    beforeEnter(el: HTMLElement): void {
      this.beforeAnimation(el);
    },
    /**
     * @description: 进入之后
     * @param {HTMLElement} el 元素
     * @return
     */
    afterEnter(el: HTMLElement): void {
      this.afterAnimation(el);
      this.$emit("enter-end");
    },
    /**
     * @description: 离开之前
     * @param {HTMLElement} el 元素
     * @return
     */
    beforeLeave(el: HTMLElement): void {
      this.beforeAnimation(el);
    },
    /**
     * @description: 离开之后
     * @param {HTMLElement} el 元素
     * @return
     */
    afterLeave(el: HTMLElement): void {
      this.afterAnimation(el);
      this.$emit("leave-end");
    },
    /**
     * @description: 动画开始之前
     * @param {HTMLElement} el 元素
     * @return
     */
    beforeAnimation(el: HTMLElement): void {
      el.style.animationTimingFunction = this.filterTransition;
      el.style.animationDuration = this.filterDuration + "s";
    },
    /**
     * @description: 动画开始之后
     * @param {HTMLElement} el 元素
     * @return
     */
    afterAnimation(el: HTMLElement): void {
      el.style.animationTimingFunction = "";
      el.style.animationDuration = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.scale-transition-enter-active {
  animation-name: scaleEnterAnimation;
}

.scale-transition-leave-active {
  animation-name: scaleLeaveAnimation;
}

@keyframes scaleEnterAnimation {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scaleLeaveAnimation {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>