<!--
 * @Author: Quarter
 * @Date: 2021-05-07 15:09:26
 * @LastEditTime: 2022-06-07 16:48:20
 * @LastEditors: Quarter
 * @Description: 预览组件
 * @FilePath: /simple-ui/packages/preview/src/preview.vue
-->
<template>
  <div class="s-preview" :class="customClass">
    <slot></slot>
    <fade-transition transition="linear">
      <div
        v-if="visible"
        class="s-preview-fullscreen"
        :style="{ zIndex }"
        @click="visible = false"
      >
        <div
          ref="container"
          class="preview-container"
          @click.stop="exitFullScreen"
        ></div>
        <div class="preview-operation">
          <button @click="visible = false">
            <i class="s-icon-close"></i>
          </button>
        </div>
      </div>
    </fade-transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CustomClass, CommonThemeMode } from "packages/types";
import { FadeTransition } from "packages/transition";
import variables from "packages/variables";

@Component({
  name: "SPreview",
  components: {
    FadeTransition,
  },
})
export default class SPreview extends Vue {
  @Prop(String)
  mode?: CommonThemeMode; // 主题模式

  zIndex = variables.zIndex; // 层级
  visible = false; // 预览状态

  /**
   * @description: 过滤的颜色模式
   * @author: Quarter
   * @return {CommonThemeMode}
   */
  get filterMode(): CommonThemeMode {
    const modes: string[] = ["dark", "light"];
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
      "theme-dark": this.filterMode === "dark",
      "theme-light": this.filterMode === "light",
    };
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  mounted(): void {
    window.addEventListener("keypress", this.keyboardExit);
  }

  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  beforeDestroy(): void {
    window.removeEventListener("keypress", this.keyboardExit);
  }

  /**
   * @description: 预览
   * @author: Quarter
   * @return
   */
  preview(): void {
    this.zIndex = ++variables.zIndex;
    this.visible = true;
    this.$nextTick(() => {
      if (
        !(this.$el instanceof HTMLElement) ||
        !(this.$refs.container instanceof HTMLDivElement)
      ) {
        return;
      }
      const container: HTMLDivElement = this.$refs.container;
      container.childNodes.forEach((node: ChildNode) => node.remove());
      const media: HTMLImageElement | HTMLVideoElement | null =
        this.$el.querySelector("img") || this.$el.querySelector("video");
      if (media) {
        const el: HTMLImageElement | HTMLVideoElement = document.createElement(
          media.nodeName.toLowerCase()
        ) as HTMLImageElement | HTMLVideoElement;
        el.src = media.src;
        const alt: string | null = media.getAttribute("alt");
        if (alt) {
          el.setAttribute("alt", alt);
        }
        if (el instanceof HTMLVideoElement) {
          el.setAttribute("autoplay", "");
          el.setAttribute("controls", "");
        }
        container.append(el);
      }
    });
  }

  /**
   * @description: 键盘退出预览
   * @author: Quarter
   * @return
   */
  keyboardExit(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      this.visible = false;
    }
  }

  /**
   * @description: 点击退出预览
   * @author: Quarter
   * @return
   */
  exitFullScreen(e: MouseEvent): void {
    if (
      !(
        e.target instanceof HTMLImageElement ||
        e.target instanceof HTMLVideoElement
      )
    ) {
      this.visible = false;
    }
  }
}
</script>

<style lang="scss">
.s-preview {
  img,
  video {
    max-width: 100%;
    max-height: 100%;
  }

  .background-mask {
    width: 100%;
    height: 100%;
  }

  .s-preview-fullscreen {
    width: 100%;
    height: 100%;
    user-select: none;
    backdrop-filter: blur(3px);
    position: fixed;
    top: 0;
    left: 0;

    .preview-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img,
      video {
        max-width: 100%;
        max-height: 100%;
        display: block;
      }
    }

    .preview-operation {
      width: 50%;
      height: 20%;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 25%;

      button {
        width: 40px;
        height: 40px;
        color: rgba($color: #000000, $alpha: 0.3);
        font-size: 26px;
        border: none;
        border-radius: 20px;
        outline: none;
        box-shadow: 0 0 0 rgba($color: #000000, $alpha: 0.3);
        background-color: rgba($color: #ffffff, $alpha: 0.5);
        cursor: pointer;
        backdrop-filter: blur(5px);

        &:hover {
          color: rgba($color: #000000, $alpha: 0.6);
          background-color: rgba($color: #ffffff, $alpha: 0.8);
          box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.1);
        }
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  &.theme-dark .s-preview-fullscreen {
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  &.theme-light {
    background-color: rgba($color: #ffffff, $alpha: 0.5);
  }
}
</style>
