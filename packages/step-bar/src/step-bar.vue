<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:41:26
 * @LastEditors: Quarter
 * @Description: 简易的步骤条
 * @FilePath: /simple-ui/packages/step-bar/src/step-bar.vue
-->
<template>
  <div class="s-step-bar" :class="cutomClass">
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
        <slot
          :data="item"
          :index="index"
          :active="isActive(index)"
          :current="isCurrent(index)"
        ></slot>
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
import { CommonAlign, CustomClass, CustomStyle } from "packages/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import { StepItem } from "./types";

@Component({
  name: "SStepBar",
})
export default class StepBar extends Vue {
  @Prop({
    type: Array,
    default: () => [],
  })
  steps?: StepItem[]; // 步骤项

  @Prop({
    type: Number,
    default: 0,
  })
  active?: number; // 当前选中

  @Prop({
    type: String,
    default: "center",
  })
  align?: CommonAlign; // 排列方式

  @Prop({
    type: Boolean,
    default: false,
  })
  custom?: boolean; // 是否自定义

  @Prop({
    type: Boolean,
    default: false,
  })
  canChange?: boolean; // 是否可以变更

  /**
   * @description: 当前选中值
   * @return {number}
   */
  get syncActive(): number {
    if (typeof this.active === "number") {
      return this.active;
    }
    return 0;
  }

  /**
   * @description: 当前选中值
   * @param {number} val 值
   * @return
   */
  set syncActive(val: number) {
    this.$emit("update:active", val);
  }

  /**
   * @description: 步骤条
   * @return {Array<StepItem>}
   */
  get thisSteps(): StepItem[] {
    if (Array.isArray(this.steps)) {
      return this.steps;
    }
    return [];
  }

  /**
   * @description: 过滤的是否自定义
   * @return {Boolean}
   */
  get filterCustom(): boolean {
    return this.custom !== false;
  }

  /**
   * @description: 过滤的可以变更
   * @return {Boolean}
   */
  get filterCanChange(): boolean {
    return this.canChange !== false;
  }

  /**
   * @description: 自定义类名
   * @author: Quarer
   * @return {CustomClass}
   */
  get cutomClass(): CustomClass {
    return {
      "align-center": this.align === "center",
      "can-change": this.filterCanChange,
    };
  }

  /**
   * @description: 线的样式
   * @return {CustomStyle}
   */
  get lineStyle(): CustomStyle {
    return {
      width: `${100 - 100 / this.thisSteps.length  }%`,
      left: `${100 / this.thisSteps.length / 2  }%`,
    };
  }

  /**
   * @description: 项的样式
   * @return {CustomStyle}
   */
  get itemStyle(): CustomStyle {
    return {
      width: `${100 / this.thisSteps.length  }%`,
    };
  }

  /**
   * @description: 激活类
   * @return {CustomClass}
   */
  activeClass(index: number): CustomClass {
    return {
      active: typeof this.syncActive === "number" ? index <= this.syncActive : false,
      current: typeof this.syncActive === "number" ? index === this.syncActive : false,
    };
  }

  /**
   * @description: 是否激活
   * @param {Number} index 下标
   * @return {Boolean}
   */
  isActive(index: number): boolean {
    return typeof this.syncActive === "number" ? index <= this.syncActive : false;
  }

  /**
   * @description: 是否当前
   * @param {Number} index 下标
   * @return {Boolean}
   */
  isCurrent(index: number): boolean {
    return typeof this.syncActive === "number" ? index === this.syncActive : false;
  }

  /**
   * @description: 修改步骤
   * @param {Number} index 下标
   * @return
   */
  changeStep(index: number): void {
    if (typeof index === "number" && this.syncActive !== index) {
      this.syncActive = index;
      this.$emit("change", this.syncActive);
    }
  }
}
</script>

<style lang="scss">
.s-step-bar {
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
