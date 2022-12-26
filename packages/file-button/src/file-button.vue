<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 17:38:30
 * @LastEditors: Quarter
 * @Description: 文件选择按钮组件
 * @FilePath: /simple-ui/packages/file-button/src/file-button.vue
-->
<template>
  <div class="s-file-button">
    <div class="operation-list">
      <s-button
        :variant="variant"
        :theme="theme"
        :size="size"
        :shape="shape"
        :icon="icon"
        :disabled="disabledStatus"
      >
        {{ text }}
        <input type="file" @change="changeFile" :multiple="multiple" :disabled="disabledStatus" />
      </s-button>
      <div class="other-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="file-tip" v-if="tip">
      <i class="s-icon-application-wait"></i>
      <span>{{ tip }}</span>
    </div>
    <div class="file-list" v-if="fileCounter > 0">
      <collapse-transition>
        <ul>
          <li v-for="(item, index) of fileCounter" :key="`file-item-${item}`">
            <div class="file-info">
              <div class="file-name">{{ files[index].name }}</div>
              <div class="file-size">{{ calcFileSize(files[index].size) }}</div>
            </div>
            <div class="file-operation">
              <button @click="deleteFile(index)">
                <i class="s-icon-close"></i>
              </button>
            </div>
          </li>
        </ul>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, ButtonShape, ButtonSize, ButtonTheme, ButtonVariant } from "packages/button";
import { Emitter } from "packages/mixins";
import { FileSource, FileValue } from "packages/types";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "SFileButton",
  components: {
    SButton: Button,
  },
})
export default class FileButton extends Emitter {
  // 组件值
  @Prop({
    type: [Object, Array],
    default: () => [],
  })
  value!: FileValue;

  // 是否复选
  @Prop({
    type: Boolean,
    default: false,
  })
  multiple!: boolean;

  // 提示信息
  @Prop({
    type: String,
    default: null,
  })
  tip!: string | null;

  // 按钮主题
  @Prop(String)
  theme?: ButtonTheme;

  // 按钮变体
  @Prop(String)
  variant?: ButtonVariant;

  // 按钮形状
  @Prop(String)
  shape?: ButtonShape;

  // 按钮大小
  @Prop(String)
  size?: ButtonSize;

  // 圆角图标
  @Prop(String)
  icon?: string;

  // 是否禁用
  @Prop(Boolean)
  disabled?: boolean;

  // 文本
  @Prop({
    type: String,
    default: "选择文件",
  })
  text?: string;

  // 文件列表
  files: File[] = [];
  // 图片路径
  imageSrc: FileSource[] = [];

  /**
   * @description: 组件值
   * @return {FileValue}
   */
  get syncedValue(): FileValue {
    return this.value;
  }

  /**
   * @description: 组件值
   * @param {FileValue} val 值
   * @return
   */
  set syncedValue(val: FileValue) {
    this.$emit("update:value", val);
  }

  /**
   * @description: 图片的个数
   * @return {Number}
   */
  get fileCounter(): number {
    return this.files.length;
  }

  /**
   * @description: 禁用状态
   * @return {Boolean}
   */
  get disabledStatus(): boolean | undefined {
    if (this.multiple) {
      return this.disabled;
    }
    return this.disabled || this.fileCounter >= 1;
  }

  /**
   * @description: 监听文件的变化
   * @return
   */
  @Watch("files")
  handleFilesChange(): void {
    if (this.multiple === true) {
      this.syncedValue = this.files;
      this.$emit("change", this.files);
      this.$emit("input", this.files);
    } else if (this.files.length > 0) {
      this.syncedValue = this.files[0];
      this.$emit("change", this.files[0]);
      this.$emit("input", this.files[0]);
    } else {
      this.syncedValue = null;
      this.$emit("change", null);
      this.$emit("input", null);
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
   * @description: 选中文件变化
   * @param {Event} event 事件
   * @return
   */
  changeFile(event: Event) {
    if (event) {
      const { target } = event;
      if (
        target instanceof Element &&
        target.nodeName === "INPUT" &&
        (target as HTMLInputElement).type === "file"
      ) {
        const files: File[] = Array.from((target as HTMLInputElement).files || []);
        if (Array.isArray(files) && files.length > 0) {
          if (this.multiple) {
            this.files = Array.from(new Set(this.files.concat(files)));
          } else {
            const file: File = files[0];
            this.files.splice(this.files.length - 1, 1, file);
            (target as HTMLInputElement).files = null;
            (target as HTMLInputElement).value = "";
          }
        }
      }
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

  /**
   * @description: 计算文件大小
   * @return {String}
   */
  calcFileSize(bytes: number): string | undefined {
    if (typeof bytes === "number") {
      const sizeList = ["B", "KB", "MB", "GB", "TB"];
      let index = 0;
      let temp = bytes;
      while (temp >= 1024 && index < sizeList.length) {
        temp /= 1024;
        index += 1;
      }
      return this.parseSize(temp, sizeList[index]);
    }
  }

  /**
   * @description: 格式化文件大小
   * @param {Number} size 文件大小
   * @param {String} unit 单位
   * @return
   */
  parseSize(size: number, unit: string): string {
    const dotRegExp = new RegExp(/\.[0-9]{3,}$/);
    if (dotRegExp.test(size.toString())) {
      return `${(Math.round(size * 100) / 100).toFixed(2)} ${unit}`;
    }
    return `${size} ${unit}`;
  }
}
</script>

<style lang="scss">
.s-file-button {
  width: 100%;
  max-width: 480px;

  .operation-list {
    width: 100%;
    display: flex;

    .s-button {
      position: relative;

      input {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;

        &[disabled] {
          cursor: not-allowed;
        }
      }
    }

    .other-operation {
      max-width: calc(100% - 98px);
    }
  }

  .file-tip {
    color: #999999;
    font-size: 12px;
    line-height: 1.5;
    margin-top: 15px;

    i {
      color: #abcef2;
      margin-right: 8px;
    }
  }

  .file-list {
    padding-left: 20px;
    box-sizing: border-box;
    margin-top: 15px;

    ul {
      max-width: 100%;
      padding: 0;
      list-style: none;
      margin: 0;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .file-info {
          display: flex;
          align-items: center;

          .file-name {
            font-size: 14px;
          }

          .file-size {
            height: 22px;
            padding: 0 8px;
            color: #549fff;
            white-space: nowrap;
            font-size: 12px;
            line-height: 22px;
            border-radius: 11px;
            background-color: rgba($color: #000000, $alpha: 0.05);
            margin-left: 10px;
          }
        }

        .file-operation {
          margin-left: 20px;

          button {
            width: 26px;
            height: 26px;
            padding: 0;
            color: #549fff;
            font-size: 18px;
            text-align: center;
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 13px;
            background: none;
            background-color: none;
            transform: rotate(0deg);
            transition: transform 0.2s linear;

            &:hover {
              color: #0079fe;
              transform: rotate(90deg);
            }
          }
        }

        &:nth-of-type(n + 2) {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
