<!--
 * @Author: Quarter
 * @Date: 2020-07-31 09:30:43
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-23 07:47:45
 * @Description: 展开过渡
--> 
<template>
  <transition-group
    name="fade-transition-group"
    :tag="tag"
    @before-enter="beforeAnimation"
    @after-enter="afterAnimation"
    @before-leave="beforeAnimation"
    @after-leave="afterAnimation"
  >
    <slot></slot>
  </transition-group>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleTransitionType } from "../types";

export default Vue.extend({
  name: "FadeTransitionGroup",
  props: {
    transition: { // 动画方式
      type: String,
      default: "linear",
    } as PropOptions<SimpleTransitionType>,
    duration: [Number, String], // 持续时间
    tag: { // 标签
      type: String,
      required: true,
    },
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

<style lang="scss">
.fade-transition-group-enter-active {
  animation-name: fadeEnterAnimation;
}

.fade-transition-group-leave-active {
  animation-name: fadeLeaveAnimation;
}

@keyframes fadeEnterAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeLeaveAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>