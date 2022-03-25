<!--
 * @Author: Quarter
 * @Date: 2021-04-13 13:58:24
 * @LastEditTime: 2022-03-24 15:38:39
 * @LastEditors: Quarter
 * @Description: 简易的图片容器
 * @FilePath: /simple-ui/packages/components/SimpleImage.vue
-->
<template>
  <div ref="container" class="simple-image" :class="{ 'fill-mode': fill }" :style="customStyle">
    <simple-preview ref="imagePreview" v-if="src" v-show="load">
      <img :src="src" :title="title" :alt="alt" @error="fail = true" @load="load = true" />
      <div class="image-mask" v-if="load">
        <simple-button type="confirm" @click="previewImage">
          <i class="simple-icon-preview-outline"></i>
          <span>预览</span>
        </simple-button>
      </div>
    </simple-preview>
    <div class="image-message" v-if="!load" :style="messageContainerStyles">
      <template v-if="!src">
        <div class="error-icon">
          <i class="simple-icon-empty-fill"></i>
        </div>
        <div class="error-message">暂无图片</div>
      </template>
      <template v-else>
        <template v-if="fail">
          <div class="error-icon">
            <i class="simple-icon-damaged-picture-fill"></i>
          </div>
          <div class="error-message">加载失败</div>
        </template>
        <template v-else>正在加载</template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SimplePreview from "./SimplePreview.vue";
import { SimpleCustomStyle } from "../types";

export default Vue.extend({
  name: "SimpleImage",
  props: {
    color: String, // 颜色
    ratio: [String, Number], // 长宽比
    src: String, // 图片地址
    alt: String, // 替换字符
    title: String, // 提示标题
    fill: Boolean, // 填充模式
  },
  data() {
    return {
      fail: false, // 加载失败
      load: false, // 加载成功
      height: 0, // 高度
      eleObserver: undefined as ResizeObserver | undefined, // 大小观察器
    };
  },
  computed: {
    /**
     * @description: 安全的颜色
     * @author: Quarter
     * @return {String}
     */
    safeColor(): string {
      if (typeof this.color === "string") {
        const hexColor: RegExp = new RegExp(/^#[0-9a-fA-F]{6}$/);
        if (hexColor.test(this.color)) {
          return this.color;
        }
      }
      return "#535353";
    },
    /**
     * @description: 文字颜色
     * @author: Quarter
     * @return {String}
     */
    fontColor(): string {
      const colors: number[] = new Array();
      for (let i = 0; i < 3; i++) {
        colors.push(parseInt(this.safeColor.substr(2 * i + 1, 2), 16));
      }
      return `rgba(${colors.join(",")},0.6)`;
    },
    /**
     * @description: 背景颜色
     * @author: Quarter
     * @return {String}
     */
    backgroundColor(): string {
      const colors: number[] = new Array();
      for (let i = 0; i < 3; i++) {
        colors.push(parseInt(this.safeColor.substr(2 * i + 1, 2), 16));
      }
      return `rgba(${colors.join(",")},0.05)`;
    },
    /**
     * @description: 安全的长宽比
     * @author: Quarter
     * @return
     */
    safeRatio(): number {
      if (typeof this.ratio === "number") {
        if (this.ratio > 0) {
          return this.ratio;
        }
      } else if (typeof this.ratio === "string") {
        const ratio: number = parseFloat(this.ratio);
        if (!Number.isNaN(ratio) && ratio > 0) {
          return ratio;
        }
      }
      return 16 / 9;
    },
    /**
     * @description: 自定义样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    customStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {
        backgroundColor: this.backgroundColor,
      };
      if (this.height > 0) {
        styles.height = this.height + "px";
      }
      return styles;
    },
    /**
     * @description: 消息容器样式
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    messageContainerStyles(): SimpleCustomStyle {
      return {
        color: this.fontColor,
      };
    },
  },
  mounted(): void {
    this.initObserver();
  },
  beforeDestroy(): void {
    if (this.eleObserver) {
      this.eleObserver.disconnect();
    }
  },
  methods: {
    /**
     * @description: 初始化观察器
     * @author: Quarter
     * @return
     */
    initObserver(): void {
      this.eleObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          if (
            entry.target instanceof HTMLDivElement &&
            entry.target.classList.contains("simple-image")
          ) {
            this.calcContainerHeight();
          }
        }
      });
      if (this.$refs.container instanceof HTMLDivElement) {
        // 观察文本域元素
        this.eleObserver.observe(this.$refs.container);
      }
    },
    /**
     * @description: 计算容器高度
     * @author: Quarter
     * @return
     */
    calcContainerHeight(): void {
      const container: Vue | Element | (Vue | Element)[] | undefined = this.$refs.container;
      if (container instanceof HTMLDivElement) {
        const bounding: DOMRect = container.getBoundingClientRect();
        if (bounding.width > 0) {
          const height: number = Math.floor(bounding.width / this.safeRatio);
          this.height = height;
        } else {
          this.height = 0;
        }
      } else {
        this.height = 0;
      }
    },
    /**
     * @description: 预览图片
     * @author: Quarter
     * @return
     */
    previewImage(): void {
      if (this.$refs.imagePreview instanceof SimplePreview) {
        (this.$refs.imagePreview as InstanceType<typeof SimplePreview>).preview();
      }
    },
  },
  watch: {
    /**
     * @description: 监听图片地址变化
     * @author: Quarter
     * @return
     */
    src(): void {
      this.fail = false;
      this.load = false;
    },
  },
});
</script>

<style lang="scss">
.simple-image {
  width: 100%;
  text-align: center;
  user-select: none;
  position: relative;

  .simple-preview {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover .image-mask {
      opacity: 1;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .image-mask {
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  .image-message {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 14px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;

    .error-icon {
      font-size: 32px;
    }

    .error-message {
      font-size: 16px;
      margin-top: 12px;
    }
  }

  &.fill-mode img {
    min-width: 100%;
    min-height: 100%;
  }
}
</style>