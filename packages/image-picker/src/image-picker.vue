<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 15:39:48
 * @LastEditors: Quarter
 * @Description: 简易的图片选择器
 * @FilePath: /simple-ui/packages/image-picker/src/image-picker.vue
-->
<template>
  <div class="s-image-picker">
    <div class="image-tip" v-if="tip">
      <i class="s-icon-application-wait"></i>
      <span>{{ tip }}</span>
    </div>
    <div class="image-list">
      <collapse-transition>
        <ul>
          <li v-for="(item, index) of pickers" :key="`image-picker-${item}`">
            <s-image-picker-item
              :index="index"
              :src="imageSrc[index]"
              @update-file="updateFile"
              @delete-file="deleteFile"
            ></s-image-picker-item>
          </li>
        </ul>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import SImagePickerItem from "./image-picker-item.vue";
import { Emitter } from "packages/mixins";
import { FileSource, FileValue } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SImagePicker",
  components: {
    SImagePickerItem,
  },
})
export default class ImagePicker extends Emitter {
  @Prop({
    type: Array,
    default: () => [],
  })
  value!: FileValue; // 组件值

  @Prop({
    type: Boolean,
    default: false,
  })
  multiple!: boolean; // 是否复选

  @Prop({
    type: String,
    default: null,
  })
  tip!: string | null; // 提示信息

  files: File[] = []; // 文件列表
  imageSrc: FileSource[] = []; // 图片路径

  /**
   * @description: 同步的值
   * @return {FileValue|undefined}
   */
  get syncedValue(): FileValue | undefined {
    return this.value;
  }

  /**
   * @description: 同步的值
   * @param {FileValue|undefined} val 值
   * @return
   */
  set syncedValue(val: FileValue | undefined) {
    this.$emit("update:value", val);
    this.$emit("input", val);
  }

  /**
   * @description: 图片的个数
   * @return {Number}
   */
  get pickers(): number {
    if (this.multiple === true) {
      return this.files.length + 1;
    }
    return 1;
  }

  /**
   * @description: 监听文件的变化
   * @return
   */
  @Watch("files")
  handleFilesChange(): void {
    if (this.multiple === true) {
      this.syncedValue = this.files;
      this.$emit("input", this.files);
      this.$emit("change", this.files);
    } else if (this.files.length > 0) {
      this.syncedValue = this.files[0];
      this.$emit("input", this.files[0]);
      this.$emit("change", this.files[0]);
    } else {
      this.syncedValue = null;
      this.$emit("input", null);
      this.$emit("change", null);
    }
    this.dispatch("SFormItem", "s-form-validate", ["change"]);
  }

  /**
   * @description: 清空内容
   * @return
   */
  clear(): void {
    this.files = [];
    this.imageSrc = [];
  }

  /**
   * @description: 生成图片路径
   * @param {Number} index 图片下标
   * @param {File} file 图片文件
   * @return
   */
  generateImageSrc(index: number, file: File): void {
    if (typeof index === "number" && file instanceof File) {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const url: string | ArrayBuffer | null = fileReader.result;
        if (typeof url === "string") {
          this.imageSrc.splice(index, 1, url);
        }
      };
    }
  }

  /**
   * @description: 更新文件列表
   * @param {Number} index 下标
   * @param {File} file 文件
   * @return
   */
  updateFile(index: number, file: File): void {
    if (typeof index === "number" && file) {
      this.files.splice(index, 1, file);
      this.imageSrc.splice(index, 1, null);
      this.generateImageSrc(index, file);
    }
  }

  /**
   * @description: 删除文件
   * @param {Number} index 下标
   * @return
   */
  deleteFile(index: number): void {
    if (typeof index === "number") {
      this.files.splice(index, 1);
      this.imageSrc.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
.s-image-picker {
  width: 100%;

  .image-tip {
    color: #abcef2;
    font-size: 12px;
    line-height: 1.5;

    i {
      color: #abcef2;
      margin-right: 8px;
    }
  }

  .image-list {
    margin-top: 15px;

    ul {
      max-width: 100%;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0;

      li {
        margin: 0 12px 12px 0;
      }
    }
  }
}
</style>
