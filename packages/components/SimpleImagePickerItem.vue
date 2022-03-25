<!--
 * @Author: Quarter
 * @Date: 2020-08-12 13:42:56
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-23 07:36:09
 * @Description: 简易的图片选择器单项
-->
<template>
  <div class="simple-image-item">
    <div v-if="imageVisible" class="image-preview" :style="{ 'background-image': realUrl }">
      <div v-if="imageLoading" class="image-loading">
        <i class="simple-icon-loading"></i>
      </div>
      <div class="image-delete">
        <i class="simple-icon-delete-fill" @click="deleteImage"></i>
      </div>
    </div>
    <button v-else>
      <i class="simple-icon-plus"></i>
      <input type="file" accept="image/*" @change="fileChange" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SimpleImagePickerItem",
  props: {
    index: { // 下标
      type: Number,
      required: true,
      default: -1,
    },
    src: { // 图片路径
      type: String,
      default: undefined,
    },
  },
  computed: {
    /**
     * @description: 是否显示加载
     * @author: Quarter
     * @return {Boolean}
     */
    imageLoading(): boolean {
      return this.src === null;
    },
    /**
     * @description: 真实的图片路径
     * @author: Quarter
     * @return {String|undefined}
     */
    realUrl(): string | undefined {
      if (typeof this.src === "string" && this.src) {
        return `url(${this.src})`;
      }
      return undefined;
    },
    /**
     * @description: 图片是否显示
     * @author: Quarter
     * @return {Boolean}
     */
    imageVisible(): boolean {
      if (
        this.src === null ||
        (typeof this.src === "string" && this.src.length > 0)
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    /**
     * @description: 选中文件变化
     * @author: Quarter
     * @param {Event} event 事件
     * @return
     */
    fileChange(event: Event) {
      if (event) {
        const target: any = event.target;
        if (target && target.nodeName === "INPUT" && target.type === "file") {
          const files: File[] = Array.from(target.files);
          if (Array.isArray(files) && files.length > 0) {
            const file: File = files[0];
            this.$emit("update-file", this.index, file);
            target.value = null;
          }
        }
      }
    },
    /**
     * @description: 删除文件
     * @author: Quarter
     * @return
     */
    deleteImage(): void {
      this.$emit("delete-file", this.index);
    },
  },
});
</script>

<style lang="scss">
.simple-image-item {
  width: 80px;
  height: 80px;
  position: relative;

  .image-preview {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-size: cover;
    overflow: hidden;
    position: relative;

    .image-loading {
      width: 100%;
      height: 100%;
      color: #d6e1e5;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .image-delete {
      width: 100%;
      height: 100%;
      color: #ffffff;
      font-size: 18px;
      cursor: pointer;
      background-color: rgba($color: #333333, $alpha: 0.25);
      transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;

      i:hover {
        color: #f5222d;
      }
    }

    &:hover .image-delete {
      opacity: 1;
    }
  }

  button {
    width: 100%;
    height: 100%;
    color: #d6e1e5;
    font-size: 20px;
    border: 1px dashed #d6e1e5;
    border-radius: 2px;
    cursor: pointer;
    background: none;
    position: absolute;
    top: 0;
    left: 0;

    input {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>