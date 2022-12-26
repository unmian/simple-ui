<!--
 * @Author: Quarter
 * @Date: 2021-03-17 14:12:11
 * @LastEditTime: 2022-12-15 19:33:29
 * @LastEditors: Quarter
 * @Description: 简易的加载动画
 * @FilePath: /simple-ui/packages/loading/src/loading.vue
-->
<template>
  <div v-if="visible" class="s-loading" :class="customClass" :style="{ zIndex }">
    <div class="s-loading__blur"></div>
    <div class="s-loading__background"></div>
    <div class="s-loading__indicator" :style="{ color }">
      <dot-circle v-if="safeTheme === 'dot-circle'" class="s-loading__icon"></dot-circle>
      <dot-planet v-else-if="safeTheme === 'dot-planet'" class="s-loading__icon"></dot-planet>
      <gradient-conic v-else class="s-loading__icon"></gradient-conic>
      <div class="s-loading__text" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { CommonSize, CustomClass } from "packages/types";
import variables from "packages/variables";
import { Component, Prop, Vue } from "vue-property-decorator";
import { DotCircle, DotPlanet, GradientConic } from "./components";
import { LoadingTheme } from "./types";

@Component({
  name: "SLoading",
  components: {
    DotCircle,
    DotPlanet,
    GradientConic,
  },
})
export default class Loading extends Vue {
  // 是否全屏
  @Prop(Boolean)
  fullscreen?: boolean;

  // 加载主题
  @Prop(String)
  readonly theme?: LoadingTheme;

  // 文本
  @Prop({
    type: String,
    default: "加载中",
  })
  text!: string;

  // 文本
  @Prop({
    type: String,
    default: "medium",
  })
  size!: CommonSize;

  // 主题模式
  @Prop(String)
  color?: string;

  // 是否隐藏
  insideVisible = false;
  // 层级
  zIndex = ++variables.zIndex;

  /**
   * @description: 自定义样式类
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    const classList = {
      "s-loading--fullscreen": this.safeFullScreen,
    };
    Reflect.set(classList, `s-loading--${this.safeSize}`, true);
    return classList;
  }

  /**
   * @description: 设置 visible 变量
   * @return {boolean}
   */
  get visible(): boolean {
    return this.insideVisible;
  }

  /**
   * @description: 设置 visible 变量
   * @param {boolean} value 值
   * @return
   */
  set visible(value: boolean) {
    if (value === false || value === undefined || value === null) {
      this.insideVisible = false;
    } else if (this.insideVisible !== true) {
      this.zIndex = ++variables.zIndex;
      this.insideVisible = true;
    }
  }

/**
 * @description: 安全的主题
 * @return {CommonSize}
 */
get safeTheme(): LoadingTheme {
  if (this.theme && ["gradient-conic", "dot-circle", "dot-planet"].includes(this.theme)) {
    return this.theme;
  }
  return "gradient-conic";
}

  /**
   * @description: 安全的尺寸
   * @return {CommonSize}
   */
  get safeSize(): CommonSize {
    if (["large", "medium", "small", "mini"].includes(this.size)) {
      return this.size;
    }
    return "medium";
  }

  /**
   * @description: 安全的全屏
   * @return {Boolean}
   */
  get safeFullScreen(): boolean {
    return !!this.fullscreen;
  }
}
</script>

<style lang="scss">
.s-loading {
  width: 100%;
  height: 100%;
  color: var(--s-brand-normal);
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
}

.s-loading__blur,
.s-loading__background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.s-loading__blur {
  backdrop-filter: blur(4px);
}

.s-loading__background {
  background-color: var(--s-background-primary);
  opacity: 0.9;
}

.s-loading__indicator {
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
}

.s-loading--fullscreen {
  position: fixed;
}

.s-loading--mini {
  .s-loading__icon {
    font-size: 2rem;
  }

  .s-loading__text {
    font-size: 1.2rem;
    margin-top: var(--s-spacing-4);
  }
}

.s-loading--small {
  .s-loading__icon {
    font-size: 2.4rem;
  }

  .s-loading__text {
    font-size: 1.4rem;
    margin-top: var(--s-spacing-8);
  }
}

.s-loading--medium {
  .s-loading__icon {
    font-size: 2.8rem;
  }

  .s-loading__text {
    font-size: 1.4rem;
    margin-top: var(--s-spacing-8);
  }
}

.s-loading--large {
  .s-loading__icon {
    font-size: 3.6rem;
  }

  .s-loading__text {
    font-size: 1.6rem;
    margin-top: var(--s-spacing-12);
  }
}
</style>
