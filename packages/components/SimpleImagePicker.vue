<!--
 * @Author: Quarter
 * @Date: 2020-08-12 13:35:57
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:10:01
 * @Description: 简易的图片选择器
-->
<template>
  <div class="simple-image-picker">
    <div class="image-tip" v-if="tip">
      <i class="simple-icon-application-wait"></i>
      <span>{{ tip }}</span>
    </div>
    <div class="image-list">
      <collapse-transition>
        <ul>
          <li v-for="(item, index) of pickers" :key="`image-picker-${item}`">
            <simple-image-picker-item
              :index="index"
              :src="imageSrc[index]"
              @update-file="updateFile"
              @delete-file="deleteFile"
            ></simple-image-picker-item>
          </li>
        </ul>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import SimpleImagePickerItem from "./SimpleImagePickerItem.vue";
import { SimpleFileSource, SimpleFileValue } from "../types";
import { PropOptions } from "vue";

export default Emitter.extend({
  name: "SimpleImagePicker",
  components: {
    SimpleImagePickerItem,
  },
  props: {
    value: { // 组件值
      type: Array,
      default: () => [],
    } as PropOptions<SimpleFileValue | undefined>,
    multiple: { // 是否复选
      type: Boolean,
      default: false,
    },
    tip: { // 提示信息
      type: String,
      default: null,
    },
  },
  data() {
    return {
      files: [] as File[], // 文件列表
      imageSrc: [] as SimpleFileSource[], // 图片路径
    };
  },
  computed: {
    /**
     * @description: 同步的值
     * @author: Quarter
     * @return {SimpleFileValue|undefined}
     */
    syncedValue: {
      get(): SimpleFileValue | undefined {
        return this.value;
      },
      set(val: SimpleFileValue | undefined): void {
        this.$emit("update:value", val);
        this.$emit("input", val);
      },
    },
    /**
     * @description: 图片的个数
     * @author: Quarter
     * @return {Number}
     */
    pickers(): number {
      if (this.multiple === true) {
        return this.files.length + 1;
      } else {
        return 1;
      }
    },
  },
  watch: {
    /**
     * @description: 监听文件的变化
     * @author: Quarter
     * @param {Array<File>} 文件列表
     * @return
     */
    files(newValue: File[]): void {
      if (this.multiple === true) {
        this.syncedValue = this.files;
        this.$emit("input", this.files);
        this.$emit("change", this.files);
      } else {
        if (this.files.length > 0) {
          this.syncedValue = this.files[0];
          this.$emit("input", this.files[0]);
          this.$emit("change", this.files[0]);
        } else {
          this.syncedValue = null;
          this.$emit("input", null);
          this.$emit("change", null);
        }
      }
      this.dispatch("SimpleFormItem", "simple-form-validate", ["change"]);
    },
  },
  methods: {
    /**
     * @description: 清空内容
     * @author: Quarter
     * @return
     */
    clear(): void {
      this.files = new Array();
      this.imageSrc = new Array();
    },
    /**
     * @description: 生成图片路径
     * @author: Quarter
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
    },
    /**
     * @description: 更新文件列表
     * @author: Quarter
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
    },
    /**
     * @description: 删除文件
     * @author: Quarter
     * @param {Number} index 下标
     * @return
     */
    deleteFile(index: number): void {
      if (typeof index === "number") {
        this.files.splice(index, 1);
        this.imageSrc.splice(index, 1);
      }
    },
  },
});
</script>

<style lang="scss">
.simple-image-picker {
  width: 100%;

  .image-tip {
    color: #999999;
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
