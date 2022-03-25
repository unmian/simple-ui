<!--
 * @Author: Quarter
 * @Date: 2021-07-20 09:39:01
 * @LastEditTime: 2022-03-10 08:09:28
 * @LastEditors: Quarter
 * @Description: 简易的图片水印组件
 * @FilePath: /simple-ui/packages/components/SimpleWaterMark.vue
-->
<template>
  <img
    class="simple-water-mark"
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
import Vue from "vue";

export default Vue.extend({
  name: "SimpleWaterMark",
  props: {
    src: String, // 原图片地址
    text: String, // 水印文本
    alt: String, // 提示文字
    title: String, // 标题文字
  },
  data() {
    return {
      imageUrl: "", // 水印图片地址
    };
  },
  computed: {
    /**
     * @description: 过滤的水印文本
     * @author: Quarter
     * @return {String}
     */
    filterText(): string {
      if (
        typeof this.text === "string" &&
        this.text.replace(/\s/g, "").length > 0
      ) {
        return this.text;
      }
      return "";
    },
  },
  beforeDestroy(): void {
    this.revokeObjectURL();
  },
  methods: {
    /**
     * @description: 撤销生成的 blob 链接
     * @author: Quarter
     * @return
     */
    revokeObjectURL(): void {
      const blobRegExp: RegExp = new RegExp(/^blob:\/\//);
      if (typeof this.imageUrl === "string" && blobRegExp.test(this.imageUrl)) {
        URL.revokeObjectURL(this.imageUrl);
      }
    },
    /**
     * @description: 获取图片
     * @author: Quarter
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
                const imageRegExp: RegExp = new RegExp(/^image\//);
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
            })
        )
        // 通过canvas 绘制图片和文字水印
        .then(
          (image: HTMLImageElement) =>
            new Promise<HTMLCanvasElement>((resolve) => {
              const canvas: HTMLCanvasElement = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              const ctx: CanvasRenderingContext2D | null =
                canvas.getContext("2d");
              if (ctx instanceof CanvasRenderingContext2D) {
                ctx.drawImage(image, 0, 0);
                const xSplit: number = 6;
                const ySplit: number = Math.ceil(
                  (xSplit / image.width) * image.height
                );
                const xWidth = image.width / xSplit;
                const xheight = image.height / ySplit;
                const fontSize: number = Math.ceil(
                  (xWidth * 0.8) / this.filterText.length
                );
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.font =
                  fontSize +
                  `px "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif`;
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
            })
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
    },
    /**
     * @description: 触发错误事件
     * @author: Quarter
     * @return
     */
    dispatchError(): void {
      this.$emit("error", arguments);
    },
    /**
     * @description: 触发加载事件
     * @author: Quarter
     * @return
     */
    dispatchLoad(): void {
      this.$emit("load", arguments);
    },
    /**
     * @description: 触发加载开始事件
     * @author: Quarter
     * @return
     */
    dispatchLoadStart(): void {
      this.$emit("loadstart", arguments);
    },
    /**
     * @description: 触发放弃事件
     * @author: Quarter
     * @return
     */
    dispatchAbort(): void {
      this.$emit("abort", arguments);
    },
  },
  watch: {
    /**
     * @description: 监控图片路径的变化
     * @author: Quarter
     * @return
     */
    src: {
      immediate: true,
      handler(): void {
        if (
          typeof this.text === "string" &&
          this.text.replace(/\s/g, "").length > 0 &&
          typeof this.src === "string" &&
          this.src.replace(/\s/g, "").length > 0
        ) {
          this.revokeObjectURL();
          this.fetchImage(this.src);
        }
      },
    },
    /**
     * @description: 监控水印文字的变化
     * @author: Quarter
     * @return
     */
    filterText: {
      immediate: true,
      handler(): void {
        if (
          typeof this.text === "string" &&
          this.text.replace(/\s/g, "").length > 0 &&
          typeof this.src === "string" &&
          this.src.replace(/\s/g, "").length > 0
        ) {
          this.revokeObjectURL();
          this.fetchImage(this.src);
        }
      },
    },
  },
});
</script>

<style lang="scss">
img.simple-water-mark {
  max-width: 100%;
  max-height: 100%;
}
</style>