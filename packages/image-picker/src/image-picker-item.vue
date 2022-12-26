<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:39:38
 * @LastEditors: Quarter
 * @Description: 图片选择器项
 * @FilePath: /simple-ui/packages/image-picker/src/image-picker-item.vue
-->
<template>
  <div class="s-image-item">
    <div v-if="imageVisible" class="image-preview" :style="{ 'background-image': realUrl }">
      <div v-if="imageLoading" class="image-loading">
        <icon name="loading"></icon>
      </div>
      <div class="image-delete">
        <s-button
          variant="plain"
          shape="square"
          theme="danger"
          icon="trash-empty"
          @click="deleteImage"
        ></s-button>
      </div>
    </div>
    <button v-else>
      <icon name="add-plus"></icon>
      <input type="file" accept="image/*" @change="fileChange" />
    </button>
  </div>
</template>

<script lang="ts">
import { Icon } from "@unmian/simple-icons";
import { Button } from "packages/button";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SImagePickerItem",
  components: {
    Icon,
    SButton: Button,
  },
})
export default class ImagePickerItem extends Vue {
  @Prop({
    type: Number,
    required: true,
    default: -1,
  })
  index!: number; // 下标

  @Prop({
    type: String,
    default: undefined,
  })
  src?: string; // 图片路径

  /**
   * @description: 是否显示加载
   * @return {Boolean}
   */
  get imageLoading(): boolean {
    return this.src === null;
  }

  /**
   * @description: 真实的图片路径
   * @return {String|undefined}
   */
  get realUrl(): string | undefined {
    if (typeof this.src === "string" && this.src) {
      return `url(${this.src})`;
    }
    return undefined;
  }

  /**
   * @description: 图片是否显示
   * @return {Boolean}
   */
  get imageVisible(): boolean {
    if (this.src === null || (typeof this.src === "string" && this.src.length > 0)) {
      return true;
    }
    return false;
  }

  /**
   * @description: 选中文件变化
   * @param {Event} event 事件
   * @return
   */
  fileChange(event: Event) {
    if (event) {
      const { target } = event;
      if (
        target instanceof Element &&
        target.nodeName === "INPUT" &&
        (target as HTMLInputElement).type === "file"
      ) {
        const files: File[] = Array.from((target as HTMLInputElement).files || []);
        if (Array.isArray(files) && files.length > 0) {
          const file: File = files[0];
          this.$emit("update-file", this.index, file);
          (target as HTMLInputElement).value = "";
        }
      }
    }
  }

  /**
   * @description: 删除文件
   * @return
   */
  deleteImage(): void {
    this.$emit("delete-file", this.index);
  }
}
</script>

<style lang="scss">
.s-image-item {
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
    }

    &:hover .image-delete {
      opacity: 1;
    }
  }

  > button {
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
