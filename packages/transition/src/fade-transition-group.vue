<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:42:51
 * @LastEditors: Quarter
 * @Description: 渐隐过渡
 * @FilePath: /simple-ui/packages/transition/src/fade-transition-group.vue
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { TransitionType } from "./types";

@Component({
  name: "FadeTransitionGroup",
})
export default class FadeTransitionGroup extends Vue {
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
   * @description: 动画开始之前
   * @param {HTMLElement} el 元素
   * @return
   */
  beforeAnimation(el: HTMLElement): void {
    // eslint-disable-next-line no-param-reassign
    el.style.animationTimingFunction = this.filterTransition;
    // eslint-disable-next-line no-param-reassign
    el.style.animationDuration = `${this.filterDuration  }s`;
  }

  /**
   * @description: 动画开始之后
   * @param {HTMLElement} el 元素
   * @return
   */
  afterAnimation(el: HTMLElement): void {
    // eslint-disable-next-line no-param-reassign
    el.style.animationTimingFunction = "";
    // eslint-disable-next-line no-param-reassign
    el.style.animationDuration = "";
  }
}
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
