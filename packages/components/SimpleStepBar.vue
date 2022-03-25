<!--
 * @Author: Quarter
 * @Date: 2020-07-29 14:27:10
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 07:06:51
 * @Description: 简易的步骤条
--> 
<template>
  <div class="simple-step-bar" :class="cutomClass">
    <div
      v-for="(item, index) in thisSteps"
      :key="`stemp-item-${index}`"
      class="step-item"
      :class="activeClass(index)"
      :style="itemStyle"
      @click="changeStep(index)"
    >
      <div class="step-head">
        <div class="step-icon">
          <div v-if="false"></div>
          <div v-else class="dot-icon"></div>
        </div>
        <div v-if="index !== 0" class="step-line"></div>
      </div>
      <template v-if="filterCustom">
        <slot :data="item" :index="index" :active="isActive(index)" :current="isCurrent(index)"></slot>
      </template>
      <template v-else>
        <div class="step-name">{{ item.name }}</div>
        <div v-if="item.brief" class="step-brief">{{ item.brief }}</div>
        <div class="step-slot">
          <slot :name="`step-${index + 1}`"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import {
  SimpleAlign,
  SimpleCustomClass,
  SimpleCustomStyle,
  SimpleStepItem,
} from "../types";

export default Vue.extend({
  name: "SimpleStepBar",
  props: {
    steps: { // 步骤项
      type: Array,
      default: () => [],
    } as PropOptions<SimpleStepItem[]>,
    active: { // 当前选中
      type: Number,
      default: 0,
    },
    align: { // 排列方式
      type: String,
      default: "center",
    } as PropOptions<SimpleAlign>,
    custom: { // 是否自定义
      type: Boolean,
      default: false,
    },
    canChange: { // 是否可以变更
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * @description: 当前选中值
     * @author: Quarter
     * @return {number}
     */
    syncActive: {
      get(): number {
        return this.active;
      },
      set(val: number) {
        this.$emit("update:active", val);
      },
    },
    /**
     * @description: 步骤条
     * @author: Quarter
     * @return {Array<SimpleStepItem>}
     */
    thisSteps(): SimpleStepItem[] {
      if (Array.isArray(this.steps)) {
        return this.steps;
      }
      return [];
    },
    /**
     * @description: 过滤的是否自定义
     * @author: Quarter
     * @return {Boolean}
     */
    filterCustom(): boolean {
      return this.custom !== false;
    },
    /**
     * @description: 过滤的可以变更
     * @author: Quarter
     * @return {Boolean}
     */
    filterCanChange(): boolean {
      return this.canChange !== false;
    },
    /**
     * @description: 自定义类名
     * @author: Quarer
     * @return {SimpleCustomClass}
     */
    cutomClass(): SimpleCustomClass {
      return {
        "align-center": this.align === "center",
        "can-change": this.filterCanChange,
      };
    },
    /**
     * @description: 线的样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    lineStyle(): SimpleCustomStyle {
      return {
        width: 100 - 100 / this.thisSteps.length + "%",
        left: 100 / this.thisSteps.length / 2 + "%",
      };
    },
    /**
     * @description: 项的样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    itemStyle(): SimpleCustomStyle {
      return {
        width: 100 / this.thisSteps.length + "%",
      };
    },
  },
  methods: {
    /**
     * @description: 激活类
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    activeClass(index: number): SimpleCustomClass {
      return {
        active:
          typeof this.syncActive === "number" ? index <= this.syncActive : false,
        current:
          typeof this.syncActive === "number" ? index === this.syncActive : false,
      };
    },
    /**
     * @description: 是否激活
     * @author: Quarter
     * @param {Number} index 下标
     * @return {Boolean}
     */
    isActive(index: number): boolean {
      return typeof this.syncActive === "number"
        ? index <= this.syncActive
        : false;
    },
    /**
     * @description: 是否当前
     * @author: Quarter
     * @param {Number} index 下标
     * @return {Boolean}
     */
    isCurrent(index: number): boolean {
      return typeof this.syncActive === "number"
        ? index === this.syncActive
        : false;
    },
    /**
     * @description: 修改步骤
     * @author: Quarter
     * @param {Number} index 下标
     * @return
     */
    changeStep(index: number): void {
      if (typeof index === "number" && this.syncActive !== index) {
        this.syncActive = index;
        this.$emit("change", this.syncActive);
      }
    },
  },
});
</script>

<style lang="scss">
.simple-step-bar {
  width: 100%;
  display: flex;

  .step-item {
    padding-top: 10px;

    .step-head {
      position: relative;

      .step-icon {
        position: relative;
        z-index: 30;

        .dot-icon {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #e5e5e5;
        }
      }

      .step-line {
        width: 100%;
        height: 2px;
        background-color: #e5e5e5;
        position: absolute;
        top: calc(50% - 1px);
        left: -100%;
      }
    }

    .step-name {
      color: rgba($color: #000000, $alpha: 0.65);
      font-size: 16px;
      margin-top: 15px;
    }

    .step-brief {
      color: rgba($color: #000000, $alpha: 0.5);
      font-size: 14px;
      margin-top: 10px;
    }

    .step-slot {
      margin-top: 10px;
    }

    &.active .step-head {
      .step-icon {
        .dot-icon {
          background-color: var(--step-color, #1890ff);
        }
      }

      .step-line {
        background-color: var(--step-color, #1890ff);
      }
    }

    &.current {
      .step-name {
        color: rgba($color: #000000, $alpha: 0.85);
        font-weight: bold;
      }

      .step-brief {
        color: rgba($color: #000000, $alpha: 0.7);
        font-weight: bold;
      }
    }
  }

  &.align-center .step-item {
    .step-head {
      display: flex;
      justify-content: center;

      .step-line {
        left: -50%;
      }
    }

    .step-name,
    .step-brief,
    .step-slot {
      text-align: center;
    }
  }

  &.can-change .step-item {
    user-select: none;
    cursor: pointer;

    &:not(.active):hover .step-head {
      .step-icon {
        .dot-icon {
          background-color: var(--step-color, #1890ff);
        }
      }
    }
  }
}
</style>