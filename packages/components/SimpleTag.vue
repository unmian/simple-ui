<!--
 * @Author: Quarter
 * @Date: 2020-07-15 15:50:28
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:07:09
 * @Description: 简易标签
--> 
<template>
  <div class="simple-tag" :class="customClass">
    <span>
      <slot></slot>
    </span>
    <i v-if="showClose" class="simple-icon-close" @click="closeTag"></i>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleSize, SimpleThemeMode } from "../types";

export default Vue.extend({
  name: "SimpleTag",
  props: {
    mode: { // 主题模式
      type: String,
      default: "dark",
    } as PropOptions<SimpleThemeMode>,
    size: { // 标签大小
      type: String,
      default: "small",
    } as PropOptions<SimpleSize>,
    showClose: { // 是否显示关闭
      type: Boolean,
      default: false,
    },
    external: { // 是否外部控制
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * @description: 自定类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "theme-light": this.mode === "light",
        "theme-dark": this.mode === "dark",
        "size-large": this.size === "large",
        "size-medium": this.size === "medium",
        "size-small": this.size === "small",
        "size-mini": this.size === "mini",
      };
    },
  },
  methods: {
    /**
     * @description: 关闭按钮
     * @author: Quarter
     * @return
     */
    closeTag(): void {
      this.$emit("close");
      if (this.external === false) {
        this.$nextTick(() => this.$destroy());
        this.$el.parentNode?.removeChild(this.$el);
      }
    },
  },
});
</script>

<style lang="scss">
.simple-tag {
  height: 22px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 22px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;

  i {
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    background-color: rgba($color: #000000, $alpha: 0.03);
    transform: rotate(0deg);
    transition: background-color 0.3s linear, transform 0.3s linear;
    display: block;
    margin-left: 6px;

    &:hover {
      color: var(--tag-close-color, #549fff);
      background-color: rgba($color: #000000, $alpha: 0);
      transform: rotate(90deg);
    }
  }

  &.theme-light {
    color: #333333;
    background-color: var(--tag-color, #f5f5f5);
  }

  &.theme-dark {
    color: #ffffff;
    background-color: var(--tag-color, #44d3fc);
  }

  &.size-mini {
    height: 18px;
    padding: 0 6px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 2px;

    i {
      margin-left: 4px;
    }
  }

  &.size-small {
    height: 22px;
    padding: 0 8px;
    font-size: 12px;
    line-height: 22px;
    border-radius: 2px;

    i {
      margin-left: 6px;
    }
  }

  &.size-medium {
    height: 24px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 24px;
    border-radius: 3px;

    i {
      width: 18px;
      height: 18px;
      line-height: 18px;
      border-radius: 9px;
      margin-left: 6px;
    }
  }

  &.size-large {
    height: 26px;
    padding: 0 12px;
    font-size: 16px;
    line-height: 26px;
    border-radius: 3px;

    i {
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      margin-left: 8px;
    }
  }

  &:not(:first-child) {
    margin-left: 10px;
  }
}
</style>