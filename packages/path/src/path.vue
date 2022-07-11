<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-06-07 16:47:14
 * @LastEditors: Quarter
 * @Description: 简易的路径显示框
 * @FilePath: /simple-ui/packages/path/src/path.vue
-->
<template>
  <div class="s-path" :class="{ 'can-click': click }">
    <div v-if="!hideMark" class="mark"></div>
    <div class="path-list">
      <div
        v-for="(item, index) in path"
        :key="`path-item-${index}`"
        class="path-item"
      >
        <div class="path-name" @click="toPath(item.path)">{{ item.name }}</div>
        <div
          v-if="Array.isArray(path) && index !== path.length - 1"
          class="path-split"
        >
          /
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { MenuItem } from "./types";

@Component({
  name: "SPath",
})
export default class SPath extends Vue {
  @Inject({
    from: "refresh",
    default: () => ({}),
  })
  refresh!: () => void;

  @Prop({
    type: Array,
    default: () => [],
  })
  path?: MenuItem[]; // 路径

  @Prop({
    type: Boolean,
    default: false,
  })
  click?: boolean; // 是否可以点击跳转

  @Prop({
    type: Boolean,
    default: false,
  })
  hideMark?: boolean; // 是否显示标记

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
        if (typeof this.refresh === "function") {
          this.refresh();
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
  }
}
</script>

<style lang="scss">
.s-path {
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
