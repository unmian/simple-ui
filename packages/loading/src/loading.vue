<!--
 * @Author: Quarter
 * @Date: 2021-03-17 14:12:11
 * @LastEditTime: 2022-04-12 02:46:53
 * @LastEditors: Quarter
 * @Description: 简易的加载动画
 * @FilePath: /simple-ui/packages/loading/src/loading.vue
-->
<template>
  <div v-if="visible" class="s-loading" :class="customClass" :style="{ zIndex }">
    <div class="s-loading-tip" :style="{ color }">
      <div class="s-loading-icon">
        <i :class="safeSpinner"></i>
      </div>
      <div class="s-loading-text" v-if="safeText">{{ safeText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomClass, CommonThemeMode } from "packages/types";
import variables from "packages/variables";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SLoading",
})
export default class SLoading extends Vue {
  @Prop(Boolean)
  fullscreen?: boolean; // 是否全屏

  @Prop(String)
  spinner?: string; // 提示文字

  @Prop(String)
  text?: string; // 文本

  @Prop(String)
  mode?: CommonThemeMode; // 主题模式

  @Prop(String)
  color?: string; // 主题模式

  insideVisible = false; // 是否隐藏
  zIndex = ++variables.zIndex; // 层级

  /**
   * @description: 设置 visible 变量
   * @author: Quarter
   * @return {boolean}
   */
  get visible(): boolean {
    return this.insideVisible;
  }

  /**
   * @description: 设置 visible 变量
   * @author: Quarter
   * @param {boolean} value 值
   * @return
   */
  set visible(value: boolean) {
    if (value === false || value === undefined || value === null) {
      this.insideVisible = false;
    } else {
      if (this.insideVisible !== true) {
        this.zIndex = ++variables.zIndex;
        this.insideVisible = true;
      }
    }
  }

  /**
   * @description: 安全的全屏
   * @author: Quarter
   * @return {Boolean}
   */
  get safeFullScreen(): boolean {
    return this.fullscreen === true;
  }

  /**
   * @description: 安全图标
   * @author: Quarter
   * @return {String}
   */
  get safeSpinner(): string {
    if (typeof this.spinner === "string" && this.spinner.length > 0) {
      return this.spinner;
    }
    return "s-icon-loading";
  }

  /**
   * @description: 安全的主题模式
   * @author: Quarter
   * @return {String}
   */
  get safeText(): string | undefined {
    if (typeof this.text === "string" && this.text.length > 0) {
      return this.text;
    }
  }

  /**
   * @description: 安全的主题模式
   * @author: Quarter
   * @return {CommonThemeMode}
   */
  get safeMode(): CommonThemeMode {
    const modes: CommonThemeMode[] = ["light", "dark"];
    if (typeof this.mode === "string" && modes.indexOf(this.mode) > -1) {
      return this.mode;
    }
    return "dark";
  }

  /**
   * @description: 自定义类名
   * @author: Quarter
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      fullscreen: this.safeFullScreen,
      "theme-light": this.safeMode === "light",
      "theme-dark": this.safeMode === "dark",
    };
  }
}
</script>

<style lang="scss">
.s-loading {
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

  .s-loading-tip {
    .s-loading-icon {
      width: 28px;
      height: 28px;
      font-size: 20px;
      animation: loadingRotate 1.6s linear infinite;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }

    .s-loading-text {
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