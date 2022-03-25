<!--
 * @Author: Quarter
 * @Date: 2020-07-13 15:57:43
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-10 05:25:51
 * @Description: 管理系统标题栏组件
--> 
<template>
  <div class="common-header" :class="customClass">
    <div class="left-functions">
      <div class="system-title">Simple UI</div>
    </div>
    <div class="right-functions"></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleThemeMode } from "packages";

export default Vue.extend({
  name: "CommonHeader",
  props: {
    mode: { // 主题模式
      type: String,
      default: "light",
    } as PropOptions<SimpleThemeMode>,
    asideActive: { // 侧边栏
      type: Boolean,
      default: true,
    },
  },
  computed: {
    /**
     * @description: 自定义类
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "mode-light": this.mode !== "dark",
        "mode-dark": this.mode === "dark",
      };
    },
    /**
     * @description: 侧边栏按钮图标
     * @author: Quarter
     * @return {String}
     */
    asideMenuClass(): string {
      if (this.asideActive === true) {
        return "simple-icon-aside-fold";
      }
      return "simple-icon-aside-unfold";
    },
  },
  methods: {
    /**
     * @description: 切换侧边栏状态
     * @author: Quarter
     * @return
     */
    switchAsideStatus(): void {
      this.$emit("switch-aside");
    },
  },
});
</script>

<style lang="scss" scoped>
.common-header {
  width: 100%;
  height: 100%;
  padding: 0 25px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 8px 10px;
    color: rgba($color: #000000, $alpha: 0.65);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: none;

    i {
      font-size: 16px;
    }

    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
  }

  .left-functions {
    width: 30%;
    display: flex;
    align-items: center;

    & > *:not(:first-child) {
      margin-left: 10px;
    }

    .system-title {
      font-size: 20px;
    }
  }

  .right-functions {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }

  &.mode-light {
    color: rgba($color: #000000, $alpha: 0.65);
  }
}
</style>
