<!--
 * @Author: Quarter
 * @Date: 2021-05-07 15:09:26
 * @LastEditTime: 2022-03-10 08:05:31
 * @LastEditors: Quarter
 * @Description: 预览
 * @FilePath: /simple-ui/packages/components/SimplePreview.vue
-->
<template>
  <div class="simple-preview" :class="customClass">
    <slot></slot>
    <fade-transition transition="linear">
      <div
        v-if="visible"
        class="simple-preview-fullscreen"
        :style="{ zIndex }"
        @click="visible = false"
      >
        <div ref="container" class="preview-container" @click.stop="exitFullScreen"></div>
        <div class="preview-operation">
          <button @click="visible = false">
            <i class="simple-icon-close"></i>
          </button>
        </div>
      </div>
    </fade-transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { SimpleCustomClass, SimpleThemeMode } from "../types";
import FadeTransition from "./FadeTransition.vue";
import variables from "../variables";

export default Vue.extend({
  name: "SimplePreview",
  components: {
    FadeTransition,
  },
  props: {
    mode: String as PropOptions<SimpleThemeMode>, // 主题模式
  },
  data() {
    return {
      zIndex: variables.zIndex, // 层级
      visible: false, // 预览状态
    };
  },
  computed: {
    /**
     * @description: 过滤的颜色模式
     * @author: Quarter
     * @return {SimpleThemeMode}
     */
    filterMode(): SimpleThemeMode {
      const modes: string[] = ["dark", "light"];
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
        "theme-dark": this.filterMode === "dark",
        "theme-light": this.filterMode === "light",
      };
    },
  },
  mounted(): void {
    window.addEventListener("keypress", this.keyboardExit);
  },
  beforeDestroy(): void {
    window.removeEventListener("keypress", this.keyboardExit);
  },
  methods: {
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
    },
    /**
     * @description: 键盘退出预览
     * @author: Quarter
     * @return
     */
    keyboardExit(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        this.visible = false;
      }
    },
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
    },
  }
});
</script>

<style lang="scss">
.simple-preview {
  img,
  video {
    max-width: 100%;
    max-height: 100%;
  }

  .background-mask {
    width: 100%;
    height: 100%;
  }

  .simple-preview-fullscreen {
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

  &.theme-dark .simple-preview-fullscreen {
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  &.theme-light {
    background-color: rgba($color: #ffffff, $alpha: 0.5);
  }
}
</style>