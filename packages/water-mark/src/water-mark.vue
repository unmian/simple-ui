<!--
 * @Author: Quarter
 * @Date: 2021-07-20 09:39:01
 * @LastEditTime: 2022-12-13 15:43:36
 * @LastEditors: Quarter
 * @Description: 简易的图片水印组件
 * @FilePath: /simple-ui/packages/water-mark/src/water-mark.vue
-->
<template>
  <img
    class="s-water-mark"
    ref="imageElement"
    :src="imageUrl"
    :alt="alt"
    :title="title"
    @error="dispatchError"
    @load="dispatchLoad"
    @loadstart="dispatchLoadStart"
    @abort="dispatchAbort"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "SWaterMark",
})
export default class WaterMark extends Vue {
  @Prop(String)
  src?: string; // 原图片地址

  @Prop(String)
  text?: string; // 水印文本

  @Prop(String)
  alt?: string; // 提示文字

  @Prop(String)
  title?: string; // 标题文字

  imageUrl = ""; // 水印图片地址

  /**
   * @description: 过滤的水印文本
   * @return {String}
   */
  get filterText(): string {
    if (typeof this.text === "string" && this.text.replace(/\s/g, "").length > 0) {
      return this.text;
    }
    return "";
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  beforeDestroy(): void {
    this.revokeObjectURL();
  }

  /**
   * @description: 监控图片路径的变化
   * @return
   */
  @Watch("src", {
    immediate: true,
  })
  watchSrcChange(): void {
    if (
      typeof this.text === "string" &&
      this.text.replace(/\s/g, "").length > 0 &&
      typeof this.src === "string" &&
      this.src.replace(/\s/g, "").length > 0
    ) {
      this.revokeObjectURL();
      this.fetchImage(this.src);
    }
  }

  /**
   * @description: 监控水印文字的变化
   * @return
   */
  @Watch("filterText", {
    immediate: true,
  })
  handleFilterTextChange(): void {
    if (
      typeof this.text === "string" &&
      this.text.replace(/\s/g, "").length > 0 &&
      typeof this.src === "string" &&
      this.src.replace(/\s/g, "").length > 0
    ) {
      this.revokeObjectURL();
      this.fetchImage(this.src);
    }
  }

  /**
   * @description: 撤销生成的 blob 链接
   * @return
   */
  revokeObjectURL(): void {
    const blobRegExp = new RegExp(/^blob:\/\//);
    if (typeof this.imageUrl === "string" && blobRegExp.test(this.imageUrl)) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  /**
   * @description: 获取图片
   * @param {String} url 图片地址
   * @return
   */
  fetchImage(url: string): void {
    fetch(url)
      // 根据图片路径获取图片数据，转成blob类型
      .then((r) => r.blob())
      // 用 FileReader 读取图片 blob 数据
      .then(
        (file: Blob) =>
          new Promise<HTMLImageElement>((resolve) => {
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const imageRegExp = new RegExp(/^image\//);
              if (imageRegExp.test(file.type)) {
                const img: HTMLImageElement = new Image();
                if (typeof reader.result === "string") {
                  img.src = reader.result;
                  img.onload = () => {
                    resolve(img);
                  };
                }
              }
            };
          }),
      )
      // 通过canvas 绘制图片和文字水印
      .then(
        (image: HTMLImageElement) =>
          new Promise<HTMLCanvasElement>((resolve) => {
            const canvas: HTMLCanvasElement = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            if (ctx instanceof CanvasRenderingContext2D) {
              ctx.drawImage(image, 0, 0);
              const xSplit = 6;
              const ySplit: number = Math.ceil((xSplit / image.width) * image.height);
              const xWidth = image.width / xSplit;
              const xheight = image.height / ySplit;
              const fontSize: number = Math.ceil((xWidth * 0.8) / this.filterText.length);
              ctx.globalAlpha = 0.3;
              ctx.fillStyle = "white";
              ctx.strokeStyle = "black";
              const font = `${fontSize}px "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB"`;
              ctx.font += `${font}, "Microsoft YaHei", "微软雅黑", Arial, sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              for (let x = 0; x <= xSplit + 1; x++) {
                for (let y = 0; y <= ySplit + 1; y++) {
                  ctx.setTransform(1, 0, 0, 1, 0, 0);
                  ctx.translate(x * xWidth, y * xheight);
                  ctx.rotate(-Math.atan(image.height / image.width));
                  ctx.strokeText(this.filterText, 0, 0);
                  ctx.fillText(this.filterText, 0, 0);
                }
              }
              resolve(canvas);
            }
          }),
      )
      // 设置新的图片地址
      .then((canvasElement: HTMLCanvasElement) => {
        canvasElement.toBlob((canvas: Blob | null) => {
          if (canvas instanceof Blob) {
            const canvasURL: string = URL.createObjectURL(canvas);
            // 图片加载完成后销毁objectUrl
            /* this.$refs.imageElement.onload = () => {
              URL.revokeObjectURL(canvasURL);
            }; */
            this.imageUrl = canvasURL;
          }
        });
      });
  }

  /**
   * @description: 触发错误事件
   * @return
   */
  dispatchError(...args: any[]): void {
    this.$emit("error", args);
  }

  /**
   * @description: 触发加载事件
   * @return
   */
  dispatchLoad(...args: any[]): void {
    this.$emit("load", args);
  }

  /**
   * @description: 触发加载开始事件
   * @return
   */
  dispatchLoadStart(...args: any[]): void {
    this.$emit("loadstart", args);
  }

  /**
   * @description: 触发放弃事件
   * @return
   */
  dispatchAbort(...args: any[]): void {
    this.$emit("abort", args);
  }
}
</script>

<style lang="scss">
img.s-water-mark {
  max-width: 100%;
  max-height: 100%;
}
</style>
