<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 17:21:46
 * @LastEditors: Quarter
 * @Description: 渐隐过渡
 * @FilePath: /simple-ui/packages/transition/src/fade-transition.vue
-->
<template>
  <transition
    name="fade-transition"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TransitionType } from "./types";

@Component({
  name: "FadeTransition",
})
export default class FadeTransition extends Vue {
  @Prop({
    type: String,
    default: "linear",
  })
  transition!: TransitionType; // 动画方式

  @Prop([Number, String])
  duration?: number | string; // 持续时间

  /**
   * @description: 过滤的过渡方式
   * @author: Quarter
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
   * @author: Quarter
   * @return {Number}
   */
  get filterDuration(): number {
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
  }

  /**
   * @description: 进入之前
   * @param {HTMLElement} el 元素
   * @return
   */
  beforeEnter(el: HTMLElement): void {
    this.beforeAnimation(el);
  }

  /**
   * @description: 进入之后
   * @param {HTMLElement} el 元素
   * @return
   */
  afterEnter(el: HTMLElement): void {
    this.afterAnimation(el);
    this.$emit("enter-end");
  }

  /**
   * @description: 离开之前
   * @param {HTMLElement} el 元素
   * @return
   */
  beforeLeave(el: HTMLElement): void {
    this.beforeAnimation(el);
  }

  /**
   * @description: 离开之后
   * @param {HTMLElement} el 元素
   * @return
   */
  afterLeave(el: HTMLElement): void {
    this.afterAnimation(el);
    this.$emit("leave-end");
  }

  /**
   * @description: 动画开始之前
   * @param {HTMLElement} el 元素
   * @return
   */
  beforeAnimation(el: HTMLElement): void {
    el.style.animationTimingFunction = this.filterTransition;
    el.style.animationDuration = this.filterDuration + "s";
  }

  /**
   * @description: 动画开始之后
   * @param {HTMLElement} el 元素
   * @return
   */
  afterAnimation(el: HTMLElement): void {
    el.style.animationTimingFunction = "";
    el.style.animationDuration = "";
    this.$emit("leave-end");
  }
}
</script>

<style lang="scss" scoped>
.fade-transition-enter-active {
  animation-name: fadeEnterAnimation;
}

.fade-transition-leave-active {
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
