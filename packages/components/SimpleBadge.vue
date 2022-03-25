<!--
 * @Author: Quarter
 * @Date: 2021-06-22 19:06:56
 * @LastEditTime: 2022-03-10 07:00:31
 * @LastEditors: Quarter
 * @Description: 简易的标记组建
 * @FilePath: /simple-ui/packages/components/SimpleBadge.vue
-->
<template>
  <div class="simple-badge" :class="customClass">
    <div>
      <slot></slot>
    </div>
    <div class="badge-content" v-if="!invalid" :style="{ 'background-color': safeColor }">
      <template v-if="filterSize !== undefined">{{ filterValue }}</template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleSize } from "../types";

export default Vue.extend({
  name: "SimpleBadge",
  props: {
    size: String as PropOptions<SimpleSize>, // 尺寸
    value: [String, Number], // 值
    color: String, // 颜色
    invalid: Boolean, // 失效
  },
  computed: {
    /**
     * @description: 过滤的尺寸
     * @author: Quarter
     * @return {SimpleSize}
     */
    filterSize(): SimpleSize {
      const sizeList: SimpleSize[] = ["mini", "small", "medium", "large"];
      if (typeof this.size === "string" && sizeList.indexOf(this.size) > -1) {
        return this.size;
      }
      return "small";
    },
    /**
       * @description: 过滤的值
       * @author: Quarter
       * @return {String|Number}
       */
    filterValue(): string | number | undefined {
      if (
        typeof this.value === "string" &&
        this.value.replace(/\s/g, "").length > 0
      ) {
        return this.value;
      }
      if (typeof this.value === "number") {
        return this.value;
      }
    },
    /**
     * @description: 安全的颜色
     * @author: Quarter
     * @return
     */
    safeColor(): string {
      const hexColor: RegExp = new RegExp(/^#[0-9a-fA-F]{6}$/);
      const rgbColor: RegExp = new RegExp(/^rgb\(([0-9]{1,3},){2}[0-9]{1,3}\)$/);
      const rgbaColor: RegExp = new RegExp(
        /^rgba\(([0-9]{1,3},){3}((0(\.[0-9]+){0,1})|1)\)$/
      );
      if (typeof this.color === "string" && this.color) {
        const color: string = this.color.replace(/\s/g, "");
        if (
          hexColor.test(color) ||
          rgbColor.test(color) ||
          rgbaColor.test(color)
        ) {
          return color;
        }
      }
      return "#f04134";
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      const classNames: SimpleCustomClass = {
        "is-dot": this.filterValue === undefined,
      };
      Reflect.set(classNames, "size-" + this.filterSize, true);
      return classNames;
    },
  },
});
</script>

<style lang="scss">
.simple-badge {
  display: inline-block;
  position: relative;

  .badge-content {
    color: white;
    cursor: default;
    user-select: none;
    border: 1px solid white;
    transform: translateX(50%) translateY(-50%);
    position: absolute;
    top: 0;
    right: 0;
  }

  &.size-mini .badge-content {
    height: 16px;
    padding: 0 5px;
    font-size: 12px;
    line-height: 16px;
    border-radius: 9px;
  }

  &.size-small .badge-content {
    height: 18px;
    padding: 0 6px;
    font-size: 13px;
    line-height: 18px;
    border-radius: 10px;
  }

  &.size-medium .badge-content {
    height: 18px;
    padding: 0 6px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 10px;
  }

  &.size-large .badge-content {
    height: 20px;
    padding: 0 6px;
    font-size: 15px;
    line-height: 20px;
    border-radius: 11px;
  }

  &.is-dot {
    .badge-content {
      padding: 0;
    }

    &.size-mini .badge-content {
      width: 4px;
      height: 4px;
      border-radius: 3px;
    }

    &.size-small .badge-content {
      width: 6px;
      height: 6px;
      border-radius: 4px;
    }

    &.size-medium .badge-content {
      width: 8px;
      height: 8px;
      border-radius: 5px;
    }

    &.size-large .badge-content {
      width: 10px;
      height: 10px;
      border-radius: 6px;
    }
  }
}
</style>