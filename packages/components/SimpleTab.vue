<!--
 * @Author: Quarter
 * @Date: 2020-07-16 08:56:09
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-24 01:55:45
 * @Description: 简易的tab切换标签
--> 
<template>
  <div class="simple-tab" :class="customClass">
    <ul>
      <li v-for="(item, index) in tabs" :key="`tab-item-${index}`" :class="menuClass(index)">
        <button @click="toPath(index)">{{ item.name }}</button>
        <div v-if="numberMarkVisible(item.value)" class="number-mark">{{ item.value }}</div>
        <div v-if="dotMarkVisible(item.value)" class="dot-mark"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import {
  SimpleCustomClass,
  SimpleDirection,
  SimpleMarkMode,
  SimpleMenuItem,
} from "../types";

export default Vue.extend({
  name: "SimpleTab",
  props: {
    tabs: { // 标签数据
      type: Array,
      default: () => [],
    } as PropOptions<SimpleMenuItem[]>,
    active: { // 选中的菜单
      type: Number,
      default: 0,
    },
    align: { // 排列方式
      type: String,
      default: "horizontal",
    } as PropOptions<SimpleDirection>,
    mark: { // 是否显示标记
      type: Boolean,
      default: false,
    },
    markMode: { // 标记类型
      type: String,
      default: "number",
    } as PropOptions<SimpleMarkMode>,
  },
  data() {
    return {
      unsyncedActive: 0, // 激活的tab下标
    };
  },
  computed: {
    /**
     * @description: 选中的菜单
     * @author: Quarter
     * @return {number}
     */
    syncedActive: {
      get(): number {
        return this.active;
      },
      set(val: number): void {
        this.$emit("update:active", val);
      },
    },
    /**
     * @description: 过滤的排列方式
     * @author: Quarter
     * @return {String}
     */
    realAlign(): string {
      if (this.align === "horizontal" || this.align === "vertical") {
        return this.align;
      }
      return "horizontal";
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "align-horizontal": this.realAlign === "horizontal",
        "align-vertical": this.realAlign === "vertical",
      };
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.unsyncedActive = this.syncedActive;
  },
  watch: {
    /**
     * @description: 更新选中的tab页下标
     * @param {Number} newIndex 新的下标
     * @param {Number} oldIndex 旧的下标
     * @return
     */
    active(newIndex?: number, oldIndex?: number): void {
      if (
        typeof newIndex === "number" &&
        this.unsyncedActive !== newIndex &&
        Array.isArray(this.tabs)
      ) {
        const tab: SimpleMenuItem = this.tabs[newIndex];
        if (tab) {
          this.toPath(newIndex);
        }
      }
    },
  },
  methods: {
    /**
     * @description: 自定义类名
     * @param {Number} index tab下标
     * @return {SimpleCustomClass}
     */
    menuClass(index: number): SimpleCustomClass {
      return {
        active: this.unsyncedActive === index,
      };
    },
    /**
     * @description: 是否显示数字标记
     * @author: Quarter
     * @return {Boolean}
     */
    numberMarkVisible(value: number | null | undefined): boolean {
      return (
        this.mark === true &&
        this.markMode === "number" &&
        typeof value === "number" &&
        value > 0
      );
    },
    /**
     * @description: 是否显示点标记
     * @author: Quarter
     * @return {Boolean}
     */
    dotMarkVisible(value: number | null | undefined): boolean {
      return (
        this.mark === true &&
        this.markMode === "dot" &&
        typeof value === "number" &&
        value > 0
      );
    },
    /**
     * @description: 前往指定路径
     * @param {String} path 前往的路径
     * @param {Number} index tab页下标
     * @return
     */
    toPath(index: number): void {
      if (
        typeof index === "number" &&
        Array.isArray(this.tabs) &&
        this.unsyncedActive !== index
      ) {
        const tab: SimpleMenuItem = this.tabs[index];
        if (tab) {
          const currentPath: string = this.$route.path;
          if (typeof tab.path === "string" && currentPath !== tab.path) {
            this.$router.push(tab.path);
          }
          this.unsyncedActive = index;
          this.syncedActive = this.unsyncedActive;
          // 触发 change 事件
          this.$emit("change", this.unsyncedActive, tab);
          // 选中回调
          if (typeof tab.onActive === "function") {
            tab.onActive();
          }
        }
      }
    },
  },
});
</script>

<style lang="scss">
.simple-tab {
  height: 60px;

  ul {
    width: 100%;
    height: 100%;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;

    li {
      height: 100%;
      padding-top: 0;
      padding-bottom: 0;
      padding-left: var(--item-spacing, 30px);
      padding-right: var(--item-spacing, 30px);
      display: flex;
      align-items: center;

      button {
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: var(--item-padding, 0);
        padding-right: var(--item-padding, 0);
        color: #333333;
        font-size: 14px;
        line-height: 2;
        border: none;
        background: none;
        position: relative;
      }

      .number-mark {
        width: 16px;
        height: 16px;
        color: #ffffff;
        font-size: 12px;
        border-radius: 8px;
        background-color: #f5a623;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 15px;
        right: 12px;
      }

      .dot-mark {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: #f04134;
        position: absolute;
        top: 20px;
        right: 22px;
      }

      &.active {
        button {
          color: var(--active-color, #3d7fff);

          &::after {
            content: "";
            width: 100%;
            height: 2px;
            background-color: var(--active-color, #3d7fff);
            display: block;
            position: absolute;
            bottom: -10px;
            left: 0;
          }
        }
      }

      &:not(.active) button {
        cursor: pointer;
      }
    }
  }

  &.align-vertical {
    width: 100%;
    height: auto;

    ul li {
      width: 100%;
      height: 50px;
      padding: 0;
      flex-wrap: wrap;
      justify-content: center;

      button {
        width: 100%;
        padding: 0 30px 0 50px;
        color: #202224;
        line-height: 50px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
      }

      &.active {
        button {
          color: var(--active-color, #3d7fff);
          font-size: 16px;
          font-weight: bold;

          &::after {
            content: "";
            width: 6px;
            height: 30px;
            border-radius: 3px;
            background-color: var(--active-color, #3d7fff);
            display: block;
            position: absolute;
            top: 10px;
            left: 17px;
          }
        }
      }

      &:not(:last-of-type)::after {
        content: "";
        width: calc(100% - 26px);
        height: 1px;
        background-color: #e0e0e0;
        display: block;
      }
    }
  }
}
</style>