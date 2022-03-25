<!--
 * @Author: Quarter
 * @Date: 2020-07-16 09:45:40
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:23:16
 * @Description: 回到顶部
--> 
<template>
  <div
    class="simple-backtop"
    :class="customClass"
    :style="{ bottom: bottom }"
    v-show="visible"
    @click="scrollTop"
  >
    <i class="simple-icon-rocket"></i>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleSize } from "../types";

export default Vue.extend({
  name: "SimpleBacktop",
  props: {
    offset: Number, // 偏移量
    size: { // 尺寸
      type: String,
      default: "medium",
    } as PropOptions<SimpleSize>,
  },
  data() {
    return {
      visible: false, // 是否显示
    };
  },
  computed: {
    /**
     * @description: 距离底部的距离
     * @author: Quarter
     * @return
     */
    bottom(): string | undefined {
      if (typeof this.offset === "number") {
        return `${this.offset}px`;
      }
    },
    /**
     * @description: 自定义类
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "size-mini": this.size === "mini",
        "size-small": this.size === "small",
        "size-medium": this.size === "medium",
        "size-large": this.size === "large",
      };
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    const container: Element | null = this.$el.parentElement;
    if (container instanceof Element) {
      this.judgeScrollTopVisible();
      container.addEventListener("scroll", this.judgeScrollTopVisible);
    }
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestroy(): void {
    const container: Element | null = this.$el.parentElement;
    if (container instanceof Element) {
      container.removeEventListener("scroll", this.judgeScrollTopVisible);
    }
  },
  methods: {
    /**
     * @description: 判断是否显示
     * @author: Quarter
     * @return
     */
    judgeScrollTopVisible(): void {
      const container: Element | null = this.$el.parentElement;
      if (container instanceof Element) {
        if (container.scrollTop < 200) {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
    },
    /**
     * @description: 滚动掉顶层
     * @author: Quarter
     * @return
     */
    scrollTop(): void {
      const container: Element | null = this.$el.parentElement;
      if (container instanceof Element) {
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
  },
});
</script>

<style lang="scss">
.simple-backtop {
  color: var(--backtop-color, #549fff);
  cursor: pointer;
  box-shadow: 0px 4px 15px 0px rgba(214, 220, 234, 1);
  background-color: #f1f8ff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 80px;
  bottom: 40px;
  z-index: 199;

  &.size-medium {
    width: 50px;
    height: 50px;
    font-size: 30px;
    border-radius: var(--backtop-radius, 5px);
  }

  &.size-small {
    width: 40px;
    height: 40px;
    font-size: 24px;
    border-radius: var(--backtop-radius, 4px);
  }

  &.size-mini {
    width: 32px;
    height: 32px;
    font-size: 18px;
    border-radius: var(--backtop-radius, 3px);
  }
}
</style>