<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 17:21:59
 * @LastEditors: Quarter
 * @Description: 缩放过渡
 * @FilePath: /simple-ui/packages/transition/src/scale-transition-group.vue
-->
<template>
  <transition-group
    name="scale-transition-group"
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { TransitionType } from "./types";

@Component({
  name: "ScaleTransitionGroup",
})
export default class ScaleTransitionGroup extends Vue {
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
  }
}
</script>

<style lang="scss">
.scale-transition-group-enter-active {
  animation-name: scaleEnterAnimation;
}

.scale-transition-group-leave-active {
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
