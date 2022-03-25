<!--
 * @Author: Quarter
 * @Date: 2020-07-23 19:38:29
 * @LastEditors: Quarter
 * @LastEditTime: 2022-03-25 08:09:55
 * @Description: 简易的表单
--> 
<template>
  <div class="simple-form" :class="customClass" :style="customStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Emitter } from "../mixins";
import { Component, Prop, Provide } from "vue-property-decorator";
import SimpleFormItem from "./SimpleFormItem.vue";
import {
  SimpleCustomClass,
  SimpleCustomStyle,
  SimpleFormData,
  SimpleFormRules,
  SimplePosition,
} from "../types";
import { PropOptions } from "vue";

export default Emitter.extend({
  name: "SimpleForm",
  provide: {
    SimpleForm: (this as any).provideForm,
    SimpleFormData: (this as any).SimpleFormData,
  },
  props: {
    formData: { // 表单数据
      type: Object,
      default: () => ({}),
    } as PropOptions<SimpleFormData>,
    rules: { // 验证规则
      type: Object,
      default: () => ({}),
    } as PropOptions<SimpleFormRules>,
    labelWidth: String, // 名称宽度
    withoutLabel: { // 表单数据
      type: Boolean,
      default: false,
    },
    fixedMessage: { // 固定错误消息
      type: Boolean,
      default: false,
    },
    align: { // 排列方式
      type: String,
      default: "left",
    } as PropOptions<SimplePosition>,
  },
  data() {
    return {
      formItemList: [] as InstanceType<typeof SimpleFormItem>[], // 保存所有的表单项
    };
  },
  computed: {
    /**
     * @description: 暴露的表单数据
     * @author: Quarter
     * @return {SimpleFormData}
     */
    exposedData(): SimpleFormData | undefined {
      return this.formData;
    },
    /**
     * @description: 暴露的规则
     * @author: Quarter
     * @return {SimpleFormRules}
     */
    exposedRule(): SimpleFormRules | undefined {
      return this.rules;
    },
    /**
     * @description: 排列方式
     * @author: Quarter
     * @return {String}
     */
    finalAlign(): SimplePosition {
      if (
        this.align === "left" ||
        this.align === "top" ||
        this.align === "right"
      ) {
        return this.align;
      }
      return "left";
    },
    /**
     * @description: 自定义类名
     * @author: Quarter
     * @return {SimpleCustomClass}
     */
    customClass(): SimpleCustomClass {
      return {
        "align-left": this.finalAlign === "left",
        "align-right": this.finalAlign === "right",
        "align-top": this.finalAlign === "top",
        "without-label": this.withoutLabel === true,
        "fixed-message": this.fixedMessage,
      };
    },
    /**
     * @description: 自定义样式表
     * @author: Quarter
     * @return {SimpleCustomStyle}
     */
    customStyle(): SimpleCustomStyle {
      const styles: SimpleCustomStyle = {};
      if (typeof this.labelWidth === "string" && this.labelWidth.length > 0) {
        styles["--label-width"] = this.labelWidth;
        styles["--content-width"] = `calc(100% - ${this.labelWidth}`;
      }
      return styles;
    },
    /**
     * @description: 提供组件
     * @author: Quarter
     * @return {SimpleForm}
     */
    provideForm(): Vue {
      return this;
    },
    /**
     * @description: 提供表单数据
     * @author: Quarter
     * @return {SimpleFormData}
     */
    provideData(): SimpleFormData | undefined {
      return this.formData;
    },
  },
  /**
   * @description: 生命周期函数
   * @author: Quarter
   * @return
   */
  created(): void {
    this.$on("register-form-item", (item: InstanceType<typeof SimpleFormItem>) => {
      if (item) {
        this.formItemList.push(item);
      }
    });
    this.$on("destroy-form-item", (item: InstanceType<typeof SimpleFormItem>) => {
      if (item) {
        this.formItemList.splice(this.formItemList.indexOf(item), 1);
      }
    });
  },
  methods: {
    /**
     * @description: 规则验证
     * @author: Quarter
     * @return {Boolean}
     */
    validate(): Promise<void> {
      return new Promise((resolve, reject) => {
        let result: boolean = true;
        let msg!: string;
        if (Array.isArray(this.formItemList)) {
          this.formItemList.forEach((formItem: InstanceType<typeof SimpleFormItem>) => {
            try {
              formItem.validateAll();
            } catch (err) {
              if (result === true) {
                result = false;
                if (err instanceof Error) {
                  msg = err.message;
                } else if (typeof err === "string") {
                  msg = err;
                }
              }
            }
          });
        }
        if (result === true) {
          resolve();
        } else {
          reject(msg);
        }
      });
    },
  },
});
</script>

<style lang="scss">
.simple-form {
  &.align-top .simple-form-item {
    .form-label {
      width: 100%;
    }

    .form-content {
      width: 100%;
      margin-top: 10px;
    }
  }

  &.align-left .simple-form-item,
  &.align-right .simple-form-item {
    .form-label {
      width: var(--label-width, 120px);
      padding-right: 10px;
      box-sizing: border-box;
    }

    .form-content {
      width: var(--content-width, calc(100% - 120px));
    }
  }

  &.align-right .simple-form-item .form-label {
    text-align: right;
    justify-content: flex-end;
  }

  &.without-label.align-left .simple-form-item,
  &.without-label.align-right .simple-form-item {
    .form-label {
      display: none;
    }

    .form-content {
      width: 100%;
    }
  }

  &.fixed-message .simple-form-item .form-content {
    position: relative;

    .item-message {
      position: absolute;
      left: 0;
      top: 100%;
    }
  }
}
</style>