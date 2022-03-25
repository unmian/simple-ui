<!--
 * @Author: Quarter
 * @Date: 2020-08-12 13:35:57
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 06:20:51
 * @Description: 简易的图片选择器
-->
<template>
  <div class="simple-file-button">
    <div class="operation-list">
      <simple-button
        :fill="fill"
        :outline="outline"
        :size="size"
        :type="type"
        :round="round"
        :disabled="disabledStatus"
      >
        {{ text }}
        <input
          type="file"
          @change="changeFile"
          :multiple="multiple"
          :disabled="disabledStatus"
        />
      </simple-button>
      <div class="other-operation">
        <slot name="operation"></slot>
      </div>
    </div>
    <div class="file-tip" v-if="tip">
      <i class="simple-icon-application-wait"></i>
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
                <i class="simple-icon-close"></i>
              </button>
            </div>
          </li>
        </ul>
      </collapse-transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { PropOptions } from "vue";
import SimpleButton from "./SimpleButton.vue";
import {
  SimpleButtonType,
  SimpleFileSource,
  SimpleFileValue,
  SimpleSize,
} from "../types";

export default Emitter.extend({
  name: "SimpleFileButton",
  components: {
    SimpleButton,
  },
  props: {
    value: { // 组件值
      type: [Object, Array],
      default: () => [],
    } as PropOptions<SimpleFileValue>,
    multiple: { // 是否复选
      type: Boolean,
      default: false,
    },
    tip: { // 提示信息
      type: String,
      default: null,
    },
    fill: { // 是否填充
      type: Boolean,
      default: false,
    },
    outline: { // 是否框线
      type: Boolean,
      default: false,
    },
    size: { // 按钮大小
      type: String,
      default: "medium",
    } as PropOptions<SimpleSize>,
    text: { // 文本
      type: String,
      default: "选择文件",
    },
    type: { // 按钮类型
      type: String,
      default: "normal",
    } as PropOptions<SimpleButtonType>,
    round: { // 圆角按钮
      type: Boolean,
      default: false,
    },
    disabled: { // 按钮类型
      type: Boolean,
      default: false,
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
     * @description: 组件值
     * @author: Quarter
     * @return {SimpleFileValue}
     */
    syncedValue: {
      get(): SimpleFileValue {
        return this.value;
      },
      set(val: SimpleFileValue): void {
        this.$emit("update:value", val);
      },
    },
    /**
     * @description: 图片的个数
     * @author: Quarter
     * @return {Number}
     */
    fileCounter(): number {
      return this.files.length;
    },
    /**
     * @description: 禁用状态
     * @author: Quarter
     * @return {Boolean}
     */
    disabledStatus(): boolean {
      if (this.multiple) {
        return this.disabled;
      } else {
        return this.disabled || this.fileCounter >= 1;
      }
    },
  },
  watch: {
    /**
     * @description: 监听文件的变化
     * @author: Quarter
     * @param {Array<File>} newValue 文件列表
     * @return
     */
    files(newValue: File[]): void {
      if (this.multiple === true) {
        this.syncedValue = this.files;
        this.$emit("change", this.files);
        this.$emit("input", this.files);
      } else {
        if (this.files.length > 0) {
          this.syncedValue = this.files[0];
          this.$emit("change", this.files[0]);
          this.$emit("input", this.files[0]);
        } else {
          this.syncedValue = null;
          this.$emit("change", null);
          this.$emit("input", null);
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
     * @description: 选中文件变化
     * @author: Quarter
     * @param {Event} event 事件
     * @return
     */
    changeFile(event: Event) {
      if (event) {
        const target: any = event.target;
        if (target && target.nodeName === "INPUT" && target.type === "file") {
          const files: File[] = Array.from(target.files);
          if (Array.isArray(files) && files.length > 0) {
            if (this.multiple) {
              this.files = Array.from(new Set(this.files.concat(files)));
            } else {
              const file: File = files[0];
              this.files.splice(this.files.length - 1, 1, file);
              target.value = null;
            }
          }
        }
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
    /**
     * @description: 计算文件大小
     * @author: Quarter
     * @return {String}
     */
    calcFileSize(bytes: number): string | undefined {
      if (typeof bytes === "number") {
        if (bytes >= 1024) {
          bytes = bytes / 1024;
          if (bytes >= 1024) {
            bytes = bytes / 1024;
            if (bytes >= 1024) {
              bytes = bytes / 1024;
              if (bytes >= 1024) {
                bytes = bytes / 1024;
                return this.parseSize(bytes, "TB");
              } else {
                return this.parseSize(bytes, "GB");
              }
            } else {
              return this.parseSize(bytes, "MB");
            }
          } else {
            return this.parseSize(bytes, "KB");
          }
        } else {
          return this.parseSize(bytes, "B");
        }
      }
    },
    /**
     * @description: 格式化文件大小
     * @author: Quarter
     * @param {Number} size 文件大小
     * @param {String} unit 单位
     * @return
     */
    parseSize(size: number, unit: string): string {
      const dotRegExp: RegExp = new RegExp(/\.[0-9]{3,}$/);
      if (dotRegExp.test(size.toString())) {
        return `${(Math.round(size * 100) / 100).toFixed(2)} ${unit}`;
      } else {
        return `${size} ${unit}`;
      }
    },
  },
});
</script>

<style lang="scss">
.simple-file-button {
  width: 100%;
  max-width: 480px;

  .operation-list {
    width: 100%;
    display: flex;

    .simple-button {
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
