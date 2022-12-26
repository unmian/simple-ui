<!--
 * @Author: Quarter
 * @Date: 2021-04-13 13:58:24
 * @LastEditTime: 2022-12-13 15:35:29
 * @LastEditors: Quarter
 * @Description: 简易的图片容器
 * @FilePath: /simple-ui/packages/image/src/image.vue
-->
<template>
  <div ref="container" class="s-image" :class="{ 'fill-mode': fill }" :style="customStyle">
    <preview ref="imagePreview" v-if="src" v-show="load">
      <img :src="src" :title="title" :alt="alt" @error="fail = true" @load="load = true" />
      <div class="image-mask" v-if="load">
        <s-button theme="default" @click="previewImage">
          <icon name="show"></icon>
          <span>预览</span>
        </s-button>
      </div>
    </preview>
    <div class="image-message" v-if="!load" :style="messageContainerStyles">
      <template v-if="!src">
        <div class="error-icon">
          <icon name="image-01"></icon>
        </div>
        <div class="error-message">暂无图片</div>
      </template>
      <template v-else>
        <template v-if="fail">
          <div class="link-break">
            <icon name="triangle-warning"></icon>
          </div>
          <div class="error-message">加载失败</div>
        </template>
        <template v-else>正在加载</template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Preview } from "packages/preview";
import { CustomStyle } from "packages/types";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "SImage",
  components: {
    Icon,
    Preview,
  },
})
export default class Image extends Vue {
  @Prop(String)
  color?: string; // 颜色

  @Prop([String, Number])
  ratio?: string | number; // 长宽比

  @Prop(String)
  src?: string; // 图片地址

  @Prop(String)
  alt?: string; // 替换字符

  @Prop(String)
  title?: string; // 提示标题

  @Prop(Boolean)
  fill?: boolean; // 填充模式

  fail = false; // 加载失败
  load = false; // 加载成功
  height = 0; // 高度
  eleObserver: ResizeObserver | undefined = undefined; // 大小观察器

  /**
   * @description: 安全的颜色
   * @return {String}
   */
  get safeColor(): string {
    if (typeof this.color === "string") {
      const hexColor = new RegExp(/^#[0-9a-fA-F]{6}$/);
      if (hexColor.test(this.color)) {
        return this.color;
      }
    }
    return "#535353";
  }

  /**
   * @description: 文字颜色
   * @return {String}
   */
  get fontColor(): string {
    const colors: number[] = [];
    for (let i = 0; i < 3; i++) {
      colors.push(parseInt(this.safeColor.substr(2 * i + 1, 2), 16));
    }
    return `rgba(${colors.join(",")},0.6)`;
  }

  /**
   * @description: 背景颜色
   * @return {String}
   */
  get backgroundColor(): string {
    const colors: number[] = [];
    for (let i = 0; i < 3; i++) {
      colors.push(parseInt(this.safeColor.substr(2 * i + 1, 2), 16));
    }
    return `rgba(${colors.join(",")},0.05)`;
  }

  /**
   * @description: 安全的长宽比
   * @return
   */
  get safeRatio(): number {
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
  }

  /**
   * @description: 自定义样式
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    const styles: CustomStyle = {
      backgroundColor: this.backgroundColor,
    };
    if (this.height > 0) {
      styles.height = `${this.height}px`;
    }
    return styles;
  }

  /**
   * @description: 消息容器样式
   * @return {CustomStyle}
   */
  get messageContainerStyles(): CustomStyle {
    return {
      color: this.fontColor,
    };
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  mounted(): void {
    this.initObserver();
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    if (this.eleObserver) {
      this.eleObserver.disconnect();
    }
  }

  /**
   * @description: 监听图片地址变化
   * @return
   */
  @Watch("src")
  handleSrcChange(): void {
    this.fail = false;
    this.load = false;
  }

  /**
   * @description: 初始化观察器
   * @return
   */
  initObserver(): void {
    this.eleObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLDivElement && entry.target.classList.contains("s-image")) {
          this.calcContainerHeight();
        }
      }
    });
    if (this.$refs.container instanceof HTMLDivElement) {
      // 观察文本域元素
      this.eleObserver.observe(this.$refs.container);
    }
  }

  /**
   * @description: 计算容器高度
   * @return
   */
  calcContainerHeight(): void {
    const { container } = this.$refs;
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
  }

  /**
   * @description: 预览图片
   * @return
   */
  previewImage(): void {
    if (this.$refs.imagePreview instanceof Preview) {
      this.$refs.imagePreview.preview();
    }
  }
}
</script>

<style lang="scss">
.s-image {
  width: 100%;
  text-align: center;
  user-select: none;
  position: relative;

  .preview {
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
