<!--
 * @Author: Quarter
 * @Date: 2021-03-17 14:12:11
 * @LastEditTime: 2022-03-24 10:25:27
 * @LastEditors: Quarter
 * @Description: 简易的加载动画
 * @FilePath: /simple-ui/packages/components/SimpleLoading.vue
-->
<template>
  <div v-if="visible" class="simple-loading" :class="customClass" :style="{ zIndex }">
    <div class="simple-loading-tip" :style="{ color }">
      <div class="simple-loading-icon">
        <i :class="safeSpinner"></i>
      </div>
      <div class="simple-loading-text" v-if="safeText">{{ safeText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import variables from "../variables";
import { SimpleCustomClass, SimpleThemeMode } from "../types";

export default Vue.extend({
  name: "SimpleLoading",
  props: {
    fullscreen: Boolean, // 是否全屏
    spinner: String, // 提示文字
    text: String, // 文本
    mode: String as PropOptions<SimpleThemeMode>, // 主题模式
    color: String, // 主题模式
  },
  data() {
    return {
      insideVisible: false, // 是否隐藏
      zIndex: ++variables.zIndex, // 层级
    };
  },
  computed: {
    /**
     * @description: 设置 visible 变量
     * @author: Quarter
     * @return {boolean}
     */
    visible: {
      get(): boolean {
        return this.insideVisible;
      },
      set(value: boolean): void {
        if (value === false || value === undefined || value === null) {
          this.insideVisible = false;
        } else {
          if (this.insideVisible !== true) {
            this.zIndex = ++variables.zIndex;
            this.insideVisible = true;
          }
        }
      },
    },
    /**
     * @description: 安全的全屏
     * @author: Quarter
     * @return {Boolean}
     */
    safeFullScreen(): boolean {
      return this.fullscreen === true;
    },
    /**
     * @description: 安全图标
     * @author: Quarter
     * @return {String}
     */
    safeSpinner(): string {
      if (typeof this.spinner === "string" && this.spinner.length > 0) {
        return this.spinner;
      }
      return "simple-icon-loading";
    },
    /**
     * @description: 安全的主题模式
     * @author: Quarter
     * @return {String}
     */
    safeText(): string | undefined {
      if (typeof this.text === "string" && this.text.length > 0) {
        return this.text;
      }
    },
    /**
     * @description: 安全的主题模式
     * @author: Quarter
     * @return {SimpleThemeMode}
     */
    safeMode(): SimpleThemeMode {
      const modes: SimpleThemeMode[] = ["light", "dark"];
      if (typeof this.mode === "string" && modes.indexOf(this.mode) > -1) {
        return this.mode;
      }
      return "dark";
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        fullscreen: this.safeFullScreen,
        "theme-light": this.safeMode === "light",
        "theme-dark": this.safeMode === "dark",
      };
    },
  },
});
export class SimpleLoading extends Vue {



}
</script>

<style lang="scss">
.simple-loading {
  width: 100%;
  height: 100%;
  color: var(--loading-color, #549fff);
  user-select: none;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  .simple-loading-tip {
    .simple-loading-icon {
      width: 28px;
      height: 28px;
      font-size: 20px;
      animation: loadingRotate 1.6s linear infinite;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }

    .simple-loading-text {
      font-size: 14px;
      text-align: center;
      margin-top: 8px;
    }
  }

  &.theme-light {
    background-color: rgba($color: #ffffff, $alpha: 0.3);
  }

  &.theme-dark {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }

  &.fullscreen {
    position: fixed;
  }
}

@keyframes loadingRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>