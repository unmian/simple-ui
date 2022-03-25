<!--
 * @Author: Quarter
 * @Date: 2020-07-16 14:03:41
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 06:25:44
 * @Description: 简易的路径显示框
--> 
<template>
  <div class="simple-path" :class="{ 'can-click': click }">
    <div v-if="!hideMark" class="mark"></div>
    <div class="path-list">
      <div v-for="(item, index) in path" :key="`path-item-${index}`" class="path-item">
        <div class="path-name" @click="toPath(item.path)">{{ item.name }}</div>
        <div v-if="index !== path.length - 1" class="path-split">/</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleMenuItem } from "../types";

export default Vue.extend({
  name: "SimplePath",
  inject: {
    refresh: {
      from: "refresh",
      default: () => { },
    },
  },
  props: {
    path: { // 路径
      type: Array,
      default: () => [],
    } as PropOptions<SimpleMenuItem[]>,
    click: { // 是否可以点击跳转
      type: Boolean,
      default: false,
    },
    hideMark: { // 是否显示标记// 是否显示标记
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * @description: 前往指定路径
     * @author: Quarter
     * @param {String} path 指定路径
     * @return
     */
    toPath(path: string | undefined): void {
      if (this.click === true && typeof path === "string") {
        const currentPath: string = this.$route.path;
        if (path === currentPath) {
          if (typeof (this as any).refresh === "function") {
            (this as any).refresh();
          }
        } else {
          this.$router.push(path).catch((reason: any) => {
            const samePathError: RegExp = new RegExp(
              /^Avoided\sredundant\snavigation\sto\scurrent\slocation/
            );
            if (samePathError.test(reason.message) === false) {
              throw reason;
            }
          });
        }
      }
    },
  },
});
</script>

<style lang="scss">
.simple-path {
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #666666;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .mark {
    width: 4px;
    height: 20px;
    border-radius: 2px;
    background-color: var(--mark-color, #5474ff);
    overflow: hidden;
    margin-right: 11px;
  }

  .path-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .path-item {
      color: inherit;
      font-size: inherit;
      cursor: default;
      display: flex;
      align-items: center;

      .path-split {
        padding: 0 5px;
      }

      &:last-of-type {
        color: var(--selected-color, inherit);
        font-weight: bold;
      }
    }
  }

  &.can-click {
    .path-name {
      cursor: pointer;
      position: relative;

      &:hover::after {
        content: "";
        width: 100%;
        height: 1px;
        background-color: #666666;
        display: block;
        position: absolute;
        bottom: -1px;
        left: 0;
      }

      &:last-of-type:hover::after {
        background-color: var(--selected-color, #666666);
      }
    }
  }
}
</style>