<!--
 * @Author: Quarter
 * @Date: 2022-01-06 02:27:39
 * @LastEditTime: 2022-12-13 16:02:04
 * @LastEditors: Quarter
 * @Description: 简易的表单的组件
 * @FilePath: /simple-ui/packages/form/src/form.vue
-->
<template>
  <form class="s-form" :class="customClass" :style="customStyle">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import SFormItem from "./form-item.vue";
import Vue from "vue";
import { Emitter } from "packages/mixins";
import { CustomClass, CustomStyle, CommonPosition } from "packages/types";
import { Component, Prop, Provide } from "vue-property-decorator";
import { CustomFormData, FormRules } from "./types";

@Component({
  name: "SForm",
  components: {
    SFormItem,
  },
})
export default class Form extends Emitter {
  @Prop({
    type: Object,
    default: () => ({}),
  })
  formData!: CustomFormData; // 表单数据

  @Prop({
    type: Object,
    default: () => ({}),
  })
  rules!: FormRules; // 验证规则

  @Prop(String)
  labelWidth?: string; // 名称宽度

  @Prop({
    type: Boolean,
    default: false,
  })
  withoutLabel!: boolean; // 表单数据

  @Prop({
    type: Boolean,
    default: false,
  })
  fixedMessage!: boolean; // 固定错误消息

  @Prop({
    type: String,
    default: "left",
  })
  align!: CommonPosition; // 排列方式

  formItemList: Array<InstanceType<typeof SFormItem>> = []; // 保存所有的表单项

  /**
   * @description: 暴露的表单数据
   * @return {CustomFormData}
   */
  get exposedData(): CustomFormData | undefined {
    return this.formData;
  }

  /**
   * @description: 暴露的规则
   * @return {FormRules}
   */
  get exposedRule(): FormRules | undefined {
    return this.rules;
  }

  /**
   * @description: 排列方式
   * @return {String}
   */
  get finalAlign(): CommonPosition {
    if (this.align === "left" || this.align === "top" || this.align === "right") {
      return this.align;
    }
    return "left";
  }

  /**
   * @description: 自定义类名
   * @return {CustomClass}
   */
  get customClass(): CustomClass {
    return {
      "align-left": this.finalAlign === "left",
      "align-right": this.finalAlign === "right",
      "align-top": this.finalAlign === "top",
      "without-label": this.withoutLabel === true,
      "fixed-message": this.fixedMessage,
    };
  }

  /**
   * @description: 自定义样式表
   * @return {CustomStyle}
   */
  get customStyle(): CustomStyle {
    const styles: CustomStyle = {};
    if (typeof this.labelWidth === "string" && this.labelWidth.length > 0) {
      styles["--label-width"] = this.labelWidth;
      styles["--content-width"] = `calc(100% - ${this.labelWidth}`;
    }
    return styles;
  }

  /**
   * @description: 提供组件
   * @return {SForm}
   */
  @Provide("SForm")
  get provideForm(): Vue {
    return this;
  }

  /**
   * @description: 提供表单数据
   * @return {CustomFormData}
   */
  @Provide("CustomFormData")
  get provideData(): CustomFormData | undefined {
    return this.formData;
  }

  /**
   * @description: 生命周期函数
   * @return
   */
  created(): void {
    this.$on("register-form-item", (item: InstanceType<typeof SFormItem>) => {
      if (item) {
        this.formItemList.push(item);
      }
    });
    this.$on("destroy-form-item", (item: InstanceType<typeof SFormItem>) => {
      if (item) {
        this.formItemList.splice(this.formItemList.indexOf(item), 1);
      }
    });
  }

  /**
   * @description: 规则验证
   * @return {Boolean}
   */
  validate(): Promise<void> {
    return new Promise((resolve, reject) => {
      let result = true;
      let msg!: string;
      if (Array.isArray(this.formItemList)) {
        this.formItemList.forEach((formItem: InstanceType<typeof SFormItem>) => {
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
  }
}
</script>

<style lang="scss">
.s-form {
  &.align-top .s-form-item {
    .form-label {
      width: 100%;
    }

    .form-content {
      width: 100%;
      margin-top: 10px;
    }
  }

  &.align-left .s-form-item,
  &.align-right .s-form-item {
    .form-label {
      width: var(--label-width, 120px);
      padding-right: 10px;
      box-sizing: border-box;
    }

    .form-content {
      width: var(--content-width, calc(100% - 120px));
    }
  }

  &.align-right .s-form-item .form-label {
    text-align: right;
    justify-content: flex-end;
  }

  &.without-label.align-left .s-form-item,
  &.without-label.align-right .s-form-item {
    .form-label {
      display: none;
    }

    .form-content {
      width: 100%;
    }
  }

  &.fixed-message .s-form-item .form-content {
    position: relative;

    .item-message {
      position: absolute;
      left: 0;
      top: 100%;
    }
  }
}
</style>
